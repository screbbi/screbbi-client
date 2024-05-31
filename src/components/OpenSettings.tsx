import { useState } from "react";
import { IoSettingsSharp } from "react-icons/io5";
import Settings from "./Settings";

const OpenSettings = () => {
  const [openSettings, setOpenSettings] = useState(false);

  return (
    <div>
      <div onClick={() => setOpenSettings(true)}>
        {/* <IoSettingsSharp className="text-neutral-600 text-3xl" /> */}
        <IoSettingsSharp className="text-3xl" />
      </div>

      {openSettings && <Settings close={() => setOpenSettings(false)} />}
    </div>
  );
};

export default OpenSettings;
