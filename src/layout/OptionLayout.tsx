import { ReactNode, useEffect, useRef, useState } from "react";
import { FaEllipsis } from "react-icons/fa6";

const OptionLayout = ({ children }: { children: ReactNode }) => {
  const optionRef: any = useRef();
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        optionRef.current &&
        !optionRef.current.contains(event.target as Node)
      ) {
        setShowOptions(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div className="relative" ref={optionRef}>
      <button
        className="p-2"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setShowOptions(!showOptions);
          return;
        }}
      >
        <FaEllipsis />
      </button>

      {showOptions && (
        <div className="absolute top-full right-0 bg-white shadow-lg z-10 rounded-md">
          {children}
        </div>
      )}
    </div>
  );
};

export default OptionLayout;
