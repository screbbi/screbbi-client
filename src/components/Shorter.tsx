import { IoMdLink } from "react-icons/io";
import { MdContentCopy } from "react-icons/md";
import { BiLike, BiDislike } from "react-icons/bi";
import { CiStar } from "react-icons/ci";

const Shorter = ({ item }: { item: any }) => {
  return (
    <div className="py-2">
      <div className="text-xs font-bold text-closeBlack capitalize">
        {item.category}
        {/* {item?.suggestions?.name} */}
      </div>
      <div className="grey-text mt-2">
        {/* Hello, I need a writing software similar to this that work with AI. */}
        {item?.suggestions?.content}
      </div>

      <div className="flex items-center divide-x-2 mt-2">
        <div className="flex gap-2 items-center pr-2">
          <button className="purple-button">
            <IoMdLink className="text-lg" />
            Insert
          </button>
          <button className="purple-button">
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
