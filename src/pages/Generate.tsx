import PageLayout from "../layout/PageLayout";
import generate from "../assets/img/generate-rewrite.png";
import Shorter from "../components/Shorter";
import Dropdown from "../components/Dropdown";
import aText from "../assets/img/draw-a.svg";
import dText from "../assets/img/draw-d.svg";
import expand from "../assets/img/expand.svg";
import he from "he";

import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { useEffect, useState } from "react";
import { getRequest, postRequest } from "../utils/request";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import ButtonLoader1 from "../components/ButtonLoader1";

const types = [
  "Rephrase",
  "Shorten",
  "More descriptive",
  "Show, not tell",
  "More inner conflict",
  "More intense",
];

const Generate = () => {
  const { writer } = useParams();
  const [editorContent, setEditorContent] = useState<any>("");
  const [title, setTitle] = useState<any>("");
  const [highlightedText, setHighlightedText] = useState("");
  const [style, setStyle] = useState({ top: "0px", left: "0px" });
  const [showHighlightOptions, setShowHighlightOptions] = useState(false);
  const [currentType, setCurrentType] = useState(types[0]);
  const [history, setHistory] = useState<any>(null);
  const [rewriteText, setRewriteText] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [writings, setWritings] = useState<any>(null);

  const options = {
    parsingBlockHtml: true,
    parsingAttrHtml: true,
    parsingTextHtml: true,
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
    let selectedText: any = "";
    let selection: any = window.getSelection();

    if (document !== null && window !== null) {
      if (window.getSelection !== null) {
        let range = selection.getRangeAt(0).getBoundingClientRect();
        const { left, top } = range;

        setStyle({ left: `${left - 15 * 19}px`, top: `${top - 16 * 6.5}px` });

        selectedText = window?.getSelection()?.toString();

        if (selectedText.length > 4) {
          setShowHighlightOptions(true);
        } else {
          setShowHighlightOptions(false);
        }
      }
      //  else if (
      //   document?.selection &&
      //   document?.selection.type !== "Control"
      // ) {
      //   selectedText = document.selection.createRange().text;
      //   console.log(document.selection.createRange().text);
      // }
      return selectedText;
    }
  }

  const checkSelection = (e: any) => {
    if (e.target.parentElement.classList.contains("pop")) {
      return;
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(editorContent, "text/html");
    if (doc.body.firstElementChild?.outerHTML == e.target.outerHTML) return;

    setShowHighlightOptions(false);

    var selectedText = getSelectedText();
    if (selectedText !== "") {
      setHighlightedText(selectedText);
    }
  };

  const saveDocument = () => {
    if (title.trim === "") {
      return;
    }

    postRequest("/writer/writing", {
      writer,
      content: editorContent.innerHTML,
      title: title,
    })
      .then(() => {
        const newWritings = writings?.map((writing: any) => {
          if (writing._id === writer) {
            return { ...writing, title: title };
          } else {
            return writing;
          }
        });

        setWritings(newWritings);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const getUserWriting = () => {
    getRequest(`/writer/writings`)
      .then(({ data }) => {
        setWritings(data);
        const currentContent = data.find(
          (content: any) => content._id === writer
        );

        const decoded = he.decode(currentContent.content);
        setEditorContent(decoded);
      })
      .catch((err: any) => {
        toast.error(err.response.data);
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
      }, 2000);
    };

    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keyup", handleKeyUp);
      clearTimeout(timeoutId);
    };
  }, [editorContent, title]);

  const getHistory = () => {
    setHistory(null);
    getRequest(`/writer/history/${writer}`)
      .then(({ data }: { data: any }) => {
        const reversed = data.reverse();
        setHistory(reversed);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  const insertText = (text: string) => {
    const editor = document.querySelector(".sun-editor-editable");

    if (editor) {
      const selection = window.getSelection();

      if (selection && selection.toString().length > 0) {
        const range = selection.getRangeAt(0);
        range.deleteContents();
        const newNode = document.createTextNode(text);
        range.insertNode(newNode);
      } else {
        // const currentHtml = editor.innerHTML;
        const range = selection?.getRangeAt(0);
        range?.deleteContents();
        const newNode = document.createTextNode(text);
        range?.insertNode(newNode);
      }
    }
  };

  useEffect(() => {
    getHistory();
    getUserWriting();
  }, [writer]);

  const inputting = (e: any) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(e.target.outerHTML, "text/html");
    const myTitle: any =
      doc.body.firstElementChild?.firstElementChild?.textContent;

    setTitle(myTitle);
    setEditorContent(e.target);
  };

  const insights = (category: string) => {
    if (highlightedText === "") {
      return;
    }

    setLoading(true);

    postRequest("/writer/ai-insight", {
      category,
      writer,
      content: highlightedText,
      variation: 3,
      type: currentType,
    })
      .then(() => {
        toast.success("Successful");
        setLoading(false);
        setRewriteText("");
        setHighlightedText("");
        setShowHighlightOptions(false);
        getHistory();
      })
      .catch((err) => {
        setHighlightedText("");
        setLoading(false);
        console.log(err.response);
      });
  };

  return (
    <PageLayout writings={writings}>
      <div className="generate h-full">
        <div className="p-2">
          <div
            className="editor h-full relative flex justify-center bg-white"
            onMouseUp={checkSelection}
          >
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
                    setRewriteText(highlightedText);
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
        </div>

        <div className="controls bg-white p-4 h-full overflow-y-auto">
          <div className="title mb-5">
            <div className="text-sm text-closeBlack font-bold">
              Review Suggestions
            </div>
            <div className="text-grey font-semibold text-xs">
              Integrated with GPT-Based Models
            </div>
          </div>

          <div>
            {rewriteText && (
              <>
                <div className="flex gap-2 items-center text-xs font-bold mb-2">
                  <img src={generate} alt="" />
                  <div>Rewrite</div>
                </div>

                <div className="text-grey font-semibold text-xs my-2">
                  {rewriteText}
                </div>

                <Dropdown
                  setType={setCurrentType}
                  types={types}
                  current={currentType}
                  click={() => insights("rewrite")}
                  loading={loading}
                />
              </>
            )}

            <div className="">
              {!history ? (
                <div className="h-60 flex justify-center items-center">
                  <ButtonLoader1 />
                </div>
              ) : history?.length < 1 ? (
                <div className="flex justify-center items-center h-40">
                  No Data
                </div>
              ) : (
                history?.map((item: any) => (
                  <Shorter key={item._id} item={item} insert={insertText} />
                  // <Shorter key={item._id} item={item} insert={insertText} />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Generate;

// useEffect(() => {
//   document.addEventListener("mouseup", checkSelection);

//   return () => {
//     document.removeEventListener("mouseup", checkSelection);
//   };
// }, []);
