import ModalLayout from "../layout/ModalLayout";
import { IoMdPerson } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import profile from "../assets/img/profile.svg";

const Settings = ({ close }: { close: () => void }) => {
  return (
    <ModalLayout close={close} title="Settings">
      <div className="flex gap-2 items-center">
        <div className="flex justify-center items-center bg-grey rounded-full w-6 h-6">
          <IoMdPerson />
        </div>

        <div className="text-grey text-xs font-semibold">User account</div>
      </div>

      <div className="text-closeBlack text-xs font-semibold mt-2">
        User account
      </div>

      <div className="flex justify-between items-center mt-2">
        <div className="flex gap-2 rounded-md w-full text-closeBlack text-xs items-center">
          <img src={profile} alt="" />
          Olamide Bernard
        </div>

        <CiEdit className="text-blue-700 text-xl" />
      </div>

      <div>
        <input
          type="text"
          className="border-b border-blue-700 outline-none w-full text-closeBlack"
        />
      </div>

      {/* <div className="flex gap-2 items-center my-2">
        <div className="flex justify-center items-center bg-grey rounded-full w-6 h-6">
          <IoMdPerson />
        </div>
        <div className="text-grey text-xs font-semibold">Preferences</div>
      </div> */}

      {/* <div className="text-xs text-closeBlack font-bold">Font</div> */}
    </ModalLayout>
  );
};

export default Settings;
