import { useEffect, useState } from "react";
import { IoFolderOpenOutline } from "react-icons/io5";
import { getRequest, postRequest } from "../utils/request";
import toast from "react-hot-toast";
import HomeNavbar from "../components/HomeNavbar";
import { formatDate } from "../utils/functions";
import OptionLayout from "../layout/OptionLayout";
import { FaRegTrashCan } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import greenBg from "../assets/img/green-header-bg.svg";
import purpleBg from "../assets/img/purple-header-bg.svg";

const SingleProject = ({ item }: { item: any }) => {
  return (
    <Link to={`/project/${item._id}`}>
      <div className="single-writing">
        <div className="flex justify-between items-center mb-4">
          <div className="top flex text-xl items-center gap-2 w-5/6">
            <IoFolderOpenOutline />
            <div className="truncate w-5/6">{item.title ?? "Untitled"}</div>
          </div>

          <OptionLayout>
            <button className="text-red-500 p-2 flex gap-3 items-center">
              <FaRegTrashCan />
              Delete
            </button>
          </OptionLayout>
        </div>

        <div className="bottom font-semibold">
          <div>last edited: {formatDate(item.updatedAt)}</div>
        </div>
      </div>
    </Link>
  );
};

const Home = () => {
  const [writings, setWritings] = useState<any>(null);
  const navigate = useNavigate();

  const getUserWriting = () => {
    setWritings(null);
    getRequest(`/project/projects`)
      .then(({ data }) => {
        setWritings(data);
      })
      .catch((err: any) => {
        toast.error(err.response.data);
      });
  };

  const newWrite = () => {
    postRequest("/project/new", { name: "Untitled" })
      .then(({ data }) => {
        getUserWriting();
        navigate(`/project/${data._id}`);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  useEffect(() => {
    getUserWriting();
  }, []);

  return (
    <div>
      <img src={greenBg} alt="" className="fixed -right-10 -top-8 opacity-50" />
      <img src={purpleBg} alt="" className="fixed -left-10 -top-8 opacity-50" />

      <HomeNavbar newWrite={newWrite} />

      <div className="writings-grid">
        {writings?.map((item: any) => (
          <SingleProject key={item._id} item={item} />
        ))}
      </div>
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
