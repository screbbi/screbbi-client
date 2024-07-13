import { ReactNode } from "react";
import PluginNavbar from "../components/PluginNavbar";

const PluginLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <PluginNavbar />

      <div className="mt-6">{children}</div>
    </div>
  );
};

export default PluginLayout;
