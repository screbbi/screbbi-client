import PageLayout from "../layout/PageLayout";
import generate from "../assets/img/generate-rewrite.png";
import Shorter from "../components/Shorter";
import Dropdown from "../components/Dropdown";
import aText from "../assets/img/draw-a.svg";
import dText from "../assets/img/draw-d.svg";
import expand from "../assets/img/expand.svg";
import { IoIosArrowDown, IoMdLink } from "react-icons/io";
import he from "he";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { useEffect, useRef, useState } from "react";
import { getRequest, postRequest, putRequest } from "../utils/request";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import ButtonLoader1 from "../components/ButtonLoader1";
import WriteOptions from "../components/WriteOptions";
import WriteSettings from "../components/WriteSettigs";
import Prompt from "../components/Prompt";
import RewriteOption from "../components/RewriteOption";
import DescribeOptions from "../components/DescribeOptions";
import StoryBible from "../components/StoryBible";
import { useStore } from "zustand";
import store from "../store/state";
import chapter from "../assets/img/chapter.svg";
import Chapter from "../components/Chapter";
import { MdLinkOff } from "react-icons/md";
import Notlinked from "../components/Notlinked";
import CHaptersList from "../components/CHaptersList";
import SubscribeButton from "../components/SubscribeButton";

const types = [
  "Rephrase",
  "Shorten",
  "More descriptive",
  "Show, not tell",
  "More inner conflict",
  "More intense",
];

const Generate = () => {
  const { writer, project } = useParams();
  const optionRef: any = useRef();
  const reWriteRef: any = useRef();
  const describeRef: any = useRef();
  const linkedRef: any = useRef();
  const topPageRef: any = useRef();

  const { story, user, editToken, token } = useStore(store);

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
  const [selected, setSelected] = useState<any>(null);
  const [refresh, setRefresh] = useState(false);
  const [openWriteOptions, setOpenWriteOptions] = useState(false);
  const [openWriteSettings, setOpenWriteSettings] = useState(false);
  const [openPrompt, setOpenPrompt] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [loadingPrompt, setLoadingPrompt] = useState(false);
  const [tonedPromptSetting, setTonedPromptSetting] = useState({
    keyDetails: "",
    toneOfStory: "",
    lengthOfWords: 0,
    chapters: 0,
  });
  const [loadingToned, setLoadingToned] = useState(false);
  const [openRewriteOtions, setOpenRewriteOtions] = useState(false);
  const [openDescribeOptions, setOpenDescribeOptions] = useState(false);
  const [descriptions, setDescriptions] = useState([
    "sight",
    "smell",
    "taste",
    "sound",
    "touch",
  ]);
  const [cardNumber, setCardNumber] = useState(
    Number(localStorage.getItem("cardNumber")) ?? 1
  );
  const [braindump, setBraindump] = useState("");
  const [genre, setGenre] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [outline, setOutline] = useState("");
  const [matchStyle, setMatchStyle] = useState("");
  const [beats, setBeats] = useState("");
  const [openChapter, setOpenChapter] = useState(false);
  const [generatingBeats, setGeneratingBeats] = useState(false);
  const [generatingChapters, setGeneratingChapters] = useState(false);
  const [chapters, setChapters] = useState<any>({});
  const [linkedChapter, setLinkedChapter] = useState<any>(null);
  const [openLinkingOption, setOpenLinkingOption] = useState(false);
  const [openChapterLiking, setOpenChapterLiking] = useState(false);

  const setSenses = (sense: string) => {
    if (descriptions.includes(sense)) {
      setDescriptions((prevDes) => {
        return prevDes.filter((desc) => desc !== sense);
      });
    } else {
      setDescriptions((prevDes) => {
        return [...prevDes, sense];
      });
    }
  };

  const generatePrompt = () => {
    if (prompt.trim() === "") {
      alert("Prompt canot be empty");
      return;
    }

    setLoadingPrompt(true);

    postRequest("/writer/generate", { prompt, writer })
      .then(({ data }) => {
        setOpenWriteOptions(false);
        setOpenPrompt(false);
        setPrompt("");

        insertText(`${data.replaceAll("\n", "<br/>")}`);
        setLoadingPrompt(false);
      })
      .catch(() => {
        toast.error("Error getting prompt");

        setLoadingPrompt(false);
      });
  };

  const generateTonedPrompt = () => {
    if (tonedPromptSetting.keyDetails.trim() === "") {
      alert("Fill all fields");
      return;
    }

    setLoadingToned(true);
    putRequest("/writer/settings", { ...tonedPromptSetting, writer })
      .then(() => {
        setLoadingToned(false);
        setOpenWriteSettings(false);
        setOpenWriteOptions(false);
      })
      .catch(() => {
        setLoadingToned(false);
        toast.error("Error Saving settings");
      });
  };

  const handleWriteSettingsChange = (e: any) =>
    setTonedPromptSetting({
      ...tonedPromptSetting,
      [e.target.name]: e.target.value,
    });

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
  const scrollToTop = () => {
    topPageRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  function getSelectedText() {
    let selectedText: any = "";
    let selection: any = window.getSelection();

    if (document !== null && window !== null) {
      if (window.getSelection !== null) {
        let range = selection.getRangeAt(0).getBoundingClientRect();
        const { left, top } = range;

        if (window.innerWidth < 1024) {
          setStyle({ left: `${left - 15 * 4}px`, top: `${top - 16 * 10}px` });
        } else {
          setStyle({ left: `${left - 15 * 19}px`, top: `${top - 16 * 10}px` });
        }

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

    if (
      doc.body.firstElementChild?.firstElementChild?.outerHTML ==
      e.target.outerHTML
    )
      return;

    setShowHighlightOptions(false);

    var selectedText = getSelectedText();
    if (selectedText !== "") {
      setHighlightedText(selectedText);
    }
  };

  const saveDocument = () => {
    const editor = document.querySelector(".sun-editor-editable");
    const content: any = editor?.innerHTML;

    if (!writer) {
      return;
    }

    if (title?.trim === "") {
      return;
    }

    postRequest("/writer/writing", {
      writer,
      content: content,
      title,
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
    setWritings(null);
    getRequest(`/writer/writings?project=${project}`)
      .then(({ data }) => {
        const filtered = data.filter(
          (writing: any) => writing.project === project
        );

        setWritings(filtered);
        if (!writer) return;
        const currentContent = data.find(
          (content: any) => content._id === writer
        );

        setTonedPromptSetting(
          currentContent.writeSettings ?? {
            keyDetails: "",
            toneOfStory: "",
            lengthOfWords: 0,
            chapters: 0,
          }
        );

        if (currentContent.content) {
          const decoded = he.decode(currentContent.content);

          const parser = new DOMParser();
          const doc: any = parser.parseFromString(decoded, "text/xml");
          const docContent: any = parser.parseFromString(
            currentContent,
            "text/xml"
          );

          if (
            doc.firstChild?.querySelector("p")?.textContent ||
            docContent?.body?.firstChild?.textContent
          ) {
            setTitle(
              doc.firstChild?.querySelector("p")?.textContent ??
                doc?.body?.firstChild?.textContent
            );
            setEditorContent(decoded);
          } else {
            setTitle("Untitled Document");
            setEditorContent(`<p>Untitled Document</p> \n ${decoded}`);
          }
        } else {
          setEditorContent(`<p>${currentContent.title}</p>`);
          setTitle(currentContent.title);
        }

        if (currentContent?.linkedChapter) {
          setOpenChapter(true);
          setLinkedChapter(currentContent?.linkedChapter?.chapter);
        } else {
          setLinkedChapter(null);
          setOpenChapter(false);
        }

        if (currentContent.beats !== null) {
          setBeats(currentContent.beats);
        } else {
          setBeats("");
        }
      })
      .catch(() => {
        toast.error("Unable to get User writings");
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

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        optionRef.current &&
        !optionRef?.current?.contains(event.target as Node)
      ) {
        setOpenWriteOptions(false);
        setOpenWriteSettings(false);
        setOpenPrompt(false);
      }

      if (
        reWriteRef.current &&
        !reWriteRef?.current?.contains(event.target as Node)
      ) {
        setOpenRewriteOtions(false);
      }

      if (
        linkedRef.current &&
        !linkedRef?.current?.contains(event.target as Node)
      ) {
        setOpenChapterLiking(false);
        setOpenLinkingOption(false);
      }
      if (
        describeRef.current &&
        !describeRef?.current?.contains(event.target as Node)
      ) {
        setOpenDescribeOptions(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const getHistory = () => {
    if (!writer) {
      return;
    }
    setHistory(null);
    getRequest(`/writer/history/${writer}`)
      .then(({ data }: { data: any }) => {
        const reversed = data.reverse();
        setHistory(reversed);
      })
      .catch(() => {
        toast.error("Error getting history");
      });
  };

  const insertText = (text: string) => {
    const editor = document.querySelector(".sun-editor-editable");
    const p = document.createElement("p");
    p.innerHTML = text;

    if (!selected) {
      editor?.appendChild(p);
      saveDocument();
    } else {
      if (editor) {
        const lines = text.split("<br/>");

        lines.forEach((line, index) => {
          const textNode = document.createTextNode(line);
          if (index === 0) {
            const brElement = document.createElement("br");
            selected.insertNode(brElement);
            selected.setStartAfter(brElement);
          }
          selected.insertNode(textNode);
          selected.setStartAfter(textNode);
          if (index < lines.length - 1) {
            const brElement = document.createElement("br");
            selected.insertNode(brElement);
            selected.setStartAfter(brElement);
          }
        });
        saveDocument();
        // selected?.deleteContents();
        // const newNode = document.createTextNode(text);
        // selected?.insertNode(newNode);
      }
    }
  };

  useEffect(() => {
    setEditorContent("");
    getHistory();
    getUserWriting();
  }, [writer, refresh]);

  const insights = (category: string) => {
    if (highlightedText === "") {
      return;
    }

    setLoading(true);

    if (category === "describe") {
      postRequest("/writer/ai-insight", {
        category,
        writer,
        content: highlightedText,
        variation: 3,
        type: currentType,
        descriptions,
      })
        .then(() => {
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
    } else {
      postRequest("/writer/ai-insight", {
        category,
        writer,
        content: highlightedText,
        variation: 3,
        type: currentType,
      })
        .then(() => {
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
    }
  };

  const setRange = () => {
    const select = window.getSelection();
    const range = select?.getRangeAt(0);
    setSelected(range);
  };

  const inputting = () => {
    const editor = document.querySelector(".sun-editor-editable");
    const content: any = editor?.innerHTML;

    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");

    setTitle(doc?.body?.firstChild?.textContent);
    setEditorContent(content);

    const selection: any = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);

      setSelected(range);
    }
  };

  const generateChapter = () => {
    if (!outline.trim()) {
      alert("Outline cannot be empty");
      return;
    } else {
      if (!linkedChapter) {
        alert("Link a chapter from your outline to continue");
        return;
      }
    }

    setGeneratingBeats(true);

    postRequest("/chapter/beats-generate", {
      outline,
      chapter: Number(linkedChapter.slice(-1)),
      projectID: project,
      writing: writer,
    })
      .then(({ data }) => {
        setBeats(data?.result?.replace(/\*/g, ""));
        editToken(data.tokens.newToken);
        setGeneratingBeats(false);
      })
      .catch((err) => {
        setGeneratingBeats(false);
        console.log(err.response.data);
      });
  };

  const generateProse = () => {
    if (!beats.trim()) {
      alert("Beats cannot be empty");
    }

    const postData = {
      projectID: project,
      writing: writer,
    };

    setGeneratingChapters(true);

    const streamProse = async () => {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/chapter/prose-generate`,
        {
          body: JSON.stringify(postData),
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const stream = res?.body?.getReader();
      let text = "";
      let reader = await stream?.read();

      while (!reader?.done) {
        const value = reader?.value;
        const decoder = new TextDecoder();
        const decoded = decoder.decode(value);
        const response = decoded.toString();

        // console.log(response);

        if (response == "Recharge Token to continue") {
          toast("Not Enough Token");
          break;
        } else {
          text += response;

          const newArray = text
            .split("\n")
            .map((text: string) => `<p>${text}</p>`)
            .join("");

          if (
            title?.trim() === "" ||
            title ===
              "This page contains the following errors:error on line 1 at column 1: Start tag expected, '<' not foundBelow is a rendering of the page up to the first error."
          ) {
            setTitle("Untitled Document");
            setEditorContent(`<p>Untitled Document</p>\n ${newArray}`);
          } else {
            setEditorContent(
              `<p>${title ?? "Untitled Document"}</p>\n  ${newArray}`
            );
          }
          saveDocument();
        }

        setOpenChapter(false);
        // console.log("Received data chunk:", response);
        // editToken(data.tokens.newToken);

        reader = await stream?.read();
      }

      setGeneratingChapters(false);
      // console.log("LOADER");
    };

    streamProse();
  };

  const retriveLocal = (story: any) => {
    setSynopsis(story?.synopsis?.replace(/\*/g, "") ?? "");
    setGenre(story?.genre?.replace(/\*/g, "") ?? "");
    setMatchStyle(story?.style?.replace(/\*/g, "") ?? "");
    setChapters(story?.chapters ?? {});
    setOutline(story?.outline?.replace(/\*/g, "") ?? "");
    setBraindump(story?.braindump?.replace(/\*/g, "") ?? "");
  };

  useEffect(() => {
    getRequest(`/project/projects`)
      .then(({ data }) => {
        const currentProject = data.find((item: any) => item._id === project);
        const story = currentProject?.storyBible;
        retriveLocal(story);
      })
      .catch((err: any) => {
        toast.error(err.response.data);
      });
  }, []);

  return (
    <PageLayout writings={writings} refresh={() => setRefresh(!refresh)}>
      {writer ? (
        <div className={`editors ${token <= 5000 && "grid"}`}>
          {token <= 5000 && (
            <div className="p-2">
              <div className="flex justify-between items-center p-4 bg-white rounded-lg">
                <div className="">Your token balance of {token} is low</div>

                <Link to={"/billing"}>
                  <button className="bg-buttonPurple text-white py-2 px-4 rounded-md text-sm font-semibold">
                    Recharge
                  </button>
                </Link>
              </div>
            </div>
          )}

          <div className={`${token <= 5000 ? "generates" : "generate"}`}>
            <div className="py-2 px-6 overflow-y-scroll">
              {/* WRITE OPTIONS */}
              <div
                className="flex justify-between items-center relative mb-4"
                ref={topPageRef}
              >
                <div className="flex gap-2 items-center">
                  <div
                    className="write-option"
                    onClick={() => {
                      setOpenWriteOptions(!openWriteOptions);
                    }}
                    ref={optionRef}
                  >
                    <svg
                      width="17"
                      height="16"
                      viewBox="0 0 17 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.16667 15.5C1.93056 15.5 1.73278 15.42 1.57333 15.26C1.41389 15.1 1.33389 14.9022 1.33333 14.6667V12.6458C1.33333 12.4236 1.375 12.2117 1.45833 12.01C1.54167 11.8083 1.65972 11.6314 1.8125 11.4792L12.3125 1C12.4792 0.833333 12.6667 0.708333 12.875 0.625C13.0833 0.541667 13.2917 0.5 13.5 0.5C13.7222 0.5 13.9342 0.541667 14.1358 0.625C14.3375 0.708333 14.5144 0.833333 14.6667 1L15.8333 2.16667C16 2.31944 16.125 2.49667 16.2083 2.69833C16.2917 2.9 16.3333 3.11167 16.3333 3.33333C16.3333 3.54167 16.2917 3.75 16.2083 3.95833C16.125 4.16667 16 4.35417 15.8333 4.52083L5.35417 15.0208C5.20139 15.1736 5.02444 15.2917 4.82333 15.375C4.62222 15.4583 4.41028 15.5 4.1875 15.5H2.16667ZM13.5417 4.47917L14.6667 3.35417L13.4792 2.16667L12.3542 3.29167L13.5417 4.47917ZM9.66667 15.5C10.6944 15.5 11.6458 15.2431 12.5208 14.7292C13.3958 14.2153 13.8333 13.5 13.8333 12.5833C13.8333 12.1389 13.7222 11.7533 13.5 11.4267C13.2778 11.1 12.9861 10.7981 12.625 10.5208C12.4306 10.3819 12.2222 10.3125 12 10.3125C11.7778 10.3125 11.5903 10.3958 11.4375 10.5625C11.2847 10.7292 11.2083 10.9342 11.2083 11.1775C11.2083 11.4208 11.3056 11.6117 11.5 11.75C11.6944 11.9028 11.8542 12.0417 11.9792 12.1667C12.1042 12.2917 12.1667 12.4306 12.1667 12.5833C12.1667 12.9028 11.9131 13.1911 11.4058 13.4483C10.8986 13.7056 10.3189 13.8339 9.66667 13.8333C9.43056 13.8333 9.23278 13.9133 9.07333 14.0733C8.91389 14.2333 8.83389 14.4311 8.83333 14.6667C8.83333 14.9028 8.91333 15.1008 9.07333 15.2608C9.23333 15.4208 9.43111 15.5006 9.66667 15.5ZM5.5 3C5.5 3.19444 5.37861 3.37167 5.13583 3.53167C4.89306 3.69167 4.33389 3.97278 3.45833 4.375C2.34722 4.86111 1.57639 5.30222 1.14583 5.69833C0.715278 6.09444 0.5 6.58389 0.5 7.16667C0.5 7.52778 0.583333 7.84722 0.75 8.125C0.916667 8.40278 1.13194 8.64583 1.39583 8.85417C1.57639 9.00694 1.77778 9.07306 2 9.0525C2.22222 9.03194 2.40972 8.93111 2.5625 8.75C2.71528 8.56944 2.78472 8.36806 2.77083 8.14583C2.75694 7.92361 2.65972 7.73611 2.47917 7.58333C2.38194 7.51389 2.30556 7.44444 2.25 7.375C2.19444 7.30556 2.16667 7.23611 2.16667 7.16667C2.16667 7 2.29167 6.83333 2.54167 6.66667C2.79167 6.5 3.31944 6.24306 4.125 5.89583C5.34722 5.36806 6.15972 4.88889 6.5625 4.45833C6.96528 4.02778 7.16667 3.54167 7.16667 3C7.16667 2.23611 6.86111 1.62861 6.25 1.1775C5.63889 0.726389 4.83333 0.500556 3.83333 0.5C3.20833 0.5 2.64917 0.611111 2.15583 0.833333C1.6625 1.05556 1.28417 1.32639 1.02083 1.64583C0.868056 1.82639 0.805556 2.02778 0.833333 2.25C0.861111 2.47222 0.965278 2.65278 1.14583 2.79167C1.32639 2.94444 1.52778 3.00694 1.75 2.97917C1.97222 2.95139 2.15972 2.86111 2.3125 2.70833C2.50694 2.51389 2.72222 2.375 2.95833 2.29167C3.19444 2.20833 3.48611 2.16667 3.83333 2.16667C4.40278 2.16667 4.82306 2.25 5.09417 2.41667C5.36528 2.58333 5.50056 2.77778 5.5 3Z"
                        fill="black"
                      />
                    </svg>

                    <div>Write</div>

                    <IoIosArrowDown className="text-base" />
                    {openWriteOptions && (
                      <WriteOptions
                        openSettings={() => {
                          setOpenWriteSettings(true);
                          setOpenWriteOptions(false);
                        }}
                        openPrompt={() => {
                          setOpenPrompt(true);
                          setOpenWriteOptions(false);
                        }}
                      />
                    )}

                    {openWriteSettings && (
                      <WriteSettings
                        back={() => {
                          setOpenWriteSettings(false);
                          setOpenWriteOptions(true);
                        }}
                        writeSetting={tonedPromptSetting}
                        change={handleWriteSettingsChange}
                        generate={generateTonedPrompt}
                        loading={loadingToned}
                      />
                    )}

                    {openPrompt && (
                      <Prompt
                        generate={generatePrompt}
                        back={() => {
                          setOpenPrompt(false);
                          setOpenWriteOptions(true);
                        }}
                        prompt={prompt}
                        setPrompt={setPrompt}
                        loading={loadingPrompt}
                      />
                    )}
                  </div>

                  <div
                    className="write-option"
                    onClick={() => {
                      setOpenRewriteOtions(true);
                    }}
                    ref={reWriteRef}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.14002 7.50001H3.85702L5.49902 2.81501L7.14002 7.50001ZM7.66602 9.00001L7.99602 9.94401L9.17402 8.76701L6.30002 0.569006C6.03402 -0.189994 4.96102 -0.189994 4.69602 0.569006L1.04002 11.003C0.974246 11.1908 0.985759 11.397 1.07203 11.5763C1.15829 11.7556 1.31225 11.8932 1.50002 11.959C1.68779 12.0248 1.894 12.0133 2.07329 11.927C2.25257 11.8407 2.39025 11.6868 2.45602 11.499L3.33002 9.00001H7.66602ZM12.806 6.54801L7.97702 11.378C7.69552 11.6594 7.49574 12.0119 7.39902 12.398L7.02502 13.896C7.01341 13.942 7.00539 13.9888 7.00102 14.036C6.62849 14.0518 6.25542 14.0222 5.89002 13.948C5.81702 13.931 5.79002 13.838 5.82402 13.77C6.00402 13.422 6.05702 12.697 5.42002 12.44C4.56002 12.095 3.44202 12.565 2.55802 12.938C2.19202 13.092 1.86602 13.228 1.61402 13.284C1.22702 13.37 0.76602 13.219 0.39802 13.035C0.18602 12.929 -0.0839801 13.117 0.0380199 13.321C0.25702 13.687 0.65202 14.058 1.36402 14.146C2.18402 14.248 2.75502 13.994 3.33902 13.736C3.73902 13.558 4.14402 13.378 4.63902 13.308C4.72502 13.296 4.78402 13.398 4.75102 13.478C4.59902 13.835 4.61802 14.372 5.06702 14.722C5.58502 15.127 7.25802 15.233 8.38002 14.905L9.60102 14.6C9.98802 14.503 10.341 14.304 10.622 14.022L15.452 9.19201C15.6278 9.01882 15.7676 8.81255 15.8634 8.58508C15.9591 8.35761 16.0088 8.11344 16.0097 7.86665C16.0107 7.61986 15.9627 7.37533 15.8687 7.14716C15.7746 6.91899 15.6363 6.7117 15.4618 6.53722C15.2873 6.36275 15.0799 6.22455 14.8517 6.13059C14.6235 6.03663 14.379 5.98878 14.1322 5.98978C13.8854 5.99078 13.6412 6.04062 13.4138 6.13643C13.1864 6.23224 12.9801 6.37212 12.807 6.54801"
                        fill="#1E1E1E"
                      />
                    </svg>

                    <div>Rewrite</div>

                    <IoIosArrowDown className="text-base" />

                    {openRewriteOtions && (
                      <RewriteOption
                        cardNumber={cardNumber}
                        setCardNumber={setCardNumber}
                      />
                    )}
                  </div>

                  <div
                    className="write-option"
                    ref={describeRef}
                    onClick={() => {
                      setOpenDescribeOptions(!openDescribeOptions);
                    }}
                  >
                    <svg
                      width="17"
                      height="17"
                      viewBox="0 0 17 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0 3C0 2.20435 0.316071 1.44129 0.87868 0.87868C1.44129 0.316071 2.20435 0 3 0H11C11.7956 0 12.5587 0.316071 13.1213 0.87868C13.6839 1.44129 14 2.20435 14 3V6.003C13.659 6.019 13.32 6.095 13 6.232V3C13 2.46957 12.7893 1.96086 12.4142 1.58579C12.0391 1.21071 11.5304 1 11 1H3C2.46957 1 1.96086 1.21071 1.58579 1.58579C1.21071 1.96086 1 2.46957 1 3V12.5C1 12.6326 0.947321 12.7598 0.853553 12.8536C0.759785 12.9473 0.632608 13 0.5 13C0.367392 13 0.240215 12.9473 0.146447 12.8536C0.0526785 12.7598 0 12.6326 0 12.5V3ZM0.4 14.035C0.769 14.219 1.23 14.37 1.617 14.285C1.868 14.229 2.194 14.092 2.56 13.938C3.445 13.565 4.563 13.095 5.422 13.441C6.059 13.697 6.006 14.422 5.827 14.771C5.792 14.837 5.819 14.931 5.892 14.948C6.25772 15.0223 6.63114 15.0519 7.004 15.036C7.00804 14.9888 7.01573 14.942 7.027 14.896L7.402 13.398C7.49791 13.0116 7.69781 12.6588 7.98 12.378L12.81 7.548C12.9832 7.37218 13.1895 7.23238 13.4169 7.13665C13.6444 7.04093 13.8886 6.99118 14.1354 6.99027C14.3821 6.98936 14.6267 7.03731 14.8548 7.13136C15.083 7.2254 15.2903 7.36368 15.4648 7.53822C15.6393 7.71276 15.7775 7.92011 15.8714 8.14832C15.9654 8.37652 16.0132 8.62107 16.0122 8.86786C16.0112 9.11465 15.9614 9.35879 15.8656 9.58623C15.7698 9.81366 15.6299 10.0199 15.454 10.193L10.624 15.022C10.3426 15.3035 9.99008 15.5033 9.604 15.6L8.382 15.905C7.261 16.233 5.588 16.127 5.069 15.722C4.62 15.372 4.602 14.835 4.753 14.478C4.787 14.398 4.727 14.295 4.642 14.308C4.147 14.378 3.742 14.558 3.342 14.735C2.757 14.995 2.186 15.248 1.366 15.146C0.655 15.058 0.259 14.687 0.0409999 14.321C-0.0810001 14.117 0.187 13.929 0.4 14.035Z"
                        fill="#1E1E1E"
                      />
                    </svg>

                    <div>Describe</div>

                    <IoIosArrowDown className="text-base" />

                    {openDescribeOptions && (
                      <DescribeOptions
                        descriptions={descriptions}
                        setDesc={setSenses}
                      />
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div
                    className="flex bg-gray-200 items-center px-2 py-1 rounded-full gap-2 relative"
                    onClick={() => setOpenLinkingOption(true)}
                    ref={linkedRef}
                  >
                    {linkedChapter ? <IoMdLink className="" /> : <MdLinkOff />}

                    {linkedChapter ? (
                      <div>
                        <div className="text-xs">Outline Linked</div>
                        <div className="text-[10px]">{linkedChapter}</div>
                      </div>
                    ) : (
                      <div className="text-sm">Not in Outline</div>
                    )}

                    {openLinkingOption && (
                      <Notlinked
                        linked={linkedChapter}
                        handleClick={() => {
                          setOpenLinkingOption(false);
                          setOpenChapterLiking(true);
                        }}
                      />
                    )}

                    {openChapterLiking && (
                      <CHaptersList
                        chapters={chapters}
                        handleClick={(chap) => {
                          setLinkedChapter(chap);
                          setOpenChapterLiking(false);
                        }}
                      />
                    )}
                  </div>

                  <button
                    title="Chapter"
                    onClick={() => setOpenChapter(!openChapter)}
                  >
                    <img src={chapter} alt="" />
                  </button>

                  {openChapter && (
                    <Chapter
                      close={() => setOpenChapter(false)}
                      generate={generateChapter}
                      beats={beats}
                      setBeats={setBeats}
                      generateProse={generateProse}
                      loadingBeats={generatingBeats}
                      loadingChapter={generatingChapters}
                      chapters={chapters}
                      linked={linkedChapter}
                    />
                  )}
                </div>
              </div>

              {/* EDITOR */}
              <div
                className="editor relative flex justify-center bg-slate-400 rounded-lg overflow-hidden shadow-lg"
                onMouseUp={checkSelection}
              >
                <SunEditor
                  setOptions={options}
                  setDefaultStyle="font-family: 'Manrope', sans-serif; background:'transparent;"
                  setContents={editorContent}
                  height={
                    token <= 5000
                      ? "calc(100vh - 17rem)"
                      : "calc(100vh - 12rem)"
                  }
                  width="100%"
                  onInput={inputting}
                  onClick={() => {
                    setRange();
                  }}
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

                {/* STORY BIBLE */}
              </div>

              {story === "true" && (
                <StoryBible
                  genre={genre}
                  setGenre={setGenre}
                  braindump={braindump}
                  setBraindump={setBraindump}
                  synopsis={synopsis}
                  setSynopsis={setSynopsis}
                  outline={outline}
                  setOutline={setOutline}
                  setMatchStyle={setMatchStyle}
                  matchStyle={matchStyle}
                  chapters={chapters}
                  setChapters={setChapters}
                  scrollToTop={scrollToTop}
                />
              )}
            </div>

            <div className="controls bg-white p-4 h-full overflow-y-auto">
              <div>
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
                        <Shorter
                          key={item._id}
                          item={item}
                          insert={insertText}
                        />
                      ))
                    )}
                  </div>
                </div>
              </div>

              {user?.subscription?.trialUser || token < 200 ? (
                <div className="flex justify-end">
                  <SubscribeButton />
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="h-[90vh] w-full bg-white flex justify-center items-center">
          <div className="text-2xl font-semibold">
            Select a Document to edit
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default Generate;
