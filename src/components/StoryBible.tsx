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
import { FaEllipsis } from "react-icons/fa6";

const StoryBible = () => {
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
        ></textarea>
      </div>

      <div className="single-story">
        <div className="single-story-top">
          <div className="flex items-center gap-2">
            <GiMustache />
            <div className="font-semibold">Style</div>
          </div>

          <div className="flex items-center gap-4 text-nowrap">
            <div className="text-sm font-semibold">0/40 words</div>
            <FaRegCopy />
            <button className="text-base text-white bg-buttonPurple rounded-md py-2 font-normal gap-2 inline-flex justify-center items-center px-4">
              <BsStars />
              Match my style
            </button>
          </div>
        </div>

        <textarea
          className="single-story-textarea"
          placeholder="Write the style of prose you want Story Bible to write. e.g. short sentences, lots of dialogue, show don’t tell"
        ></textarea>
      </div>

      <div className="single-story">
        <div className="single-story-top">
          <div className="flex items-center gap-2">
            <GiMustache />
            <div className="font-semibold">Synopsis</div>
          </div>

          <div className="flex items-center gap-4 text-nowrap">
            <div className="text-sm font-semibold">0/800 words</div>
            <FaRegCopy />
            <button className="text-base text-white bg-buttonPurple rounded-md py-2 font-normal gap-2 inline-flex justify-center items-center px-4">
              <BsStars />
              Generate Synopsis
            </button>
          </div>
        </div>

        <textarea
          className="single-story-textarea"
          placeholder="Introduce the characters, their goals, and the central conflict, while conveying the story's tone, themes, and unique elements."
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
      {forms?.map((form: any, idx: number) => (
        <div key={idx} className="single-story">
          <div className="flex justify-between">
            <div>
              <input
                type="text"
                className="text-lg bg-transparent outline-none"
                placeholder="Name"
                onChange={(e) => setFormName(form.id, e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2">
              <LuHistory className="text-2xl" />
              <select
                name=""
                id=""
                className="border border-black rounded-md p-[2px]"
                value={form.type}
              >
                {formTypes.map((type) => (
                  <option value={type} className="capitalize">
                    {type}
                  </option>
                ))}
              </select>
              <div className="relative">
                <FaEllipsis />
                <div className="absolute rounded-md top-full right-0 bg-white p-4 shadow-lg font-semibold text-red-500">
                  Delete
                </div>
              </div>
            </div>
          </div>

          {/* <form action=""> */}
          <div>
            {form?.traits?.map((inp: any) => (
              <div className="my-4 text-sm" key={inp.id}>
                {/* <label className="capitalize">{inp.name}</label> */}
                <input
                  type="text"
                  value={inp.name}
                  className="outline-none"
                  placeholder="Field name"
                  onChange={(e) =>
                    setFieldName(form.id, inp.id, e.target.value)
                  }
                />

                <input
                  type="text"
                  value={inp.value}
                  className="w-full border border-black rounded-md outline-none mt-2 p-2"
                  onChange={(e) =>
                    setFieldValue(form.id, inp.id, e.target.value)
                  }
                />
              </div>
            ))}
          </div>

          <button onClick={() => addTrait(form.id)}>+ Add Trait</button>
          {/* </form> */}
        </div>
      ))}
    </div>
  );
};

export default StoryBible;
