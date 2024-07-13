import PluginBackBn from "../../components/PluginBackBn";
import PluginLayout from "../../layout/PluginLayout";
import Select from "react-select";

const Twist = () => {
  const options = [
    { value: "science-fiction", label: "Science Fiction" },
    { value: "fantasy", label: "Fantasy" },
    { value: "literary", label: "Literary" },
  ];

  return (
    <PluginLayout>
      <div className="grid grid-cols-5 gap-4 w-11/12 max-w-4xl mx-auto">
        <div className="col-span-5">
          <PluginBackBn />
        </div>
        <div className="col-span-3">
          <div className="bg-gray-100 p-4 rounded-lg">
            <div className="font-bold mb-2">Genre</div>
            <Select options={options} />

            <textarea
              name=""
              id=""
              className="border border-gray-500 w-full mt-6 rounded-md p-2 outline-buttonPurple h-40 resize-none"
              placeholder="Summay of the story"
            />

            <button className="bg-buttonPurple text-white py-2 px-6 rounded-full font-semibold text-sm mt-4">
              Submit
            </button>
          </div>
        </div>

        <div className="col-span-2 bg-gray-200/50 h-fit p-4 rounded-lg font-semibold">
          <div className="font-bold mb-2">How this works</div>

          <div>Twist helps you take your story in unexpected directions.</div>

          <div className="my-2">
            Select a genre, type a few sentence summary of your story (or
            provide a setting and a little bit on the characters) and hit
            Submit.
          </div>

          <div>
            <span className="font-bold">Pro tip:</span> Try changing the genre
            or rewriting your summary to focus on different elements for new
            results..
          </div>
        </div>
      </div>
    </PluginLayout>
  );
};

export default Twist;
