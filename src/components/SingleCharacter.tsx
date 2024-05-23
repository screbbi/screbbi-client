import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import OptionLayout from "../layout/OptionLayout";
import { FaRegTrashCan } from "react-icons/fa6";

const SingleCharacter = ({
  character,
  index,
  handleChange,
  deleteChar,
  updateChar,
}: {
  character: any;
  index: number;
  handleChange: (e: string, f: string, i: number) => void;
  deleteChar: () => void;
  updateChar: (f: string, e: any) => void;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white p-4 rounded-md my-4">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <div className="text-lg font-bold py-2">
            <input
              type="text"
              className="outline-0 w-fit p-1 focus:border border-gray-300 rounded-lg"
              value={character.name}
              onChange={(e) => handleChange("name", e.target.value, index)}
              onBlur={() => updateChar(character._id, character)}
            />
          </div>
          <div onClick={() => setOpen(!open)}>
            {!open ? <IoIosArrowDown /> : <IoIosArrowUp />}
          </div>
        </div>

        <OptionLayout>
          <button
            className="text-red-500 p-2 flex gap-3 items-center"
            onClick={deleteChar}
          >
            <FaRegTrashCan />
            Delete
          </button>
        </OptionLayout>
      </div>

      {open && (
        <>
          <div className="top">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div>Pronoun</div>
                <input
                  type="text"
                  className="character-input"
                  value={character.pronouns}
                  onChange={(e) =>
                    handleChange("pronouns", e.target.value, index)
                  }
                  onBlur={() => updateChar(character._id, character)}
                />
              </div>

              <div>
                <div>Other Names</div>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md outline-none mt-2 p-2"
                  value={character.other_names}
                  onChange={(e) =>
                    handleChange("other_names", e.target.value, index)
                  }
                  onBlur={() => updateChar(character._id, character)}
                />
              </div>
            </div>
          </div>

          <div className="my-2">
            <div>Personality</div>
            <textarea
              className="w-full border border-gray-300 rounded-md outline-none mt-2 p-2 resize-none h-32"
              value={character.personality}
              onChange={(e) =>
                handleChange("personality", e.target.value, index)
              }
              onBlur={() => updateChar(character._id, character)}
            ></textarea>
          </div>

          <div className="my-2">
            <div>Background</div>
            <textarea
              className="w-full border border-gray-300 rounded-md outline-none mt-2 p-2 resize-none h-32"
              value={character.background}
              onChange={(e) =>
                handleChange("background", e.target.value, index)
              }
              onBlur={() => updateChar(character._id, character)}
            ></textarea>
          </div>

          <div className="my-2">
            <div>Dialogue Style</div>
            <textarea
              className="w-full border border-gray-300 rounded-md outline-none mt-2 p-2 resize-none h-32"
              value={character.dialogue_style}
              onChange={(e) =>
                handleChange("dialogue_style", e.target.value, index)
              }
              onBlur={() => updateChar(character._id, character)}
            ></textarea>
          </div>
        </>
      )}
    </div>
  );
};

export default SingleCharacter;
