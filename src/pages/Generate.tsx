import PageLayout from "../layout/PageLayout";
import generate from "../assets/img/generate-rewrite.png";
import Shorter from "../components/Shorter";
import Dropdown from "../components/Dropdown";
import aText from "../assets/img/draw-a.svg";
import dText from "../assets/img/draw-d.svg";
import expand from "../assets/img/expand.svg";

import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { useEffect, useRef, useState } from "react";
import { getRequest, postRequest } from "../utils/request";
import { useParams } from "react-router-dom";

const PopUp = ({
  style,
  insight,
  ref,
}: {
  style: { left: string; top: string };
  insight: (e: string) => void;
  ref: any;
}) => {
  return (
    <div className="popup pop" style={style} ref={ref}>
      <div className="pop" onClick={() => insight("rewrite")}>
        <img src={aText} alt="" /> Rewrite
      </div>
      <div className="pop" onClick={() => insight("describe")}>
        <img src={dText} alt="" />
        Describe
      </div>
      <div className="pop" onClick={() => insight("expand")}>
        <img src={expand} alt="" /> Expand
      </div>
    </div>
  );
};

const Generate = () => {
  const { writer } = useParams();
  const [editorContent, setEditorContent] = useState<any>("");
  const [title, setTitle] = useState<any>("");
  const [highlightedText, setHighlightedText] = useState("");
  const [style, setStyle] = useState({ top: "0px", left: "0px" });
  const [showHighlightOptions, setShowHighlightOptions] = useState(false);

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
    let selection: any = window.getSelection();
    if (window.getSelection !== null) {
      // console.log(selection.rangeCount);

      let range = selection.getRangeAt(0).getBoundingClientRect();
      const { left, top } = range;

      setStyle({ left: `${left - 15 * 19}px`, top: `${top - 16 * 6}px` });

      selectedText = window?.getSelection().toString();

      if (selectedText.length > 4) {
        setShowHighlightOptions(true);
      }
      // else {
      //   setShowHighlightOptions(false);
      // }
    } else if (document?.selection && document?.selection.type !== "Control") {
      selectedText = document.selection.createRange().text;
    }
    return selectedText;
  }

  const checkSelection = (e) => {
    if (e.target.parentElement.classList.contains("pop")) {
      return;
    }

    setShowHighlightOptions(false);

    var selectedText = getSelectedText();
    if (selectedText !== "") {
      // console.log("Selected text:", selectedText);
      setHighlightedText(selectedText);
    }
  };

  const saveDocument = () => {
    postRequest("/writer/writing", {
      writer,
      content: editorContent.outerHTML,
      title: title,
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
  }, [editorContent]);

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
    const parser = new DOMParser();
    const doc = parser.parseFromString(e.target.outerHTML, "text/html");
    const myTitle: any =
      doc.body.firstElementChild?.firstElementChild?.textContent;

    setTitle(myTitle);
    setEditorContent(doc.body.firstElementChild);
  };

  const insights = (category: string) => {
    postRequest("/writer/ai-insight", {
      category,
      writer,
      content: highlightedText,
      variation: 3,
      type: "rephrase",
    });
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
          />

          {showHighlightOptions && (
            <div className="popup pop" style={style}>
              <div
                className="pop"
                onClick={(e) => {
                  e.stopPropagation();
                  insights("rewrite");
                }}
              >
                <img src={aText} alt="" /> Rewrite
              </div>
              <div
                className="pop"
                onClick={(e) => {
                  e.stopPropagation();
                  insights("describe");
                }}
              >
                <img src={dText} alt="" />
                Describe
              </div>
              <div
                className="pop"
                onClick={(e) => {
                  e.stopPropagation();
                  insights("expand");
                }}
              >
                <img src={expand} alt="" /> Expand
              </div>
            </div>
          )}
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
