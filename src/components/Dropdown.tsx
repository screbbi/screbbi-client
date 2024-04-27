import { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

const Dropdown = ({
  types,
  setType,
  current,
  click,
  loading,
}: {
  types: string[];
  setType: (e: string) => void;
  current: string;
  click: () => void;
  loading: boolean;
}) => {
  const optionRef: any = useRef();
  const [openOptions, setOpenOptions] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        optionRef.current &&
        !optionRef?.current?.contains(event.target as Node)
      ) {
        setOpenOptions(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div className="py-2">
      <div className="flex items-center gap-2">
        <div className="relative w-4/5" ref={optionRef}>
          <div
            className="relative border-faqBorder border rounded-md p-2 flex justify-between w-full divide-x-2 divide-grey cursor-pointer"
            onClick={() => setOpenOptions(!openOptions)}
          >
            <div className="text-[10px]">{current}</div>
            <div className="flex items-center justify-center px-2">
              <IoIosArrowDown className="text-closeBlack" />
            </div>
          </div>

          {openOptions && (
            <div className="absolute bg-white p-2 w-full border-faqBorder border rounded-lg text-[10px] top-[110%]">
              {types.map((option, idx) => (
                <div
                  className={`px-4 py-[10px] rounded-md cursor-pointer ${
                    option === current && "bg-buttonPurple text-white"
                  }`}
                  key={idx}
                  onClick={() => {
                    setType(option);
                    setOpenOptions(false);
                  }}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          className={`purple-button ${loading ? "opacity-30" : "opacity-100"}`}
          onClick={click}
          disabled={loading}
        >
          Go !
        </button>
      </div>
    </div>
  );
};

export default Dropdown;
