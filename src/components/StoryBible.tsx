import { PiBrainThin } from "react-icons/pi";
import { FaRegCopy } from "react-icons/fa6";
import { LuHistory } from "react-icons/lu";
import { PiFlowerTulipDuotone } from "react-icons/pi";
import { GiMustache } from "react-icons/gi";
import { BsStars } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
import { FaGlobeAmericas, FaPlus } from "react-icons/fa";
import { BsPersonBoundingBox, BsMenuButtonWide } from "react-icons/bs";
import { useState } from "react";
import { nanoid } from "nanoid";
import SingleForm from "./SingleForm";
import {
  delRequest,
  getRequest,
  postRequest,
  putRequest,
} from "../utils/request";
import toast from "react-hot-toast";
import { copyToClipboard } from "../utils/functions";
import Writing from "./Writing";
import { useNavigate, useParams } from "react-router-dom";
import CompressMatchStyle from "./CompressMatchStyle";
import Compressed from "./Compressed";
import SingleCharacter from "./SingleCharacter";

const StoryBible = ({
  genre,
  braindump,
  synopsis,
  matchStyle,
  characters = [],
  outline,
  setOutline,
  setCharacters,
  setMatchStyle,
  setBraindump,
  setSynopsis,
  setGenre,
}: {
  synopsis: string;
  braindump: string;
  genre: string;
  matchStyle: any;
  characters: any[];
  outline: string;

  setGenre: (e: string) => void;
  setBraindump: (e: string) => void;
  setSynopsis: (e: string) => void;
  setMatchStyle: (e: string) => void;
  setCharacters: (e: any) => void;
  setOutline: (e: string) => void;
}) => {
  const { project } = useParams();
  const navigate = useNavigate();
  const formTypes = [
    "settings",
    "organizations",
    "lore",
    "key events",
    "clue",
    "magic system",
    "item",
    "technology",
    "government",
    "economy",
    "culture",
    "religiion",
    "custom",
  ];

  const [forms, setForms] = useState<any>([]);
  const [generatingSynopsis, setGeneratingSynopsis] = useState(false);
  const [generatingMatchStyle, setGeneratingMatchStyle] = useState(false);
  const [openWriting, setOpenWriting] = useState(false);
  const [openCompressWriting, setOpenCompressWriting] = useState(false);
  const [compressing, setCompressing] = useState(false);
  const [rawText, setRawText] = useState("");
  const [compressedText, setCompressedText] = useState("");
  const [openInsertModal, setOpenInsertModal] = useState(false);
  const [generatingCharacters, setGeneratingCharacters] = useState(false);
  const [generatingOutline, setGeneratingOutline] = useState(false);
  // const [demoChar, setDemoChar] = useState(chars);
  const [chapters, setChapters] = useState<any>({});
  const [currentChapter, setCurrentChapter] = useState("");
  const [addingChapter, setAddingChapter] = useState(false);

  const editChars = (key: string, value: string, index: number) => {
    const newChar = characters.map((char: any, idx: number) => {
      if (idx === index) {
        return { ...char, [key]: value };
      } else {
        return char;
      }
    });

    setCharacters(newChar);
  };

  const saveLocal = (field: string, value: string) => {
    const projects: any = localStorage.getItem("projects");
    const projec = JSON.parse(projects);

    const newProject: any = projec.map((item: any) => {
      if (item._id === project) {
        return { ...item, storyBible: { ...item.storyBible, [field]: value } };
      } else {
        return item;
      }
    });

    console.log(newProject);

    localStorage.setItem("projects", JSON.stringify(newProject));
  };

  const addForms = (type: string) => {
    setForms((prevForm: any) => {
      return [...prevForm, { type, traits: [], id: nanoid(), name: "" }];
    });
  };

  const addTrait = (formId: string) => {
    setForms((prevForm: any) => {
      return prevForm.map((form: any) => {
        if (form.id == formId) {
          return {
            ...form,
            traits: [...form.traits, { name: "", id: nanoid(), value: "" }],
          };
        }
      });
      //   return [...prevForm, { type, traits: [], id: nanoid(), name: "" }];
    });
  };

  const setFormName = (id: string, name: string) => {
    setForms((prevForm: any) => {
      return prevForm.map((form: any) => {
        if (form.id === id) {
          return { ...form, name };
        } else return form;
      });
    });
  };

  const setFieldName = (id: string, traitId: string, name: string) => {
    setForms((prevForm: any) => {
      return prevForm.map((form: any) => {
        if (form.id === id) {
          const newTraits = form.traits.map((item: any) => {
            if (item.id === traitId) {
              return { ...item, name };
            } else return item;
          });

          return { ...form, traits: newTraits };
        } else return form;
      });
    });
  };

  const setFieldValue = (id: string, traitId: string, value: string) => {
    setForms((prevForm: any) => {
      return prevForm.map((form: any) => {
        if (form.id === id) {
          const newTraits = form.traits.map((item: any) => {
            if (item.id === traitId) {
              return { ...item, value };
            } else return item;
          });

          return { ...form, traits: newTraits };
        } else return form;
      });
    });
  };

  const generateSynopsis = () => {
    // if (braindump.trim() === "") {
    //   alert("Braindump cannot be empty");
    //   return;
    // } else if (genre.trim() === "") {
    //   alert("Genre cannot be empty");
    //   return;
    // }

    setGeneratingSynopsis(true);
    getRequest(`/story/synopsis-generate/${project}`)
      .then(({ data }) => {
        setSynopsis(data);
        setGeneratingSynopsis(false);
        saveLocal("synopsis", data.replace(/\*/g, ""));
      })
      .catch(() => {
        setGeneratingSynopsis(false);
        toast.error("Error generating synopsis");
      });
  };

  const generateMatchStyle = (writing: string) => {
    if (writing.trim() === "") {
      alert("Writing cannot be empty");
      return;
    }

    setGeneratingMatchStyle(true);
    postRequest("/story/style-generate", { writing, projectID: project })
      .then(({ data }) => {
        setRawText(data.replace(/\*/g, ""));
        saveLocal("style", data.replace(/\*/g, ""));
        setGeneratingMatchStyle(false);
        setOpenWriting(false);
        setOpenCompressWriting(true);
      })
      .catch(() => {
        setGeneratingMatchStyle(false);
        toast.error("Error generating match style");
      });
  };

  const generateCompressStyle = (style: string) => {
    if (style.trim() === "") {
      alert("Style cannot be empty");
      return;
    }

    setCompressing(true);
    postRequest("/story/style-compress", { style, projectID: project })
      .then(({ data }) => {
        setCompressedText(data.replaceAll("**", `''`));
        setCompressing(false);
        setOpenCompressWriting(false);
        setOpenInsertModal(true);
      })
      .catch(() => {
        setCompressing(false);
        toast.error("Error generating match style");
      });
  };

  const generateOutline = () => {
    // if (synopsis.trim() === "") {
    //   alert("Synopsis cannot be empty");
    //   return;
    // } else if (genre.trim() === "") {
    //   alert("Genre cannot be empty");
    //   return;
    // }

    setGeneratingOutline(true);
    getRequest(`/story/outline-generate/${project}`)
      .then(({ data }) => {
        setOutline(data?.outline.replace(/\*/g, ""));
        setChapters(data.chapters);
        saveLocal("outline", data);
        setGeneratingOutline(false);
      })
      .catch(() => {
        setGeneratingOutline(false);
        toast.error("Error generating outline");
      });
  };

  const generateCharacters = () => {
    // if (synopsis.trim() === "") {
    //   alert("Synopsis cannot be empty");
    //   return;
    // } else if (braindump.trim() === "") {
    //   alert("Braindump cannot be empty");
    //   return;
    // }

    setGeneratingCharacters(true);
    getRequest(`/story/characters-generate/${project}`)
      .then(({ data }) => {
        let characterString = "";

        data.forEach((item: any) => {
          characterString += `${item.name}\n Personality: ${item.personality} \n Background: ${item.background} \n\n`;
        });

        saveLocal("characters", data);

        setGeneratingCharacters(false);
        setCharacters(characterString);
      })
      .catch(() => {
        setGeneratingCharacters(false);
        toast.error("Error generating characters");
      });
  };

  const saveChanges = (field: string, value: string) => {
    putRequest("/story/fill", {
      projectID: project,
      [field]: value,
    })
      .then()
      .catch(() => {
        toast.error(`Error Saving ${field}`);
      });
  };

  const deleteCharacter = (id: string) => {
    delRequest(`/story/characters-delete?projectID=${project}&character=${id}`)
      .then((data) => {
        console.log(data);
      })
      .catch(() => {
        toast.error("Unable to delete");
      });
  };

  const updateCharacter = (id: string, char: any) => {
    putRequest(`/story/characters-update/${id}`, {
      productID: project,
      ...char,
    })
      .then((data) => {
        console.log(data);
      })
      .catch(() => {
        toast.error("Unable to update");
      });
  };

  const addChaacter = () => {
    postRequest("/story/characters-create", {
      projectID: project,
      name: "Name",
      other_names: "",
      dialogue_style: "",
      background: "",
      personality: "",
      pronouns: "",
    })
      .then(({ data }) => {
        setCharacters((prevChar: any) => {
          return [...prevChar, data.traits];
        });
        generateCharacters();
      })
      .catch(() => {
        toast.error("Unable to add character");
      });
  };

  const addChapter = () => {
    setAddingChapter(true);
    postRequest("/story/add-chapter", {
      chapter: currentChapter,
      projectID: project,
    })
      .then(({ data }) => {
        navigate(`/project/${data.project}/${data._id}`);
        setAddingChapter(false);
      })
      .catch(() => {
        setAddingChapter(false);
        toast.error("Unabe to Add Chapter");
      });
  };

  return (
    <div className="w-full mt-4">
      <div className="single-story">
        <div className="single-story-top">
          <div className="flex items-center gap-2">
            <PiBrainThin />
            <div className="font-semibold">Braindump</div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-sm font-semibold">0/2000 words</div>
            <FaRegCopy />
            <LuHistory />
          </div>
        </div>

        <textarea
          className="single-story-textarea"
          placeholder="Write a braindump of everything you know about the story. You can include information about plot, characters, worldbuilding, theme - anything!"
          value={braindump}
          onChange={(e) => {
            setBraindump(e.target.value);
            saveLocal("braindump", e.target.value);
          }}
          onBlur={() => saveChanges("braindump", braindump)}
        ></textarea>
      </div>

      <div className="single-story">
        <div className="single-story-top">
          <div className="flex items-center gap-2">
            <PiFlowerTulipDuotone />
            <div className="font-semibold">Genre</div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-sm font-semibold">0/40 words</div>
            <FaRegCopy />
          </div>
        </div>

        <textarea
          className="single-story-textarea"
          placeholder="What genre are you writing in? Feel free to include sub-genres and tropes. Examples: Romance, Horror, Fantasy, Cozy mystery, Friends-to-Lovers, Gumshoe"
          value={genre}
          onChange={(e) => {
            setGenre(e.target.value);
            saveLocal("genre", e.target.value);
          }}
          onBlur={() => saveChanges("genre", genre)}
        ></textarea>
      </div>

      <div className="single-story">
        <div className="single-story-top">
          <div className="flex items-center gap-2">
            <GiMustache />
            <div className="font-semibold">Style</div>
          </div>

          <div className="flex items-center gap-4 text-nowrap">
            {/* <div className="text-sm font-semibold">0/40 words</div> */}
            <FaRegCopy
              className="cursor-pointer"
              onClick={() =>
                copyToClipboard(
                  matchStyle.replaceAll("\n", "<br>").replaceAll("**", '"')
                )
              }
            />
            <button
              className="text-base text-white bg-buttonPurple rounded-md py-2 font-normal gap-2 inline-flex justify-center items-center px-4"
              onClick={() => setOpenWriting(true)}
            >
              <BsStars />
              Match my style
            </button>
          </div>
        </div>

        <textarea
          className="single-story-textarea"
          placeholder="Write the style of prose you want Story Bible to write. e.g. short sentences, lots of dialogue, show don’t tell"
          value={matchStyle}
          onChange={(e) => {
            setMatchStyle(e.target.value);
            saveLocal("style", e.target.value);
          }}
          onBlur={() => saveChanges("style", matchStyle)}
        ></textarea>
      </div>

      <div className="single-story">
        <div className="single-story-top">
          <div className="flex items-center gap-2">
            <GiMustache />
            <div className="font-semibold">Synopsis</div>
          </div>

          <div className="flex items-center gap-4 text-nowrap">
            {/* <div className="text-sm font-semibold">0/800 words</div> */}
            <FaRegCopy onClick={() => copyToClipboard(synopsis)} />
            <button
              className="text-base text-white bg-buttonPurple rounded-md py-2 font-normal gap-2 inline-flex justify-center items-center px-4"
              type="button"
              onClick={generateSynopsis}
              disabled={generatingSynopsis}
            >
              <BsStars />
              {generatingSynopsis ? "Generating..." : "Generate Synopsis"}
            </button>
          </div>
        </div>

        <textarea
          className="single-story-textarea"
          placeholder="Introduce the characters, their goals, and the central conflict, while conveying the story's tone, themes, and unique elements."
          onChange={(e) => setSynopsis(e.target.value)}
          value={synopsis}
          onBlur={() => saveChanges("synopsis", synopsis)}
        ></textarea>
      </div>

      <div className="single-story">
        <div className="single-story-top">
          <div className="flex items-center gap-2">
            <BsPersonBoundingBox />
            <div className="font-semibold">Characters</div>
          </div>

          <div className="flex items-center gap-4 text-nowrap">
            <button
              className="text-base border border-buttonPurple text-buttonPurple rounded-md py-2 font-semibold gap-2 inline-flex justify-center items-center px-4"
              onClick={addChaacter}
              disabled={generatingCharacters}
            >
              <FaPlus />
              Add Characters
            </button>
            <button
              className="text-base text-white bg-buttonPurple rounded-md py-2 font-normal gap-2 inline-flex justify-center items-center px-4"
              onClick={generateCharacters}
              disabled={generatingCharacters}
            >
              <BsStars />
              {generatingCharacters ? "Generating.." : "Generate Characters"}
            </button>
          </div>
        </div>
      </div>

      {characters?.map((item, idx: number) => (
        <SingleCharacter
          key={idx}
          character={item}
          index={idx}
          handleChange={editChars}
          deleteChar={() => deleteCharacter(item._id)}
          updateChar={updateCharacter}
        />
      ))}

      <div className="single-story">
        <div className="single-story-top">
          <div className="flex items-center gap-2">
            <BsMenuButtonWide />
            <div className="font-semibold">Outline</div>
          </div>

          <div className="flex items-center gap-4 text-nowrap">
            {/* <div className="text-sm font-semibold">0/1700 words</div> */}
            <FaRegCopy />
            <button
              className="text-base text-white bg-buttonPurple rounded-md py-2 font-normal gap-2 inline-flex justify-center items-center px-4"
              onClick={generateOutline}
              disabled={generatingOutline}
            >
              <BsStars />
              {generatingOutline ? "Generating.." : "Generate Outline"}
            </button>
          </div>
        </div>

        <textarea
          className="single-story-textarea"
          placeholder="Describe everything the AI should know about your characters when writing them in scenes. Consider physical appearance, mannerisms, how they relate to other characters, and their motivations / goals."
          value={outline}
          onChange={(e) => setOutline(e.target.value)}
          onBlur={() => saveChanges("outline", outline)}
        ></textarea>
      </div>

      {/* ADD CHAPTER */}
      {Object.keys(chapters).length > 0 && (
        <div className="bg-buttonPurple p-4 rounded-lg text-white my-6">
          <div className="flex jstify-between items-center gap-4">
            <div>
              <div className="text-lg font-semibold">
                Now the fun part begins!
              </div>

              <div className="text-xs">
                Click Add Chapter to start a draft of your Chapter. (Formerly
                Beats and Prose)
              </div>
            </div>

            <div className="flex items-center gap-4">
              <select
                className="p-2 bg-transparent text-white border-white border rounded-md"
                value={currentChapter}
                onChange={(e) => setCurrentChapter(e.target.value)}
              >
                {Object.keys(chapters)?.map((item: any, idx) => (
                  <optgroup
                    label={`Act ${idx + 1}`}
                    key={idx}
                    className="text-black"
                  >
                    {chapters[item]?.map((chap: any) => (
                      <option
                        value={chap.chapter}
                        key={idx}
                        className="text-black"
                      >
                        {chap.chapter}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>

              <button
                className="text-base bg-white text-buttonPurple rounded-md py-2 font-normal gap-2 inline-flex justify-center items-center px-4 text-nowrap"
                onClick={addChapter}
                disabled={addingChapter}
              >
                {addingChapter ? "Adding.." : "Add Chapter"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="single-story">
        <div className="single-story-top">
          <div>
            <div className="flex items-center gap-2">
              <FaGlobeAmericas />
              <div className="font-semibold">Worldbuilding</div>
            </div>
            <div>
              Bring your world to life with Locations, Lore, Magic, and more
            </div>
          </div>

          <div className="flex items-center gap-4 text-nowrap">
            <button className="flex gap-2 items-center py-2 px-4 font-semibold">
              <IoSettingsOutline />
              Customize
            </button>

            <button className="text-base text-white bg-buttonPurple rounded-md py-2 font-normal gap-2 inline-flex justify-center items-center px-4">
              <BsStars />
              Generate Outline
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          {formTypes?.map((form) => (
            <div
              className="single-add-form"
              key={form}
              onClick={() => addForms(form)}
            >
              <FaPlus />
              <div className="capitalize">{form}</div>
            </div>
          ))}
        </div>
      </div>

      {/* FORMS */}
      {forms?.map((form: any) => (
        <SingleForm
          key={form.id}
          form={form}
          formTypes={formTypes}
          setFieldName={setFieldName}
          setFieldValue={setFieldValue}
          addTrait={addTrait}
          setFormName={setFormName}
        />
      ))}

      {openWriting && (
        <Writing
          generate={generateMatchStyle}
          loading={generatingMatchStyle}
          close={() => setOpenWriting(false)}
        />
      )}

      {openCompressWriting && (
        <CompressMatchStyle
          compress={generateCompressStyle}
          loading={compressing}
          close={() => setOpenCompressWriting(false)}
          rawWriting={rawText}
        />
      )}

      {openInsertModal && (
        <Compressed
          insert={setMatchStyle}
          close={() => setOpenInsertModal(false)}
          compressRaw={compressedText}
        />
      )}
    </div>
  );
};

export default StoryBible;
