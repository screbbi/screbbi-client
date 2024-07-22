import { useState } from "react";
import { TbCopy } from "react-icons/tb";
import { HiPencil } from "react-icons/hi";
import { MdDeleteOutline } from "react-icons/md";
import { copyToClipboard } from "../utils/functions";

const SingleKeeper = ({
  text,
  deleteKeep,
  editkeeps,
}: {
  text: string;
  deleteKeep: () => void;
  editkeeps: (val: string) => void;
}) => {
  const [editing, setEditing] = useState(false);

  return (
    <div className="bg-white p-2 my-2 rounded-lg relative group shadow-md w-full">
      {!editing ? (
        <div>
          <div className="text-xs font-semibold">{text}</div>

          <div className="flex absolute top-1 right-1 bg-buttonPurple text-white px-2 py-1 rounded-full gap-1 opacity-0 group-hover:opacity-100 duration-500">
            <TbCopy
              className="cursor-pointer"
              onClick={() => copyToClipboard(text)}
            />
            <HiPencil
              className="cursor-pointer"
              onClick={() => setEditing(true)}
            />
            <MdDeleteOutline className="cursor-pointer" onClick={deleteKeep} />
          </div>
        </div>
      ) : (
        <div>
          <textarea
            value={text}
            onChange={(e) => editkeeps(e.target.value)}
            className="outline-0 border-0 bg-transparent text-xs w-full h-24 resize-none"
            placeholder="Edit me"
            onBlur={() => setEditing(false)}
            autoFocus
          />
        </div>
      )}
    </div>
  );
};

export default SingleKeeper;
