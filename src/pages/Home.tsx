import { useEffect, useState } from "react";
import { IoFolderOpenOutline } from "react-icons/io5";
import {
  delRequest,
  getRequest,
  postRequest,
  putRequest,
} from "../utils/request";
import toast from "react-hot-toast";
import HomeNavbar from "../components/HomeNavbar";
import { formatDate } from "../utils/functions";
import OptionLayout from "../layout/OptionLayout";
import { FaRegTrashCan } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import greenBg from "../assets/img/green-header-bg.svg";
import purpleBg from "../assets/img/purple-header-bg.svg";
import { useStore } from "zustand";
import store from "../store/state";
import RenameProjectModal from "../components/RenameProjectModal";
import { CiEdit } from "react-icons/ci";

const SingleProject = ({
  item,
  refresh,
  edit,
}: {
  item: any;
  refresh: () => void;
  edit: (e: string, f: string) => void;
}) => {
  const [openRename, setOpenRename] = useState(false);
  const [loadingRename, setLoadingRename] = useState(false);
  const [name, setName] = useState(item.title);

  const deleteProject = () => {
    toast.loading("Deleting Project");
    delRequest(`/project/${item._id}`)
      .then(() => {
        toast.success("Project Deleted");
        refresh();
      })
      .catch((err) => {
        console.log(err.response.data.error);
      });
  };

  const renameProject = () => {
    setLoadingRename(true);

    putRequest(`/project/${item._id}`, { name })
      .then(() => {
        setLoadingRename(false);
        setOpenRename(false);
        edit(item._id, name);
      })
      .catch((err) => {
        setLoadingRename(false);
        console.log(err.response.data.error);
      });
  };

  return (
    <div>
      <Link to={`/project/${item._id}`}>
        <div className="single-writing">
          <div className="flex justify-between items-center mb-10">
            <div className="top flex text-xl items-center gap-2 w-5/6">
              <IoFolderOpenOutline />
              <div className="truncate w-5/6">{item.title ?? "Untitled"}</div>
            </div>

            <OptionLayout>
              <div
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
              >
                <button
                  className="text-gray-800 p-2 flex gap-3 items-center text-sm"
                  onClick={() => {
                    setOpenRename(true);
                  }}
                >
                  <CiEdit />
                  Rename
                </button>
                <button
                  className="text-red-500 p-2 flex gap-3 items-center text-sm"
                  onClick={() => {
                    deleteProject();
                  }}
                >
                  <FaRegTrashCan className="text-red-500" />
                  Delete
                </button>
              </div>
            </OptionLayout>
          </div>

          <div className="bottom font-semibold">
            <div>last edited: {formatDate(item.updatedAt)}</div>
          </div>
        </div>
      </Link>

      {openRename && (
        <RenameProjectModal
          close={() => setOpenRename(false)}
          name={name}
          setName={setName}
          loading={loadingRename}
          click={renameProject}
        />
      )}
    </div>
  );
};

const Home = () => {
  const [writings, setWritings] = useState<any>(null);
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();

  const getUserWriting = () => {
    setWritings(null);
    getRequest(`/project/projects`)
      .then(({ data }) => {
        setWritings(data);
      })
      .catch((err: any) => {
        toast(err.response.data);
      });
  };

  const newWrite = () => {
    toast.loading("Creating A Project");
    postRequest("/project/new", { name: "Untitled" })
      .then(({ data }) => {
        toast.success("Project Created");
        getUserWriting();
        navigate(`/project/${data._id}`);
      })
      .catch((err) => {
        toast("Error Creating Project");
        console.log(err.response.data);
      });
  };

  const { authorize } = useStore(store);

  const editProject = (id: string, name: string) => {
    const newProjects = writings?.map((write: any) => {
      if (write._id === id) {
        return { ...write, title: name };
      } else {
        return write;
      }
    });

    setWritings(newProjects);
  };

  useEffect(() => {
    authorize();
  }, []);

  useEffect(() => {
    getUserWriting();
  }, [refresh]);

  return (
    <div>
      <img src={greenBg} alt="" className="fixed -right-10 -top-8 opacity-50" />
      <img src={purpleBg} alt="" className="fixed -left-10 -top-8 opacity-50" />

      <HomeNavbar newWrite={newWrite} />

      {!writings ? (
        <div className="h-40 flex justify-center items-center">
          <div className="text-2xl">Loading My Projects</div>
        </div>
      ) : writings?.length < 1 ? (
        <div className="h-40 flex justify-center items-center">
          <div className="text-2xl text-center">
            <div>
              Click{" "}
              <span className="cursor-pointer" onClick={newWrite}>
                +
              </span>{" "}
              To Create a New Project.
            </div>
            <div>All Your Projects Will Appear On This Page.</div>
          </div>
        </div>
      ) : (
        <div className="writings-grid">
          {writings?.map((item: any) => (
            <SingleProject
              key={item._id}
              item={item}
              refresh={() => setRefresh(!refresh)}
              edit={editProject}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
// <PageLayout writings={writings} refresh={() => setRefresh(!refresh)}>
//   <div className="h-full w-full bg-white flex justify-center items-center">
//     <div className="text-2xl font-semibold">Select a Content to edit</div>
//   </div>

//   {/* <div className="generate">
//     <div className="p-2">
//       <div className="editor h-full relative flex justify-center bg-white"></div>
//     </div>
//   </div> */}
// </PageLayout>

// "optionalDependencies": {
//   "@rollup/rollup-linux-x64-gnu": "4.9.5"
// }
