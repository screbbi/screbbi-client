import { useEffect, useRef, useState } from "react";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import { FaPen } from "react-icons/fa";
import { LuTrash } from "react-icons/lu";
import { useNavigate, useParams } from "react-router-dom";
import { postRequest } from "../utils/request";
import toast from "react-hot-toast";
import he from "he";

const SingleContent = ({
  writing,
  deleteWrite,
  rename,
}: {
  writing: any;
  deleteWrite: () => void;
  rename: (e: string) => void;
}) => {
  const [showOption, setShowOption] = useState(false);
  const { writer, project } = useParams();
  const optionRef: any = useRef();
  const navigate = useNavigate();

  const [title, setTitle] = useState(writing.title);
  const [renaming, setRenaming] = useState(false);

  useEffect(() => {
    const decoded = he.decode(writing.title);
    setTitle(decoded);
  }, [writing.title]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        optionRef.current &&
        !optionRef?.current?.contains(event.target as Node)
      ) {
        setShowOption(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <>
      {renaming ? (
        <input
          type="text"
          value={title}
          onChange={(e) => {
            const decoded = he.decode(e.target.value);
            setTitle(decoded);
          }}
          className="outline-0 bg-transparent border-gray-500 border text-xs w-40"
          onClick={(e) => e.stopPropagation()}
          onBlur={() => {
            setRenaming(false);

            if (writer === writing._id) {
              rename(title);
            } else {
              const newContent = writing.content.replace(writing.title, title);

              postRequest("/writer/writing", {
                writer: writing._id,
                content: newContent,
                title,
              })
                .then(() => {
                  toast("Updated");
                })
                .catch((err) => {
                  toast("Error Updating");
                  console.log(err.response);
                });
            }
          }}
          autoFocus={true}
        />
      ) : (
        <div
          className={`flex justify-between items-center p-2 group cursor-pointer w-full rounded-md ${
            writer === writing._id ? "bg-[#1F243C]" : ""
          }`}
          onClick={() => {
            navigate(`/project/${project}/${writing._id}`);
          }}
        >
          <div className="text-xs w-40 truncate">
            {title !== "" ? title : "Untitled"}
          </div>

          <div className="relative" ref={optionRef}>
            <IoEllipsisVerticalSharp
              className="group-hover:opacity-100 opacity-0 duration-300"
              onClick={(e) => {
                e.stopPropagation();
                setShowOption(!showOption);
              }}
            />

            {showOption && (
              <div className="absolute top-full left-2 bg-white rounded-lg p-4 border border-offWhite z-30 shadow-md">
                <div
                  className="flex items-center gap-2 text-black font-semibold text-xs py-1 my-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    setRenaming(true);
                    setShowOption(false);
                  }}
                >
                  <FaPen /> <div>Rename</div>
                </div>

                <div
                  className="flex items-center gap-2 text-red-500 font-semibold text-xs py-1 my-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteWrite();
                  }}
                >
                  <LuTrash /> <div>Delete</div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SingleContent;
