import { TbEdit } from "react-icons/tb";
import SingleContent from "./SingleContent";
import { useEffect, useRef, useState } from "react";
import { MdLogout } from "react-icons/md";
import { delRequest, getRequest } from "../utils/request";
import SectionLoader from "./SectionLoader";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useStore } from "zustand";
import store from "../store/state";
import Settings from "./Settings";
import { IoSettingsOutline } from "react-icons/io5";
import ProfilePicture from "./ProfilePicture";
import { GoHome } from "react-icons/go";

const Sidebar = ({
  writings,
  refresh,
  open,
  rename,
}: {
  writings: any;
  refresh: () => void;
  open: boolean;
  rename: (e: string) => void;
}) => {
  const [showOption, setShowOption] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);
  const { writer, project } = useParams();
  const navigate = useNavigate();

  const optionRef: any = useRef();

  const { story, setStory, authorize, user } = useStore(store);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        optionRef.current &&
        !optionRef?.current?.contains(event.target as Node)
      ) {
        setShowOption(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const newWrite = () => {
    getRequest(`/writer/new?project=${project}`)
      .then(() => {
        refresh();
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  const deleteWrite = (id: string) => {
    delRequest(`/writer/delete/${id}`)
      .then(() => {
        if (writer === id) {
          navigate("/home");
        }
        refresh();
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  useEffect(() => {
    authorize();
  }, []);

  return (
    <div className={`sidebar ${open ? "left-0" : "-left-[20rem]"}`}>
      {/* NEW CONTENT */}
      <div className="">
        <Link to={"/home"}>
          <div className="logo flex items-center gap-2">
            <GoHome className="text-2xl" />
            <div className="font-bold text-lg">Screbbi</div>
          </div>
        </Link>
        <button
          className="bg-lightButton text-whatNewText flex justify-between py-2 px-4 rounded-full font-semibold items-center text-sm h-fit w-full mt-2"
          onClick={newWrite}
        >
          New Content
          <TbEdit />
        </button>
      </div>

      {/* CONTENTS */}
      <div className="text-white p-2 w-full">
        {!writings ? (
          <div className="flex justify-center items-center h-52">
            <SectionLoader />
          </div>
        ) : writings.length < 1 ? (
          <div className="text-center">No Document Created</div>
        ) : (
          writings.map(
            (item: any) =>
              item.project === project && (
                <SingleContent
                  writing={item}
                  key={item._id}
                  deleteWrite={() => deleteWrite(item._id)}
                  rename={rename}
                />
              )
          )
        )}
      </div>

      {/* TRASH AND PROFILE */}
      <div className="grid">
        <div className="border border-gray-700 p-2 rounded-xl mb-3">
          <div className="single-desc">
            <div className="flex gap-4 items-center">
              <div>Story Guide</div>
            </div>

            <div
              className="checkbox-wrapper-6"
              onClick={(e) => {
                e.stopPropagation();
                let storyValue =
                  story === "true" ? false : story === "false" ? true : false;
                setStory(storyValue.toString());
              }}
            >
              <input
                className="tgl tgl-light"
                id="cb1-1"
                type="checkbox"
                onChange={(e) => {
                  console.log(e.target.value);
                }}
                checked={story === "true"}
              />
              <label className="tgl-btn" />
            </div>
          </div>

          <div className="text-xs mt-2">
            Get better results by telling the AI about your Characters, Genre,
            etc.
          </div>
        </div>

        <div className="relative" ref={optionRef}>
          <button
            className="flex gap-2 p-2 hover:bg-darkBlue rounded-md w-full items-center"
            onClick={() => setShowOption(!showOption)}
          >
            <ProfilePicture />
            {user?.name}
          </button>

          {showOption && (
            <div className="absolute bottom-[110%] left-[10%] bg-white rounded-lg p-2 border border-offWhite w-4/5 text-sm">
              <button
                className="flex items-center gap-2 text-whatNewBorder font-semibold py-1 my-1"
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("projects");
                  window.location.replace("/");
                }}
              >
                <MdLogout /> <div>Log out</div>
              </button>

              <div
                className="flex items-center gap-2 text-black font-semibold py-1 my-1 cursor-pointer"
                onClick={() => setOpenSettings(true)}
              >
                <IoSettingsOutline /> <div>Settings</div>
              </div>
            </div>
          )}

          {openSettings && <Settings close={() => setOpenSettings(false)} />}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
