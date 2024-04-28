import { useEffect, useState } from "react";
import PageLayout from "../layout/PageLayout";
import { getRequest } from "../utils/request";
import toast from "react-hot-toast";

const Home = () => {
  const [writings, setWritings] = useState<any>(null);

  const getUserWriting = () => {
    getRequest(`/writer/writings`)
      .then(({ data }) => {
        setWritings(data);
      })
      .catch((err: any) => {
        toast.error(err.response.data);
      });
  };

  useEffect(() => {
    getUserWriting();
  }, []);

  return (
    <PageLayout writings={writings}>
      <div className="h-full w-full bg-white flex justify-center items-center">
        <div className="text-2xl font-semibold">Select a Content to edit</div>
      </div>
      {/* <div className="generate">
        <div className="p-2">
          <div className="editor h-full relative flex justify-center bg-white"></div>
        </div>
      </div> */}
    </PageLayout>
  );
};

export default Home;
