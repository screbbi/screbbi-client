import { FaPlus } from "react-icons/fa";
import appLogo from "../assets/img/ai-logo.png";
import profile from "../assets/img/profile.svg";
import Settings from "./Settings";
import { useState } from "react";

const HomeNavbar = ({ newWrite }: { newWrite: () => void }) => {
  const [openSettings, setOpenSettings] = useState(false);

  return (
    <div className="grid grid-cols-3 p-6 sticky top-0 z-20">
      <div>
        <button
          className="flex gap-2 border-2 border-whatNewText text-whatNewText items-center py-2 px-6 rounded-full font-semibold"
          onClick={newWrite}
        >
          <FaPlus /> New
        </button>
      </div>

      <div className="flex justify-center">
        <img src={appLogo} alt="" className="w-10" />
      </div>

      <div className="flex justify-end">
        <img src={profile} alt="" onClick={() => setOpenSettings(true)} />
      </div>

      {openSettings && <Settings close={() => setOpenSettings(false)} />}
    </div>
  );
};

export default HomeNavbar;
