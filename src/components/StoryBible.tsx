import { PiBrainThin } from "react-icons/pi";
import { FaRegCopy } from "react-icons/fa6";
import { LuHistory } from "react-icons/lu";
import { PiFlowerTulipDuotone } from "react-icons/pi";
import { GiMustache } from "react-icons/gi";
import { BsStars } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import { BsPersonBoundingBox, BsMenuButtonWide } from "react-icons/bs";
import { useEffect, useState } from "react";
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
import Tooltip from "../layout/Tooltip";

const StoryBible = ({
  genre,
  braindump,
  synopsis,
  matchStyle,
  characters = [],
  outline,
  chapters,
  setChapters,
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
  chapters: any;

  setChapters: (e: any) => void;
  setGenre: (e: string) => void;
  setBraindump: (e: string) => void;
  setSynopsis: (e: string) => void;
  setMatchStyle: (e: string) => void;
  setCharacters: (e: any) => void;
  setOutline: (e: string) => void;
}) => {
  const { project } = useParams();
  const navigate = useNavigate();

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
  const [currentChapter, setCurrentChapter] = useState("");
  const [addingChapter, setAddingChapter] = useState(false);

  // WORDCOUNTS
  const [brainDumpWordCount, setBrainDumpWordCount] = useState(
    braindump.trim().split(/\s+/).length
  );
  const [genreWordCount, setGenreWordCount] = useState(
    genre.trim().split(/\s+/).length
  );
  const [styleWordCount, setStyleWordCount] = useState(
    matchStyle.trim().split(/\s+/).length
  );
  const [synopsisWordCount, setSynopsisWordCount] = useState(
    synopsis.trim().split(/\s+/).length
  );
  const [outlineWordCount, setOutlineWordCount] = useState(
    outline.trim().split(/\s+/).length
  );

  useEffect(() => {
    setValueWithWordCount(braindump, setBraindump, 2000, setBrainDumpWordCount);
    setValueWithWordCount(matchStyle, setMatchStyle, 40, setStyleWordCount);
    setValueWithWordCount(outline, setOutline, 1700, setOutlineWordCount);
    setValueWithWordCount(synopsis, setSynopsis, 800, setSynopsisWordCount);
    setValueWithWordCount(genre, setGenre, 40, setGenreWordCount);

    // setSynopsisWordCount(synopsis.trim().split(/\s+/).length);
    // setOutlineWordCount(outline.trim().split(/\s+/).length);
    // setStyleWordCount(matchStyle.trim().split(/\s+/).length);
  }, [braindump, matchStyle, outline, synopsis, genre]);

  console.log(genreWordCount);

  const setValueWithWordCount = (
    value: string,
    setter: (e: string) => void,
    count: number,
    counter: (e: number) => void
  ) => {
    if (value === "") {
      counter(0);
      return;
    }
    const words = value.trim().split(/\s+/);
    const wordLength = words.length;

    if (wordLength <= count) {
      setter(value);
      counter(wordLength);
    } else {
      const newValue = words.slice(0, count).join(" ");
      counter(count);
      setter(newValue);
    }
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
    setGeneratingOutline(true);
    getRequest(`/story/outline-generate/${project}`)
      .then(({ data }) => {
        setOutline(data?.outline.replace(/\*/g, ""));
        setChapters(data.chapters);

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

  const saveChangesAnfUpdate = (field: string, value: string) => {
    putRequest("/story/fill", {
      projectID: project,
      [field]: value,
    })
      .then(({ data }) => {
        setChapters(data["storyBible.chapters"] ?? {});
      })
      .catch(() => {
        toast.error(`Error Saving ${field}`);
      });
  };

  const deleteCharacter = (id: string) => {
    delRequest(`/story/characters-delete?projectID=${project}&character=${id}`)
      .then(() => {
        getCharacters();
      })
      .catch(() => {
        toast.error("Unable to delete");
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
      .then(() => {
        getCharacters();
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

  const getCharacters = () => {
    getRequest(`/story/characters-get/${project}`)
      .then(({ data }) => {
        setCharacters(data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  useEffect(() => {
    getCharacters();
  }, []);

  return (
    <div className="w-full mt-4 pb-4">
      <div className="single-story">
        <div className="single-story-top">
          <div className="flex items-center gap-2">
            <PiBrainThin />
            <div className="font-semibold">Braindump</div>
            <Tooltip>
              <div className="tooltip-title">How it works</div>
              <div className="my-4">
                Braindump is a completely free-form box you can put everything
                you know about your story into. A stream-of-consciousness
                ramble, a treatment, or even just one word
              </div>
              <div>This section affects:</div>
              <ul>
                <li>Synopsis</li>
                <li>Beats</li>
              </ul>
            </Tooltip>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-sm font-semibold">
              {brainDumpWordCount}/2000 words
            </div>
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
          }}
          onBlur={() => saveChanges("braindump", braindump)}
        ></textarea>
      </div>

      <div className="single-story">
        <div className="single-story-top">
          <div className="flex items-center gap-2">
            <PiFlowerTulipDuotone />
            <div className="font-semibold">Genre</div>
            <Tooltip>
              <div className="tooltip-title">How it works</div>
              <div className="my-4">
                Genre affects the tropes, tone, and style of the outlines and
                prose that Story Bible generates. Edit this section to remove
                clichés or shift the tone.
              </div>
              <div>This section affects:</div>
              <ul>
                <li>Outline</li>
                <li>Beats</li>
                <li>Prose</li>
              </ul>
            </Tooltip>
          </div>

          <div className="flex items-center gap-4">
            <div className="word-count">{genreWordCount}/40 words</div>
            <FaRegCopy />
          </div>
        </div>

        <textarea
          className="single-story-textarea"
          placeholder={`What genre are you writing in? Feel free to include sub-genres and tropes.\n \n Examples: Romance, Horror, Fantasy, Cozy mystery, Friends-to-Lovers, Gumshoe`}
          value={genre}
          onChange={(e) => {
            setGenre(e.target.value);
          }}
          onBlur={() => saveChanges("genre", genre)}
        ></textarea>
      </div>

      <div className="single-story">
        <div className="single-story-top">
          <div className="flex items-center gap-2">
            <GiMustache />
            <div className="font-semibold">Style</div>
            <Tooltip>
              <div className="tooltip-title">How it works</div>
              <div className="my-4">
                Style affects the tone, word choice, and sentence structure the
                Al uses. It's the last thing the Al looks at before writing the
                prose so it has the most influence on Prose.
              </div>
              <div>This section affects:</div>
              <ul>
                <li>Beats</li>
                <li>Prose</li>
              </ul>
            </Tooltip>
          </div>

          <div className="flex items-center gap-4 text-nowrap">
            <div className="text-sm font-semibold">
              {styleWordCount}/40 words
            </div>
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
          placeholder={`Write the style of prose you want Story Bible to write.\n\n e.g. short sentences, lots of dialogue, show don’t tell`}
          value={matchStyle}
          onChange={(e) => {
            setMatchStyle(e.target.value);
          }}
          onBlur={() => saveChanges("style", matchStyle)}
        ></textarea>
      </div>

      <div className="single-story">
        <div className="single-story-top">
          <div className="flex items-center gap-2">
            <GiMustache />
            <div className="font-semibold">Synopsis</div>
            <Tooltip>
              <div className="tooltip-title">How it works</div>
              <div className="my-4">
                Synopsis establishes the characters, their goals, the central
                conflict, how the story begins and how it ends. It also conveys
                the story's tone, themes, and unique elements.
              </div>
              <div>This section affects:</div>
              <ul>
                <li>Braindump</li>
                <li>Genre</li>
              </ul>
            </Tooltip>
          </div>

          <div className="flex items-center gap-4 text-nowrap">
            <div className="word-count">{synopsisWordCount}/800 words</div>
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
          onChange={(e) => {
            setSynopsis(e.target.value);
          }}
          value={synopsis}
          onBlur={() => saveChanges("synopsis", synopsis)}
        ></textarea>
      </div>

      <div className="single-story">
        <div className="single-story-top">
          <div className="flex items-center gap-2">
            <BsPersonBoundingBox />
            <div className="font-semibold">Characters</div>
            <Tooltip>
              <div className="tooltip-title">How it works</div>
              <div className="my-4">
                The Characters section tells Story Bible how to write your
                Characters. This can affect how their dialog is written, what
                choices they make, and how they interact with the other
                characters. Update this section as your characters evolve in the
                story.
              </div>

              <div className="my-4">
                You can add any kinds of custom traits you like to Characters by
                clicking "Customize".
              </div>
              <div>This section is generated based on: </div>
              <ul>
                <li>Synopsis (if it exists)</li>
                <li>Braindump (if Synopsis doesn't exist)</li>
              </ul>
            </Tooltip>
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

      {characters?.map((item) => (
        <SingleCharacter
          key={item._id}
          character={item}
          deleteChar={() => deleteCharacter(item._id)}
        />
      ))}

      <div className="single-story">
        <div className="single-story-top">
          <div className="flex items-center gap-2">
            <BsMenuButtonWide />
            <div className="font-semibold">Outline</div>
            <Tooltip>
              <div className="tooltip-title">How it works</div>
              <div className="my-4">
                The Outline section expands on everything to the left and weaves
                it into something that will be entertaining to read. Make sure
                to replace any vagueness with specific ideas. This will make
                your Beats and Prose better
              </div>
              <div>This section is generated based on: </div>
              <ul>
                <li> Genre </li>
                <li>Synopsis</li>
                <li>Characters</li>
              </ul>

              <div className="my-4">
                If you paste in an outline, match this format, including a title
                for each Act:{" "}
              </div>
              <div className="my-4">
                <div>
                  Act 1 : <br />
                  Chapter 1: <br /> Chapter 2: <br /> Chapter 3 : <br /> Act 2:{" "}
                  <br /> Chapter 4: <br />
                  Chapter 5:
                </div>
              </div>
            </Tooltip>
          </div>

          <div className="flex items-center gap-4 text-nowrap">
            <div className="word-count">{outlineWordCount}/1700</div>
            <FaRegCopy onClick={() => copyToClipboard(outline)} />
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
          className="single-story-textarea long"
          placeholder={`Similar to the Synopsis, but in greater detail. Each chapter here can be linked to a document for use with the Chapter Generator.\nIf you write your own Outline, match this format:\n\nAct 1:\n\nChapter 1:\nChapter 2:\nChapter 3:\n\nAct 2:\nChapter 4:\nChapter 5:\netc...`}
          value={outline}
          onChange={(e) => {
            setOutline(e.target.value);
          }}
          onBlur={() => saveChangesAnfUpdate("outline", outline)}
        ></textarea>
      </div>

      {/* ADD CHAPTER */}
      {Object.keys(chapters)?.length > 0 && (
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
                    key={item}
                    className="text-black"
                  >
                    {chapters[item]?.map((chap: any) => (
                      <option
                        value={chap.chapter}
                        key={chap.chapter}
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

      {/* <div className="single-story">
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
      </div> */}

      {/* FORMS */}
      {/* {forms?.map((form: any) => (
        <SingleForm
          key={form.id}
          form={form}
          formTypes={formTypes}
          setFieldName={setFieldName}
          setFieldValue={setFieldValue}
          addTrait={addTrait}
          setFormName={setFormName}
        />
      ))} */}

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
          insert={(e: string) => {
            setMatchStyle(e);
          }}
          close={() => setOpenInsertModal(false)}
          compressRaw={compressedText}
        />
      )}
    </div>
  );
};

export default StoryBible;
