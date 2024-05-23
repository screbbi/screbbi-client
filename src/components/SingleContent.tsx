import { useEffect, useRef, useState } from "react";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import { FaPen } from "react-icons/fa";
import { LuTrash } from "react-icons/lu";
import { useNavigate, useParams } from "react-router-dom";

const SingleContent = ({
  writing,
  deleteWrite,
}: {
  writing: any;
  deleteWrite: () => void;
}) => {
  const [showOption, setShowOption] = useState(false);

  const { writer, project } = useParams();

  const optionRef: any = useRef();

  const navigate = useNavigate();

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
    <div
      className={`flex justify-between items-center p-2 group cursor-pointer w-full rounded-md ${
        writer === writing._id ? "bg-[#1F243C]" : ""
      }`}
      onClick={() => {
        navigate(`/project/${project}/${writing._id}`);
      }}
    >
      <div className="text-xs w-40 truncate">
        {writing.title !== "" ? writing.title : "Untitled Document"}
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
            <div className="flex items-center gap-2 text-black font-semibold text-xs py-1 my-1">
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
  );
};

export default SingleContent;
