import { ReactNode, useEffect } from "react";
import PluginNavbar from "../components/PluginNavbar";
import { useStore } from "zustand";
import store from "../store/state";

const PluginLayout = ({ children }: { children: ReactNode }) => {
  const { authorize } = useStore(store);

  useEffect(() => {
    authorize();
  }, []);

  return (
    <div>
      <PluginNavbar />

      <img
        src="https://editor.sudowrite.com/assets/sorbet-background.png"
        alt=""
        className="fixed top-0 left-0 -z-10 w-full h-full"
      />

      <div className="mt-6">{children}</div>
    </div>
  );
};

export default PluginLayout;
