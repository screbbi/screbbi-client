import PageLayout from "../layout/PageLayout";
import generate from "../assets/img/generate-rewrite.png";
import Shorter from "../components/Shorter";
import Dropdown from "../components/Dropdown";
import aText from "../assets/img/draw-a.svg";
import dText from "../assets/img/draw-d.svg";
import expand from "../assets/img/expand.svg";

import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { useEffect, useState } from "react";
import { getRequest, postRequest } from "../utils/request";
import { useParams } from "react-router-dom";

const PopUp = () => {
  return (
    <div className="popup">
      <div>
        <img src={aText} alt="" /> Rewrite
      </div>
      <div>
        <img src={dText} alt="" />
        Describe
      </div>
      <div>
        <img src={expand} alt="" /> Expand
      </div>
    </div>
  );
};

const Generate = () => {
  const { writer } = useParams();
  const [editorContent, setEditorContent] = useState<any>("");
  const [title, setTitle] = useState("");
  // const [highlightedText, setHighlightedText] = useState("");

  const options = {
    buttonList: [
      [
        "bold",
        "italic",
        "underline",
        "fontSize",
        "link",
        "list",
        "undo",
        "redo",
      ],
    ],
  };

  function getSelectedText() {
    var selectedText = "";

    if (window.getSelection) {
      selectedText = window?.getSelection().toString();
    } else if (document?.selection && document?.selection.type !== "Control") {
      selectedText = document.selection.createRange().text;
    }
    return selectedText;
  }

  const checkSelection = () => {
    var selectedText = getSelectedText();
    if (selectedText !== "") {
      console.log("Selected text:", selectedText);
      // setHighlightedText(selectedText);
    }
  };

  const saveDocument = () => {
    // if (!editing) return;
    postRequest("/writer/writing", {
      writer,
      content: editorContent,
      title,
    })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleKeyUp = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        saveDocument();
      }, 5000);
    };

    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keyup", handleKeyUp);
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    document.addEventListener("mouseup", checkSelection);

    return () => {
      document.removeEventListener("mouseup", checkSelection);
    };
  }, []);

  useEffect(() => {
    getRequest(`/writer/history/${writer}`)
      .then((data) => {
        setEditorContent(
          `<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium, dolorum!</p>`
        );
        console.log(data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, []);

  const inputting = (e: any) => {
    setEditorContent(e.target.outerHTML);
    setTitle(e.target.firstElementChild.outerHTML);
  };

  return (
    <PageLayout>
      <div className="generate">
        <div className="editor h-full relative flex justify-center p-2">
          <SunEditor
            setOptions={options}
            setDefaultStyle="font-family: 'Manrope', sans-serif; background:'transparent'"
            onInput={inputting}
            setContents={editorContent}
            height="calc(100vh - 11rem)"
            width="95%"
            // height="100vh"
          />
          <PopUp />
        </div>
        <div className="controls bg-white p-4">
          <div className="title mb-5">
            <div className="text-sm text-closeBlack font-bold">
              Review Suggestions
            </div>
            <div className="text-grey font-semibold text-xs">
              Integrated with GPT-Based Models
            </div>
          </div>

          <div>
            <div className="flex gap-2 items-center text-xs font-bold mb-2">
              <img src={generate} alt="" />
              <div>Rewrite</div>
            </div>

            <div className="text-grey font-semibold text-xs my-2">
              Hello, I need a writing software similar to this that work with
              AI.
            </div>

            <Dropdown />

            <Shorter />
            <Shorter />
            <Shorter />
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Generate;
