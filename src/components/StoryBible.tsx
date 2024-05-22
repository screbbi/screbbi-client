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
import { postRequest } from "../utils/request";
import toast from "react-hot-toast";
import { copyToClipboard } from "../utils/functions";
import Writing from "./Writing";
import { useParams } from "react-router-dom";
import CompressMatchStyle from "./CompressMatchStyle";
import Compressed from "./Compressed";

const StoryBible = () => {
  const { writer } = useParams();

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
  const [braindump, setBraindump] = useState("");
  const [genre, setGenre] = useState("");
  const [sunopsis, setSunopsis] = useState("");
  const [generatingSynopsis, setGeneratingSynopsis] = useState(false);
  const [generatingMatchStyle, setGeneratingMatchStyle] = useState(false);
  const [matchStyle, setMatchStyle] = useState<any>("");
  const [openWriting, setOpenWriting] = useState(false);
  const [openCompressWriting, setOpenCompressWriting] = useState(false);
  const [compressing, setCompressing] = useState(false);
  const [rawText, setRawText] = useState("");
  const [compressedText, setCompressedText] = useState("");
  const [openInsertModal, setOpenInsertModal] = useState(false);

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
    if (braindump.trim() === "") {
      alert("Braindump cannot be empty");
      return;
    } else if (genre.trim() === "") {
      alert("Genre cannot be empty");
      return;
    }

    setGeneratingSynopsis(true);
    postRequest("/story/synopsis-generate", { genre, braindump })
      .then(({ data }) => {
        setSunopsis(data);
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
    postRequest("/story/style-generate", { writing, writer })
      .then(({ data }) => {
        setRawText(data.replaceAll("**", "''"));
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
    postRequest("/story/style-compress", { style, writer })
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
          onChange={(e) => setBraindump(e.target.value)}
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
          onChange={(e) => setGenre(e.target.value)}
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
          onChange={(e) => setMatchStyle(e.target.value)}
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
            <FaRegCopy onClick={() => copyToClipboard(sunopsis)} />
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
          onChange={(e) => setSunopsis(e.target.value)}
          value={sunopsis}
        ></textarea>
      </div>

      <div className="single-story">
        <div className="single-story-top">
          <div className="flex items-center gap-2">
            <BsPersonBoundingBox />
            <div className="font-semibold">Characters</div>
          </div>

          <div className="flex items-center gap-4 text-nowrap">
            <div className="text-sm font-semibold">0/700 words</div>
            <FaRegCopy />
            <button className="text-base text-white bg-buttonPurple rounded-md py-2 font-normal gap-2 inline-flex justify-center items-center px-4">
              <BsStars />
              Generate Characters
            </button>
          </div>
        </div>

        <textarea
          className="single-story-textarea"
          placeholder="Describe everything the AI should know about your characters when writing them in scenes. Consider physical appearance, mannerisms, how they relate to other characters, and their motivations / goals."
        ></textarea>
      </div>

      <div className="single-story">
        <div className="single-story-top">
          <div className="flex items-center gap-2">
            <BsMenuButtonWide />
            <div className="font-semibold">Outline</div>
          </div>

          <div className="flex items-center gap-4 text-nowrap">
            <div className="text-sm font-semibold">0/1700 words</div>
            <FaRegCopy />
            <button className="text-base text-white bg-buttonPurple rounded-md py-2 font-normal gap-2 inline-flex justify-center items-center px-4">
              <BsStars />
              Generate Outline
            </button>
          </div>
        </div>

        <textarea
          className="single-story-textarea"
          placeholder="Describe everything the AI should know about your characters when writing them in scenes. Consider physical appearance, mannerisms, how they relate to other characters, and their motivations / goals."
        ></textarea>
      </div>

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
