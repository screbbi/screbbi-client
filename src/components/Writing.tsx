import { useState } from "react";
import { FaTimes } from "react-icons/fa";

const Writing = ({
  generate,
  loading,
}: {
  generate: (e: string) => void;
  close: () => void;
  loading: boolean;
}) => {
  const [writing, setWriting] = useState("");

  return (
    <div>
      <div className="fixed top-0 left-0 inset-0 bg-black/40 z-30"></div>
      {/* // onClick={click} */}
      <div className="small-modal">
        <div className="flex justify-between items-center mb-4">
          <div className="text-xl font-semibold">
            Paste in your writing sample
          </div>
          <FaTimes className="cursor-pointer" onClick={close} />
        </div>

        <textarea
          value={writing}
          className="w-full h-32 border-2 border-selectText outline-0 resize-none rounded-md p-2 text-xs"
          onChange={(e) => setWriting(e.target.value)}
        ></textarea>

        <div className="flex justify-end">
          <button
            className={`bg-buttonPurple text-white w-full p-2 rounded-md mt-4`}
            onClick={() => generate(writing)}
            disabled={writing.trim().length === 0 || loading}
          >
            Generate
          </button>

          {/* <button
            className={`bg-buttonPurple text-white w-full p-2 rounded-md mt-4 ${
              loading && "opacity-50"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              generate();
            }}
            disabled={loading}
          >
            Generate
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Writing;
