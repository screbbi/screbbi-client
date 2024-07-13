import { GoHome } from "react-icons/go";
import OpenSettings from "./OpenSettings";

const PluginNavbar = () => {
  return (
    <div className="flex justify-between items-center">
      <GoHome className="text-2xl" />

      <OpenSettings />
    </div>
  );
};

export default PluginNavbar;
