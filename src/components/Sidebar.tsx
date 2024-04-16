import { TbEdit } from "react-icons/tb";
import { FiTrash } from "react-icons/fi";
import profile from "../assets/img/profile.svg";
import SingleContent from "./SingleContent";

const Sidebar = () => {
  return (
    <div className="sidebar">
      {/* NEW CONTENT */}
      <button className="bg-lightButton text-whatNewText flex justify-between py-2 px-4 rounded-full font-semibold items-center text-lg">
        New Content
        <TbEdit />
      </button>

      {/* CONTENTS */}
      <div className="text-white p-2">
        <div className="day text-[10px]">Today</div>
        <SingleContent />
        <SingleContent />
        <SingleContent />
        <SingleContent />
        <SingleContent />
        <SingleContent />
        <SingleContent />
      </div>

      {/* TRASH AND PROFILE */}
      <div className="grid gap-4">
        <button className="flex p-2 items-center gap-4 rounded-md w-full">
          <FiTrash />
          Trash (0)
        </button>
        <button className="flex gap-2 p-2 hover:bg-darkBlue rounded-md w-full">
          <img src={profile} alt="" />
          Olamide Bernard
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
