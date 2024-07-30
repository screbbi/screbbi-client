import { ChangeEvent, useEffect, useState } from "react";
import PluginLayout from "../../layout/PluginLayout";
import Select, { SingleValue } from "react-select";
import toast from "react-hot-toast";
import { getRequest, postRequest, putRequest } from "../../utils/request";

import { IoIosArrowForward } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";

type pluginPayloadType = {
  name: string;
  description: string;
  instruction: string;
  category: string;
  instruction_visibility: string;
  visibility: string;
  pluginType: string;
  allow_user_instructions: boolean;
  highlited_text_min: number | null;
  highlited_text_max: number | null;
  preceeding_text: string | null;
  preceeding_text_min: number | null;
  preceeding_text_max: number | null;
  popup_instruction: string;
};

type testType = {
  highlited_text: string;
  preceeding_text: string;
  instruction: string;
  storyBible: {
    braindump: string;
    genre: string;
    style: string;
    synopsis: string;
    characters: string;
    outline: string;
  };
};

const initValue: pluginPayloadType = {
  name: "",
  description: "",
  instruction: "",
  category: "",
  instruction_visibility: "hidden",
  visibility: "published",
  pluginType: "basic",
  highlited_text_min: null,
  highlited_text_max: null,
  preceeding_text: null,
  preceeding_text_max: null,
  preceeding_text_min: null,
  allow_user_instructions: false,
  popup_instruction: "",
};

type optionType = {
  label: string;
  value: string;
};

const categories: optionType[] = [
  { label: "Narrative and Plot", value: "narrative-and-plot" },
  { label: "Character Development", value: "character-development" },
  { label: "Editing and Revision", value: "editing-and-revision" },
  { label: "Scene Enhancement", value: "scene-enhancement" },
  { label: "World building", value: "world-buliding" },
  { label: "Analysis and feedback", value: "analysis-and-feedback" },
  { label: "Marketing", value: "marketing" },
  { label: "Genre specific", value: "genre-specific" },
  { label: "Multi-Lingual", value: "multi-lingual" },
  { label: "Others", value: "others" },
];

const synopsisText = `In the heart of the woods around Willow Creek, a young boy and his loyal dog embark on an adventure that will take them to the very limits of their imagination. 
They explore every inch of the forest with a sense of wonder and curiosity, always eager to discover what secrets lie hidden in the trees.
  It is during one of these explorations that they stumble upon a mysterious creature unlike anything they have ever seen before. Standing tall and powerful, with shaggy hair and piercing eyes, the creature is none other than Bigfoot himself. To their surprise, the boy and his dog find that they share a deep connection with this legendary creature, and soon they forge an unlikely friendship that will change their lives forever.
  As their bond grows stronger, the boy and his dog begin to uncover more about Bigfoot's world and the challenges he faces in the wild. They learn about the dangers that lurk in the shadows, from predatory animals to human hunters who seek to capture and exploit Bigfoot for their own gain. With each passing day, the boy and his dog become more determined to protect their new friend and ensure that he is safe from harm.
  But as they delve deeper into the mysteries of the forest, they realize that their journey will not be easy. They must confront their fears and face incredible obstacles if they hope to save Bigfoot and preserve the natural world around them. With every step they take, the stakes grow higher, and the boy and his dog must rely on their courage, quick thinking, and unbreakable bond to overcome the challenges that lie ahead.
  Through it all, the boy and his dog never lose sight of their ultimate goal: to protect Bigfoot and ensure that he can live free in his natural habitat. As they work together to overcome seemingly insurmountable odds, they discover that true friendship knows no bounds, and that even the most unlikely allies can band together to achieve greatness.
  In the end, the boy and his dog emerge victorious, having saved Bigfoot from harm and ensured that he can continue to roam free in the woods around Willow Creek. Their adventure has taught them valuable lessons about the power of friendship, the importance of protecting the natural world, and the incredible things that can be accomplished when we work together towards a common goal.`;

const characterText = `1. Jacob "Jake" Montgomery: A curious and adventurous young boy with a wild imagination and a fearless spirit. He has short, messy brown hair, 
bright blue eyes, and a constant smirk that hints at his mischievous nature. Jake is determined, resourceful, and always ready to embark on a new adventure. His strong connection to nature and loyalty towards his friends make him an unlikely hero.
  2. Max: Jake's loyal and courageous dog, a golden retriever with a heart of gold. Max has an uncanny ability to sense danger and is fiercely protective of Jake. His intelligence and resourcefulness make him an invaluable companion during their adventures.
  3. Samuel "Sam" Hunter: An enigmatic and reclusive man who lives in the woods near Willow Creek. With piercing green eyes, long grey hair, and a tall, lean frame, Sam is a skilled hunter and tracker. He possesses a wealth of knowledge about the forest and its inhabitants but harbors deep-rooted fears that prevent him from forming close connections with others.
  4. Bigfoot: A legendary creature that stands tall and powerful, with shaggy hair and piercing eyes. Bigfoot has an air of mystery surrounding him that draws Jake and Max into his world. Despite his imposing appearance, he possesses a gentle soul and forms an unlikely friendship with the boy and his dog.
  5. Felicity "Flick" Thompson: A feisty and determined girl with wild red hair and freckles that cover her cheeks. Flick is an animal lover with an innate curiosity for the natural world. She is independent, strong-willed, and possesses an unwavering sense of justice that drives her to stand up for what she believes in.
  6. Nora Montgomery: Jake's kind-hearted and loving mother who encourages her son's sense of adventure and curiosity. Nora has wavy brown hair, warm brown eyes, and a caring smile that never leaves her face. She is supportive and nurturing, always providing a safe haven for her family.
  7. Gerald "Gerry" Baxter: A shifty and opportunistic man with a short stature and a thin mustache. His slicked-back, greasy black hair and beady brown eyes make him appear untrustworthy. Gerry is a cunning individual who seeks personal gain above all else, not hesitating to exploit others to achieve his goals.
  8. Daisy: A playful and energetic border collie who belongs to Flick. Daisy is fiercely loyal to her owner and forms a strong bond with Max during their adventures together. She has a keen sense of smell and an uncanny ability to locate hidden paths and trails in the forest.
  9. Sheriff Thomas "Tom" Wilson: The experienced and respected sheriff of Willow Creek, with short-cropped grey hair, a strong jawline, and piercing blue eyes. Sheriff Wilson is dedicated to maintaining order and ensuring the safety of the residents in his town. He is fair, level-headed, and possesses an unwavering resolve to uncover the truth.`;

const outlineText = `Act 1 - Introduction:
  Chapter 1: Introduction - Jake Montgomery and his loyal dog Max explore the woods around Willow Creek. They are both adventurous and curious, and they love discovering new things in the forest. Jake's mother, Nora Montgomery, encourages her son's sense of adventure and curiosity.
  Chapter 2: Inciting Incident - While exploring the forest, Jake and Max stumble upon a mysterious creature with shaggy hair and piercing eyes - Bigfoot. They are both surprised and amazed by this discovery. Jake decides to keep their finding a secret from his mother, Nora.
  Chapter 3: Call to Action - Jake and Max decide to return to the woods to learn more about Bigfoot and see if they can communicate with him. They feel a deep connection with this legendary creature and are determined to find out more about his world.

  Act 2 - Rising Tension:
  Chapter 4: Meeting the Mentor - Jake and Max encounter Samuel "Sam" Hunter, a reclusive hunter who lives in the woods. Sam shares his knowledge about Bigfoot, warning them about the dangers that Bigfoot faces from predatory animals and human hunters.
  Chapter 5: Training - Under Sam's guidance, Jake and Max learn how to track and navigate the forest safely. They also learn how to communicate with Bigfoot through a series of gestures and vocalizations.
  Chapter 6: First Challenge - Jake, Max, and Sam discover that a cunning man named Gerry Baxter is trying to capture Bigfoot for his own gain. They must work together to thwart his plans and protect their new friend.
  Chapter 7: Gathering Allies - Jake and Max meet Felicity "Flick" Thompson and her border collie, Daisy, in the woods. Flick is an animal lover with a strong sense of justice. She agrees to help them protect Bigfoot from Gerry Baxter.
  Chapter 8: Exploration - The group of friends uncover hidden paths and trails in the forest, leading them to Bigfoot's secret home. They learn more about his world and the importance of protecting his natural habitat.
  Chapter 9: Romance - A romantic subplot develops between Jake and Flick as they bond over their shared love for nature and their determination to protect Bigfoot.

  Act 3 - Crisis Point:
  Chapter 10: Betrayal - Sam reveals his deep-rooted fears about getting close to others and confesses that he initially planned to capture Bigfoot himself. He now regrets his past actions and wants to help protect him.
  Chapter 11: Quest or Mission - The group's main goal becomes clear - they must protect Bigfoot from Gerry Baxter's relentless pursuit and ensure that he can live safely in his natural habitat.
  Chapter 12: Rising Tension - As Gerry Baxter intensifies his efforts to capture Bigfoot, the group must come up with new strategies to outsmart him and keep their friend safe.
  Chapter 13: Midpoint Reveal - The group discovers that Sheriff Thomas "Tom" Wilson is also interested in capturing Bigfoot, believing that it will ensure the safety of the residents of Willow Creek.
  Chapter 14: Backstory - Sam shares his personal connection to Bigfoot, revealing that he had been secretly observing and protecting him for years before meeting Jake and Max.
  Chapter 15: Crisis Point - Gerry Baxter manages to capture Bigfoot, forcing the group to come up with a plan to rescue him before it's too late.

  Act 4 - Climax and Resolution:
  Chapter 16: All Is Lost - Jake, Max, Flick, and Sam feel defeated as they struggle to find a way to save Bigfoot from Gerry Baxter's clutches.
  Chapter 17: Dark Night of the Soul - Jake doubts himself and his ability to save Bigfoot, but Max's unwavering loyalty and Flick's encouragement help him find the inner strength to continue.
  Chapter 18: Plot Twist - The group discovers that Sheriff Wilson is actually opposed to Gerry Baxter's plan and wants to protect Bigfoot as well. He offers to help them with their rescue mission.
  Chapter 19: Resurrection - With renewed resolve, Jake, Max, Flick, Sam, and Sheriff Wilson work together to rescue Bigfoot from Gerry Baxter.
  Chapter 20: Battle or Showdown - The group confronts Gerry Baxter in a tense standoff, ultimately outsmarting him and freeing Bigfoot from his grasp.
  Chapter 21: Climax - Bigfoot is saved and Gerry Baxter is arrested, bringing the group's quest to a triumphant close.
  Chapter 22: Resolution - Bigfoot is returned safely to his home in the forest, and the group reflects on their journey and the importance of protecting the natural world.
  Chapter 23: Returning Home - Jake, Max, Flick, and Sam bid farewell to Bigfoot and return to their lives in Willow Creek. They promise to continue watching over their friend and his forest home.
  Chapter 24: Epilogue - The characters' lives have been forever changed by their adventure. Jake and Flick continue to explore the natural world together, while Sam becomes a more active protector of the forest. Sheriff Wilson works to safeguard both the town and its surrounding wilderness. Bigfoot roams free in the woods around Willow Creek, knowing that he has true friends who will always look out for him.`;

const Create = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [instructionVisibility, setInstructionVisibility] = useState("hidden");
  const [payload, setPayload] = useState<pluginPayloadType>(initValue);
  const [loading, setLoading] = useState(false);

  const [openAdditionalOptions, setOpenAdditionalOptions] = useState(false);
  const [testData, setTestData] = useState<testType>({
    highlited_text: "",
    preceeding_text: "",
    instruction: "",
    storyBible: {
      braindump:
        "This is a story about a boy and his dog who explore the woods around willow creek.  They stumble upon bigfoot one day and start building a friendship.",
      characters: characterText,
      genre: "Young Adult Novel",
      outline: outlineText,
      style: "Uses simple words and dialogue.",
      synopsis: synopsisText,
    },
  });
  const [testingPlugin, setTestingPlugin] = useState(false);
  const [testResult, setTestResult] = useState("");
  const [saving, setSaving] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPayload({ ...payload, [name]: value });
  };

  const handleTestChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTestData({ ...testData, [name]: value });
  };

  const handleTestStoryChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTestData({
      ...testData,
      storyBible: { ...testData.storyBible, [name]: value },
    });
  };

  const setCustom = (field: string, value: string | boolean) => {
    setPayload({ ...payload, [field]: value });
  };

  const publishPlugin = () => {
    if (!payload.name.trim() || !payload.description.trim()) {
      toast("All fields are required");
      return;
    }

    if (!payload.category.trim()) {
      toast("Category cannot be empty");
      return;
    }

    setLoading(true);
    postRequest("/plugin/create", payload)
      .then(() => {
        setLoading(false);
        setPayload(initValue);
        navigate("/plugins");
      })
      .catch(() => {
        setLoading(false);
        toast("Try again");
      });
  };

  const testPlugin = () => {
    if (!testData.highlited_text.trim() || !testData.instruction.trim()) {
      toast("All fields are required");
      return;
    }

    setTestingPlugin(true);
    postRequest("/plugin/test", {
      ...testData,
      instruction: payload.instruction,
    })
      .then(({ data }) => {
        setTestResult(data);
        setTestingPlugin(false);
      })
      .catch(() => {
        setTestingPlugin(false);
        toast("Try again");
      });
  };

  useEffect(() => {
    if (!id) {
      return;
    }
    getRequest(`/plugin/view?plugin=${id}`)
      .then(({ data }) => {
        setPayload(data[0]);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const saveEdits = () => {
    setSaving(true);
    putRequest(`/plugin/mod/${id}`, payload)
      .then(() => {
        setSaving(false);
      })
      .catch(() => {
        setSaving(false);
        toast("Try Again");
      });
  };

  return (
    <PluginLayout>
      <div className="w-full max-w-3xl mx-auto pb-20">
        <div className="flex justify-between mb-8">
          <div className="text-3xl font-bold">Create Plugin</div>

          <button
            className="border border-buttonPurple text-buttonPurple p-2 rounded-md flex gap-2 items-center"
            onClick={() => navigate("/plugins")}
          >
            Back to Plugins
          </button>
        </div>

        <div className="bg-white/20 p-4">
          <div className="flex justify-between items-start">
            <div className="mb-6 font-semibold">
              <label htmlFor="name">Name</label>
              <div className="text-sm text-gray-500 my-1">
                Choose a short, distinct name
              </div>
              <input
                type="text"
                className="inputs p-2 text-sm w-60 bg-transparent border border-buttonPurple rounded-md outline-0 font-medium"
                placeholder="e.g. Simulate Reader Experience "
                name="name"
                onChange={handleChange}
                value={payload.name}
              />
            </div>

            <div className="flex font-semibold">
              <div
                className={`${
                  payload.pluginType === "basic" && "bg-buttonPurple text-white"
                } py-1 px-2 rounded-lg`}
                onClick={() => setCustom("pluginType", "basic")}
              >
                Basic
              </div>

              <div
                className={`${
                  payload.pluginType === "advanced" &&
                  "bg-buttonPurple text-white"
                } py-1 px-2 rounded-lg`}
                onClick={() => setCustom("pluginType", "advanced")}
              >
                Advanced
              </div>
            </div>
          </div>

          <div className="mb-6 font-semibold">
            <label htmlFor="name">Description</label>
            <div className="text-sm text-gray-500 my-1">
              Tell writers how to use this plugin and give an example of how it
              works
            </div>
            <textarea
              className="inputs p-2 text-sm w-full h-32 resize-none bg-transparent border border-buttonPurple rounded-md outline-0 font-medium"
              placeholder="This plugin simulates reader reactions to a chunk of text

example input: ... just as Josiah grasped Eleanor's hand, she felt a spike of electricity shoot up her spine

example output: Reader 1: &quot;spike of electricity? really? how cliche..."
              name="description"
              onChange={handleChange}
              value={payload.description}
            />
          </div>

          <div className="mb-6 grid grid-cols-3 gap-4">
            <div>
              <div>Visibility</div>
              <div
                className={`flex gap-2 items-center p-2 rounded-lg cursor-pointer ${
                  payload.visibility === "published" &&
                  "bg-buttonPurple text-white"
                }`}
                onClick={() => setCustom("visibility", "published")}
              >
                <input
                  type="radio"
                  name=""
                  id=""
                  checked={payload.visibility === "published"}
                />
                <div>
                  <div>Published</div>
                  <div className="text-xs">Everyone can see your plugin</div>
                </div>
              </div>

              <div
                className={`flex gap-2 items-center p-2 rounded-lg cursor-pointer ${
                  payload.visibility === "unlisted" &&
                  "bg-buttonPurple text-white"
                }`}
                onClick={() => setCustom("visibility", "unlisted")}
              >
                <input
                  type="radio"
                  name=""
                  id=""
                  checked={payload.visibility === "unlisted"}
                />
                <div>
                  <div>Unlisted</div>
                  <div className="text-xs">
                    Anyone with the plugin link can see your plugin
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div>Instructions Visibility</div>
              <div
                className={`flex gap-2 items-center p-2 rounded-lg cursor-pointer ${
                  instructionVisibility === "hidden" &&
                  "bg-buttonPurple text-white"
                }`}
                onClick={() => setInstructionVisibility("hidden")}
              >
                <input
                  type="radio"
                  name=""
                  id=""
                  checked={instructionVisibility === "hidden"}
                />
                <div>
                  <div>Hidden</div>
                  <div className="text-xs">
                    Only you can see your instructions
                  </div>
                </div>
              </div>

              <div
                className={`flex gap-2 items-center p-2 rounded-lg cursor-pointer ${
                  instructionVisibility === "visible" &&
                  "bg-buttonPurple text-white"
                }`}
                onClick={() => setInstructionVisibility("visible")}
              >
                <input
                  type="radio"
                  name=""
                  id=""
                  checked={instructionVisibility === "visible"}
                />
                <div>
                  <div>Visible</div>
                  <div className="text-xs">
                    Anyone that can see your plugin can see its instructions
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div>Category</div>
              <Select
                options={categories}
                // value={payload.category}
                onChange={(e: SingleValue<optionType>) => {
                  setCustom("category", e?.value ?? "");
                }}
                className=""
              />
            </div>
          </div>

          <div className="mb-6 font-semibold mt-2">
            <label htmlFor="name">Instruction</label>
            <div className="text-sm">
              Screbbi will read the highlighted text or the text before the
              cursor, then follow these instructions:
            </div>
            <textarea
              className="long-text"
              placeholder="Paste or type an example input for the preceding text."
              name="instruction"
              onChange={handleChange}
              value={payload.instruction}
            />
          </div>

          {payload.pluginType === "advanced" && (
            <>
              <div className="mb-6 font-semibold">
                <label htmlFor="name">Proceeding Text</label>
                <div className="text-sm text-gray-500 my-1">
                  Specify how many words the plugin will look back from the
                  cursor. This will be used to populate the{" "}
                  <span className="highlighted">preceding_text</span> variable
                  if it is used in your prompts.
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div>Minimum Words</div>
                    <div className="text-sm text-gray-500 my-1">
                      Show an error if the preceding text is shorter than this
                    </div>
                    <input
                      type="number"
                      className="inputs p-2 text-sm w-40 bg-transparent border border-buttonPurple rounded-md outline-0 font-medium"
                      name="preceeding_text_min"
                      value={payload.preceeding_text_min ?? ""}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <div>Maximum Words</div>
                    <div className="text-sm text-gray-500 my-1">
                      Sudowrite will read up to this amount of preceding text
                      before stopping
                    </div>
                    <input
                      type="number"
                      value={payload.preceeding_text_max ?? ""}
                      className="inputs p-2 text-sm w-40 bg-transparent border border-buttonPurple rounded-md outline-0 font-medium"
                      name="preceeding_text_max"
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="mb-6 font-semibold">
                <label htmlFor="name">Highlighted Text</label>
                <div className="text-sm text-gray-500 my-1">
                  Specify how many words are required to be highlighted when
                  using this plugin. This applies only if you use the{" "}
                  <span className="highlighted">highlighted_text</span> variable
                  in your prompts.
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div>Minimum Words</div>
                    <div className="text-sm text-gray-500 my-1">
                      Show an error if the highlight is shorter than this
                    </div>
                    <input
                      type="number"
                      className="inputs p-2 text-sm w-40 bg-transparent border border-buttonPurple rounded-md outline-0 font-medium"
                      name="highlited_text_min"
                      onChange={handleChange}
                      value={payload.highlited_text_min ?? ""}
                    />
                  </div>

                  <div>
                    <div>Maximum Words</div>
                    <div className="text-sm text-gray-500 my-1">
                      Show an error if the highlight is longer than this
                    </div>
                    <input
                      type="number"
                      className="inputs p-2 text-sm w-40 bg-transparent border border-buttonPurple rounded-md outline-0 font-medium"
                      name="highlited_text_max"
                      onChange={handleChange}
                      value={payload.highlited_text_max ?? ""}
                    />
                  </div>
                </div>
              </div>

              <div className="border border-black p-4 rounded-lg">
                <div className="flex justify-between">
                  <div>
                    <div>Allow Users to Give Instructions</div>
                    <div className="text-gray-400">
                      When someone uses your plugin, we'll ask them for
                      additional instructions.
                    </div>
                  </div>

                  <div className="checkbox-wrapper-6">
                    <input
                      className="tgl tgl-light"
                      id="allow_user_instructions"
                      type="checkbox"
                      name="allow_user_instructions"
                      onChange={() => {
                        setCustom(
                          "allow_user_instructions",
                          payload.allow_user_instructions === true
                            ? false
                            : true
                        );
                      }}
                      checked={payload.allow_user_instructions === true}
                    />
                    <label
                      className="tgl-btn"
                      htmlFor="allow_user_instructions"
                    />
                  </div>
                </div>

                {payload.allow_user_instructions && (
                  <div className="mt-6">
                    <div>Customize your Pop-up</div>
                    <div className="text-gray-500 text-sm">
                      Tell users what to put in. For example, if your plugin
                      generates series outlines, you might ask the user “How
                      many books do you want in your series?”
                    </div>

                    <div className="">
                      <input
                        type="text"
                        className="inputs p-2 text-sm w-full bg-transparent border border-buttonPurple rounded-md outline-0 font-medium"
                        placeholder="Give instructions"
                        name="popup_instruction"
                        onChange={handleChange}
                        value={payload.popup_instruction}
                      />
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          {!id && (
            <div className="flex justify-end mt-6">
              <button
                className={`bg-buttonPurple text-white p-2 rounded-lg font-semibold ${
                  loading && "opacity-40"
                }`}
                onClick={publishPlugin}
                disabled={loading}
              >
                {!loading ? "Publish Plugin" : "Publishing"}
              </button>
            </div>
          )}

          {id && (
            <div className="flex justify-between mt-6">
              <button
                className={`text-red-500 p-2 rounded-lg font-semibold ${
                  loading && "opacity-40"
                }`}
                onClick={publishPlugin}
                disabled={loading}
              >
                {/* {!loading ? "Delete Plugin" : "Deleting"} */}
              </button>

              <button
                className={`text-buttonPurple border border-buttonPurple p-2 rounded-lg font-semibold ${
                  loading && "opacity-40"
                }`}
                onClick={saveEdits}
                disabled={saving}
              >
                {!saving ? "Save Plugin" : "Saving"}
              </button>
            </div>
          )}
        </div>

        {!id && (
          <div className="bg-white/20 p-4 mt-10">
            <textarea
              className="long-text"
              placeholder="Paste or type an example input (text highlight)."
              name="highlited_text"
              onChange={handleTestChange}
              value={testData.highlited_text}
            />

            <div className="flex items-center gap-2 mt-2">
              <IoIosArrowForward
                className={`${
                  openAdditionalOptions ? "rotate-90" : "rotate-0"
                } duration-500`}
                onClick={() => setOpenAdditionalOptions(!openAdditionalOptions)}
              />
              <div>Additional Variables</div>
            </div>

            {openAdditionalOptions && (
              <>
                <div className="mb-6 font-semibold mt-2">
                  <label htmlFor="name">Instruction</label>

                  <textarea
                    className="long-text"
                    placeholder="Paste or type an example input for the preceding text."
                    name="instruction"
                    onChange={handleTestChange}
                    value={testData.instruction}
                  />
                </div>

                <div className="mb-6 font-semibold mt-2">
                  <label htmlFor="name">Proceeding Text</label>

                  <textarea
                    className="long-text"
                    placeholder="Paste or type an example input for the preceding text."
                    name="preceeding_text"
                    onChange={handleTestChange}
                    value={testData.preceeding_text}
                  />
                </div>

                <div className="mb-6 font-semibold mt-2">
                  <label htmlFor="name">Braindump</label>

                  <textarea
                    className="long-text"
                    placeholder="Paste or type an example input for the preceding text."
                    name="braindump"
                    onChange={handleTestStoryChange}
                    value={testData.storyBible.braindump}
                  />
                </div>

                <div className="mb-6 font-semibold mt-2">
                  <label htmlFor="name">Genre</label>

                  <textarea
                    className="long-text"
                    placeholder="Paste or type an example input for the preceding text."
                    name="genre"
                    onChange={handleTestStoryChange}
                    value={testData.storyBible.genre}
                  />
                </div>

                <div className="mb-6 font-semibold mt-2">
                  <label htmlFor="name">Style</label>

                  <textarea
                    className="long-text"
                    placeholder="Paste or type an example input for the preceding text."
                    name="style"
                    onChange={handleTestStoryChange}
                    value={testData.storyBible.style}
                  />
                </div>

                <div className="mb-6 font-semibold mt-2">
                  <label htmlFor="name">Characters</label>

                  <textarea
                    className="long-text"
                    placeholder="Paste or type an example input for the preceding text."
                    name="characters"
                    onChange={handleTestStoryChange}
                    value={testData.storyBible.characters}
                  />
                </div>

                <div className="mb-6 font-semibold mt-2">
                  <label htmlFor="name">Outline</label>

                  <textarea
                    className="long-text"
                    placeholder="Paste or type an example input for the preceding text."
                    name="outline"
                    onChange={handleTestStoryChange}
                    value={testData.storyBible.outline}
                  />
                </div>
              </>
            )}

            <div className="flex justify-end mt-6">
              <button
                className={`bg-buttonPurple text-white p-2 rounded-lg font-semibold ${
                  testingPlugin && "opacity-40"
                }`}
                onClick={testPlugin}
                disabled={testingPlugin}
              >
                {!testingPlugin ? "Run Test" : "Testing"}
              </button>
            </div>

            <div>
              <div>Test Result:</div>
              <div>{testResult}</div>
            </div>
          </div>
        )}
      </div>
    </PluginLayout>
  );
};

export default Create;
