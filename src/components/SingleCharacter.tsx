import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import OptionLayout from "../layout/OptionLayout";
import { FaRegTrashCan } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import { putRequest } from "../utils/request";
import toast from "react-hot-toast";

const SingleCharacter = ({
  character,
  deleteChar,
}: {
  character: any;
  deleteChar: () => void;
}) => {
  const [open, setOpen] = useState(false);
  const { project } = useParams();
  const [data, setData] = useState(character.traits);

  const update = () => {
    putRequest(`/story/characters-update/${character._id}`, {
      projectID: project,
      ...data,
    })
      .then(() => {})
      .catch(() => {
        toast("Unable to update");
      });
  };

  const handleChange = (e: any) =>
    setData({ ...data, [e.target.name]: e.target.value });

  return (
    <div className="bg-white p-4 rounded-md my-4">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <div className="text-lg font-bold py-2">
            <input
              type="text"
              className="outline-0 w-fit p-1 focus:border border-gray-300 rounded-lg"
              value={data.name}
              name="name"
              onChange={handleChange}
              onBlur={update}
              placeholder="Name"
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
                  value={data.pronouns}
                  name="pronouns"
                  onChange={handleChange}
                  onBlur={update}
                />
              </div>

              <div>
                <div>Other Names</div>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md outline-none mt-2 p-2"
                  value={data.other_names}
                  name={"other_names"}
                  onChange={handleChange}
                  onBlur={update}
                />
              </div>
            </div>
          </div>

          <div className="my-2">
            <div>Personality</div>
            <textarea
              className="w-full border border-gray-300 rounded-md outline-none mt-2 p-2 resize-none h-32"
              value={data.personality}
              name={"personality"}
              onChange={handleChange}
              onBlur={update}
            ></textarea>
          </div>

          <div className="my-2">
            <div>Background</div>
            <textarea
              className="w-full border border-gray-300 rounded-md outline-none mt-2 p-2 resize-none h-32"
              value={data.background}
              name={"background"}
              onChange={handleChange}
              onBlur={update}
            ></textarea>
          </div>

          <div className="my-2">
            <div>Dialogue Style</div>
            <textarea
              className="w-full border border-gray-300 rounded-md outline-none mt-2 p-2 resize-none h-32"
              value={data.dialogue_style}
              name={"dialogue_style"}
              onChange={handleChange}
              onBlur={update}
            ></textarea>
          </div>
        </>
      )}
    </div>
  );
};

export default SingleCharacter;
