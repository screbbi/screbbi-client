import { useState } from "react";
import ProfilePicture from "./ProfilePicture";
import Settings from "./Settings";

const OpenSettings = () => {
  const [openSettings, setOpenSettings] = useState(false);

  return (
    <div>
      <div onClick={() => setOpenSettings(true)}>
        <ProfilePicture />
      </div>

      {openSettings && <Settings close={() => setOpenSettings(false)} />}
    </div>
  );
};

export default OpenSettings;
