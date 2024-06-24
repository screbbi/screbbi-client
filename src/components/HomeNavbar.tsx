import { FaPlus } from "react-icons/fa";
import appLogo from "../assets/img/ai-logo.png";
import OpenSettings from "./OpenSettings";

const HomeNavbar = ({ newWrite }: { newWrite: () => void }) => {
  return (
    <div className="grid grid-cols-3 p-3 md:p-6 sticky top-0 z-20">
      <div>
        <button
          className="flex gap-2 border-2 border-whatNewText text-whatNewText items-center py-2 px-2 md:px-6 rounded-full font-semibold text-sm md:text-base"
          onClick={newWrite}
        >
          <FaPlus /> New
        </button>
      </div>

      <div className="flex justify-center">
        <img src={appLogo} alt="" className="h-8 md:h-10" />
      </div>

      <div className="flex justify-end">
        <OpenSettings />
      </div>
    </div>
  );
};

export default HomeNavbar;
