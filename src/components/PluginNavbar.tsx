import { GoHome } from "react-icons/go";
import OpenSettings from "./OpenSettings";
import { Link } from "react-router-dom";

const PluginNavbar = () => {
  return (
    <div className="flex justify-between items-center p-4">
      <Link to={"/home"}>
        <GoHome className="text-2xl" />
      </Link>

      <OpenSettings />
    </div>
  );
};

export default PluginNavbar;
