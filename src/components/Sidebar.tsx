import { TbEdit } from "react-icons/tb";
// import { FiTrash } from "react-icons/fi";
import profile from "../assets/img/profile.svg";
import SingleContent from "./SingleContent";
import { useEffect, useRef, useState } from "react";
import { MdLogout } from "react-icons/md";
import { delRequest, getRequest } from "../utils/request";
import SectionLoader from "./SectionLoader";
import { useNavigate, useParams } from "react-router-dom";
import { useStore } from "zustand";
import store from "../store/state";

// import toast from "react-hot-toast";
// import Settings from "./Settings";
// import { useNavigate } from "react-router-dom";
// import { IoSettingsOutline } from "react-icons/io5";

const Sidebar = ({
  writings,
  refresh,
  open,
}: {
  writings: any;
  refresh: () => void;
  open: boolean;
  setOpen: () => void;
}) => {
  const [showOption, setShowOption] = useState(false);
  const { writer } = useParams();
  const navigate = useNavigate();

  const optionRef: any = useRef();

  const { story, setStory } = useStore(store);

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
    getRequest("/writer/new")
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

  const getProfile = () => {
    getRequest("/profile").then((data) => {
      console.log(data);
    });
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div className={`sidebar ${open ? "left-0" : "-left-[20rem]"}`}>
      {/* NEW CONTENT */}
      <button
        className="bg-lightButton text-whatNewText flex justify-between py-2 px-4 rounded-full font-semibold items-center text-sm h-fit"
        onClick={newWrite}
      >
        New Content
        <TbEdit />
      </button>

      {/* CONTENTS */}
      <div className="text-white p-2 w-full">
        {!writings ? (
          <div className="flex justify-center items-center h-52">
            <SectionLoader />
          </div>
        ) : writings.length < 1 ? (
          <div>No Data</div>
        ) : (
          writings.map((item: any) => (
            <SingleContent
              writing={item}
              key={item._id}
              deleteWrite={() => deleteWrite(item._id)}
            />
          ))
        )}
      </div>

      {/* TRASH AND PROFILE */}
      <div className="grid">
        <div className="border border-gray-700 p-2 rounded-xl mb-3">
          <div className="single-desc">
            <div className="flex gap-4 items-center">
              <div>Story Bible</div>
            </div>

            <div
              className="checkbox-wrapper-6"
              onClick={(e) => {
                e.stopPropagation();
                setStory(!story);
              }}
            >
              <input
                className="tgl tgl-light"
                id="cb1-1"
                type="checkbox"
                checked={story}
              />
              <label className="tgl-btn" />
            </div>
          </div>

          <div className="text-xs mt-2">
            Get better results by telling the AI about your Characters, Genre,
            etc. Powered by Story Engine.
          </div>
        </div>
        <div className="relative" ref={optionRef}>
          <button
            className="flex gap-2 p-2 hover:bg-darkBlue rounded-md w-full"
            onClick={() => setShowOption(!showOption)}
          >
            <img src={profile} alt="" />
            Olamide Bernard
          </button>

          {showOption && (
            <div className="absolute bottom-[110%] left-[10%] bg-white rounded-lg p-2 border border-offWhite w-4/5 text-sm">
              <button
                className="flex items-center gap-2 text-whatNewBorder font-semibold py-1 my-1"
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.replace("/");
                }}
              >
                <MdLogout /> <div>Log out</div>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

{
  /* <div className="day text-[10px]">Today</div> */
}

{
  /* <div className="flex items-center gap-2 text-black font-semibold py-1 my-1">
                <IoSettingsOutline /> <div>Settings</div>
              </div> */
}
{
  /* <button className="flex p-2 items-center gap-4 rounded-md w-full">
          <FiTrash />
          Trash (0)
        </button> */
}

// const getUserWriting = () => {
//   setLoadingWritings(true);
//   getRequest(`/writer/writings`)
//     .then(({ data }) => {
//       setWritings(data);
//       setLoadingWritings(false);
//     })
//     .catch((err: any) => {
//       setLoadingWritings(false);
//       toast.error(err.response.data);
//       console.log(err.response.data);
//     });
// };

// useEffect(() => {
//   getUserWriting();
// getRequest("/profile")
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log(err.response.data);
//   });
// }, [refresh]);

// const [refresh, setRefresh] = useState(false);
// const [loadingWritings, setLoadingWritings] = useState(false);
// const [writings, setWritings] = useState([]);
