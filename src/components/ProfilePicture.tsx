import { useStore } from "zustand";
import store from "../store/state";
import { IoPerson } from "react-icons/io5";

const ProfilePicture = () => {
  const { user } = useStore(store);
  return (
    <div>
      {user && (
        <>
          {user?.picture !== "" ? (
            <img src={user.picture} alt="" />
          ) : (
            <div className="w-8 h-8 flex justify-center items-center border-2 border-gray-700 rounded-full">
              <IoPerson />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProfilePicture;
