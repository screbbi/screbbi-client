import { TbEdit } from "react-icons/tb";
import { FiTrash } from "react-icons/fi";
import profile from "../assets/img/profile.svg";
import SingleContent from "./SingleContent";
import { useEffect, useRef, useState } from "react";
// import { IoSettingsOutline } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
// import Settings from "./Settings";

const Sidebar = () => {
  const [showOption, setShowOption] = useState(true);
  // const [showSettings, setShowSettings] = useState(true);

  const optionRef: any = useRef();

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

        <div className="relative" ref={optionRef}>
          <button
            className="flex gap-2 p-2 hover:bg-darkBlue rounded-md w-full"
            onClick={() => setShowOption(!showOption)}
          >
            <img src={profile} alt="" />
            Olamide Bernard
          </button>

          {showOption && (
            <div className="absolute bottom-[110%] left-[10%] bg-white rounded-lg p-2 border border-offWhite w-4/5 text-sm">
              {/* <div className="flex items-center gap-2 text-black font-semibold py-1 my-1">
                <IoSettingsOutline /> <div>Settings</div>
              </div> */}

              <button
                className="flex items-center gap-2 text-whatNewBorder font-semibold py-1 my-1"
                onClick={() => {
                  window.location.replace("/");
                }}
              >
                <MdLogout /> <div>Log out</div>
              </button>
            </div>
          )}
        </div>
      </div>
      {/* {showSettings && <Settings close={() => setShowSettings(false)} />} */}
    </div>
  );
};

export default Sidebar;
