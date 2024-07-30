import { ReactNode } from "react";
import { IoExtensionPuzzleSharp } from "react-icons/io5";
import appLogo from "../assets/img/ai-logo.png";
import { Link } from "react-router-dom";

const PluginsLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <div className="flex justify-between p-2">
        <Link to={"/home"}>
          <img src={appLogo} alt="" className="w-32" />
        </Link>

        <Link to={"/plugins"}>
          <div className="flex gap-2 items-center">
            <IoExtensionPuzzleSharp className="text-lg" />
            <div>Plugins</div>
          </div>
        </Link>
        <div></div>
      </div>
      <img
        src="https://editor.sudowrite.com/assets/sorbet-background.png"
        alt=""
        className="fixed top-0 left-0 -z-10 w-full h-full"
      />

      <div>{children}</div>
    </div>
  );
};

export default PluginsLayout;
