import PageLayout from "../layout/PageLayout";

const Home = () => {
  return (
    <PageLayout>
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
