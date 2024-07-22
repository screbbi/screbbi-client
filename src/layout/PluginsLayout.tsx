import { ReactNode } from "react";
import { IoExtensionPuzzleSharp } from "react-icons/io5";
import appLogo from "../assets/img/ai-logo.png";

const PluginsLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <div className="flex justify-between p-2">
        <img src={appLogo} alt="" className="w-32" />

        <div className="flex gap-2 items-center">
          <IoExtensionPuzzleSharp className="text-lg" />
          <div>Plugins</div>
        </div>
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
