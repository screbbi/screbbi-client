import PluginBackBn from "../../components/PluginBackBn";
import PluginLayout from "../../layout/PluginLayout";

const Poems = () => {
  return (
    <PluginLayout>
      <div className="grid grid-cols-5 gap-4 w-11/12 max-w-4xl mx-auto">
        <div className="col-span-5">
          <PluginBackBn />
        </div>

        <div className="col-span-3">
          <div className="bg-gray-100 p-4 rounded-lg">
            <div className="font-bold mb-2 text-xl">Poem</div>

            <input
              type="text"
              className="character-plugin-input"
              placeholder="Topic"
            />

            <div className="mt-4">
              <input
                type="text"
                className="character-plugin-input"
                placeholder="Title"
              />

              <textarea
                className="character-plugin-input mt-4 h-32 resize-none"
                placeholder="Seed Lines (Up to 5)"
              />
            </div>

            <button className="bg-buttonPurple text-white py-2 px-6 rounded-full font-semibold text-sm mt-4">
              Submit
            </button>
          </div>
        </div>

        <div className="col-span-2 bg-gray-200/50 h-fit p-4 rounded-lg font-semibold">
          <div className="font-bold mb-2">How this works</div>

          <div>Poem generates a contemporary free verse poem.</div>

          <div className="my-4">
            Provide a topic, and optionally the title and some lines to seed the
            poem.
          </div>

          <div>A few tips:</div>
          <div className="my-4">
            Generation can take up to 20 seconds. Patience is key!
          </div>

          <div className="my-4">
            Identical titles and lines can cause repetitious poems.
          </div>

          <div className="my-4">
            Sudowrite is not optimized for word play or rhyming structures.
          </div>

          <div className="mt-4">
            For more ideas, visit the <a href="#">Help Guide</a>
          </div>
        </div>
      </div>
    </PluginLayout>
  );
};

export default Poems;
