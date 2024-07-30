import { ChangeEvent, useEffect, useState } from "react";
import PluginLayout from "../../layout/PluginLayout";
import Select, { SingleValue } from "react-select";
import toast from "react-hot-toast";
import { getRequest, postRequest, putRequest } from "../../utils/request";
import { useNavigate, useParams } from "react-router-dom";

type pluginPayloadType = {
  name: string;
  description: string;
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

const initValue: pluginPayloadType = {
  name: "",
  description: "",
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

const EditPlugin = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [instructionVisibility, setInstructionVisibility] = useState("hidden");
  const [payload, setPayload] = useState<pluginPayloadType>(initValue);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPayload({ ...payload, [name]: value });
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

  useEffect(() => {
    if (!id) {
      return;
    }
    getRequest(`/plugin/view?plugin=${id}`)
      .then(({ data }) => {
        const current = data.find((item: any) => item._id === id);
        const newCurret = {
          ...current,
          popup_instruction: current.advanceSettings.popup_instruction,
          preceeding_text: current.advanceSettings.preceeding_text,
          highlited_text_min: current.advanceSettings.highlited_text_config.min,
          highlited_text_max: current.advanceSettings.highlited_text_config.max,
          preceeding_text_min:
            current.advanceSettings.preceeding_text_config.min,
          preceeding_text_max:
            current.advanceSettings.preceeding_text_config.max,
        };
        setPayload(newCurret);
        console.log(newCurret);
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

          {/* <div className="mb-6 font-semibold mt-2">
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
          </div> */}

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
      </div>
    </PluginLayout>
  );
};

export default EditPlugin;
