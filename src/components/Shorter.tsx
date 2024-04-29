import { IoMdLink } from "react-icons/io";
import { MdContentCopy } from "react-icons/md";
import { BiLike, BiDislike } from "react-icons/bi";
import { CiStar } from "react-icons/ci";
import toast from "react-hot-toast";
import { useState } from "react";

function copyToClipboard(text: string) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
  toast.success("Copied");
}

const Shorter = ({
  item,
  insert,
}: {
  item: any;
  insert: (a: string) => void;
}) => {
  const [showResults, setShowResults] = useState(false);
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="py-2 relative mb-2">
      <div
        className={`${
          !showResults && "shadow-md"
        } p-2 rounded-md relative bg-white z-20`}
      >
        <div className="text-xs font-bold text-closeBlack capitalize">
          {item.category}
        </div>

        <div
          className="grey-text mt-2 pb-2 cursor-pointer"
          onClick={() => setShowResults(!showResults)}
        >
          {/* {item?.suggestions?.content} */}
          {item?.suggestions?.content?.length < 80 ? (
            item.suggestions.content
          ) : (
            <>
              <span>
                {showMore
                  ? item.suggestions.content
                  : item.suggestions.content.slice(0, 80)}
              </span>{" "}
              <span
                className="underline"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMore(!showMore);
                }}
              >
                show {showMore ? "less" : "more"}
              </span>
            </>
          )}
        </div>
      </div>
      {!showResults && (
        <div className="absolute w-11/12 h-full bg-white z-10 shadow-md rounded-md top-[2px] left-1/2 -translate-x-1/2"></div>
      )}

      {/* border-b-faqBorder border-b */}
      {showResults && (
        <div>
          {item.suggestions?.result?.map((result: any) => (
            <div key={result.id} className="p-2 shadow-md my-2 rounded-md">
              <div className="grey-text mt-2">{result.suggestion.slice(2)}</div>

              <div className="flex items-center divide-x-2 mt-2">
                <div className="flex gap-2 items-center pr-2">
                  <button
                    className="purple-button"
                    onClick={() => {
                      insert(result?.suggestion.slice(2));
                    }}
                  >
                    <IoMdLink className="text-lg" />
                    Insert
                  </button>

                  <button
                    className="purple-button"
                    onClick={() => {
                      copyToClipboard(result?.suggestion?.slice(2));
                    }}
                  >
                    <MdContentCopy className="text-lg" />
                    Copy
                  </button>
                </div>
                <div className="flex gap-2 items-center text-grey pl-2">
                  <div>
                    <BiLike />
                  </div>
                  <div>
                    <BiDislike />
                  </div>
                  <div>
                    <CiStar />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Shorter;
