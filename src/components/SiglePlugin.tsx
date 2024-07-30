import { useState } from "react";
import { pluginType } from "../utils/interface";
import Overlay from "./Overlay";
import toast from "react-hot-toast";

const SiglePlugin = ({
  plugin,
  usePlugin,
}: {
  plugin: pluginType;
  usePlugin: (e: string, f?: string) => void;
}) => {
  const [additionalDetails, setAdditionalDetails] = useState("");
  const [showAdd, setShowAdd] = useState(false);

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div
        className="single-desc cursor-pointer hover:bg-slate-200/60 px-2 rounded-md"
        key={plugin._id}
        onClick={() => {
          if (
            plugin.advanceSettings.popup_instruction &&
            plugin.advanceSettings.popup_instruction !== null
          ) {
            setShowAdd(true);
          } else {
            usePlugin(plugin._id);
          }
        }}
      >
        <div>{plugin.name}</div>
      </div>

      {showAdd && (
        <div className="">
          <Overlay click={() => setShowAdd(false)} />
          <div className="fixed left-1/2 -translate-x-1/2 w-[30rem] top-20 bg-white p-4 z-30 rounded-lg">
            <div className="text-slate-500">{plugin.name}</div>
            <div className="text-sm mb-2">
              {plugin.advanceSettings.popup_instruction}
            </div>
            <div>
              <input
                type="text"
                value={additionalDetails}
                onChange={(e) => setAdditionalDetails(e.target.value)}
                className="inputs p-2 text-sm w-full bg-transparent border border-buttonPurple rounded-md outline-0 font-medium"
              />
            </div>

            <div className="flex justify-end mt-2">
              <button
                className="bg-buttonPurple text-white p-2 rounded-md"
                onClick={() => {
                  if (additionalDetails.trim() === "") {
                    toast("Input cannot be empty");
                    return;
                  } else {
                    usePlugin(plugin._id, additionalDetails);
                    setShowAdd(false);
                  }
                }}
              >
                Use Plugin
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SiglePlugin;

// {
//     "name": "Like Dat",
//     "description": "This is a plugin that expands the theme of a writing while maintaining the original theme of the writing",
//     "instruction": "1. Maintain the Original Meaning: Ensure that the expanded text retains the original meaning and message of the input text.\n2.Add Descriptions: Introduce detailed descriptions of scenes, characters, and actions to create a more vivid and immersive narrative.\n3. Incorporate Context: Provide additional context where necessary to explain events, motivations, or background information.\n4. Enhance Dialogues: Expand dialogues with more expressive language, inner thoughts, and emotional responses.\n5. Smooth Transitions: Ensure that the expanded sections transition smoothly from the original text, maintaining coherence and flow.\n6. Preserve Style and ToneMatch the writing style and tone of the original text to keep the narrative consistent.\n",
//     "category": "editing-and-revision",
//     "instruction_visibility": "hidden",
//     "visibility": "published",
//     "pluginType": "advanced",
//     "highlited_text_min": "100",
//     "highlited_text_max": "400",
//     "preceeding_text": null,
//     "preceeding_text_max": "295",
//     "preceeding_text_min": "8",
//     "allow_user_interactions": true,
//     "popup_instruction": "How old are you"
// }
