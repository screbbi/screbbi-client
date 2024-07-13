import PluginBackBn from "../../components/PluginBackBn";
import PluginLayout from "../../layout/PluginLayout";
import { FaPlus, FaTrash } from "react-icons/fa";

const Characters = () => {
  return (
    <PluginLayout>
      <div className="grid grid-cols-5 gap-4 w-11/12 max-w-4xl mx-auto">
        <div className="col-span-5">
          <PluginBackBn />
        </div>

        <div className="col-span-3">
          <div className="bg-gray-100 p-4 rounded-lg">
            <div className="font-bold mb-2 text-xl">Characters</div>
            <div className="">Describe your story's premise</div>
            <div className="italic">
              (e.g. "A short story about robots taking over the world")
            </div>
            <input type="text" className="character-plugin-input" />

            <div className="mt-4">
              <div className="">A few existing characters in your story</div>
              <div className="flex items-center justify-between">
                <div className="w-11/12">
                  <input
                    type="text"
                    className="character-plugin-input"
                    placeholder="Name"
                  />
                </div>
                <FaTrash className="text-2xl text-gray-600" />
              </div>
              <input
                type="text"
                className="character-plugin-input mt-4"
                placeholder="Description"
              />
            </div>

            <button
              className="border border-black text-xs font-semibold flex gap-2 items-center px-2 py-1 rounded-full mt-6"
              //   onClick={addNewExample}
            >
              <FaPlus /> Character
            </button>

            <button className="bg-buttonPurple text-white py-2 px-6 rounded-full font-semibold text-sm mt-4">
              Submit
            </button>
          </div>
        </div>

        <div className="col-span-2 bg-gray-200/50 h-fit p-4 rounded-lg font-semibold">
          <div className="font-bold mb-2">How this works</div>

          <div>
            Type in the names and details of a few characters (at least 3) in
            your story and characters will invent new characters that could work
            in the same story.{" "}
            <a href="#" className="plugin-link">
              Try this example
            </a>
          </div>

          <div className="my-4">
            For best results, try to be consistent with the details for each
            character. (For example, if you describe a character’s physical
            appearance, then inner conflict, then most deep-seated wish, follow
            that pattern and order for the other characters.)
          </div>

          <div>
            <span className="font-bold">Pro tip:</span> Instead of characters,
            try places (real or imagined), magical potions, or made-up holidays.
            As long as you're consistent in your descriptions, Sudowrite will
            come up with more.
          </div>

          <div className="mt-4">
            Visit our <a href="#">Help Guide</a> for more ideas!
          </div>
        </div>
      </div>
    </PluginLayout>
  );
};

export default Characters;
