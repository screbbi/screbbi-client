import { IoMdLink } from "react-icons/io";
import { MdContentCopy } from "react-icons/md";
import { BiLike, BiDislike } from "react-icons/bi";
import { CiStar } from "react-icons/ci";
import toast from "react-hot-toast";

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
  insert: (a: string, b: string) => void;
}) => {
  return (
    <div className="py-2">
      <div className="text-xs font-bold text-closeBlack capitalize">
        {item.category}
        {/* {item?.suggestions?.name} */}
      </div>
      <div className="grey-text mt-2">
        {item?.suggestions?.result[0]?.suggestion.slice(2)}
      </div>

      <div className="flex items-center divide-x-2 mt-2">
        <div className="flex gap-2 items-center pr-2">
          <button
            className="purple-button"
            onClick={() => {
              insert(
                item?.suggestions?.content,
                item?.suggestions?.result[0]?.suggestion.slice(2)
              );
            }}
          >
            <IoMdLink className="text-lg" />
            Insert
          </button>

          <button
            className="purple-button"
            onClick={() => {
              copyToClipboard(
                item?.suggestions?.result[0]?.suggestion.slice(2)
              );
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
  );
};

export default Shorter;
