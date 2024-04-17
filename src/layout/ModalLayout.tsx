import { FC, ReactNode } from "react";
import { LiaTimesSolid } from "react-icons/lia";
import Overlay from "../components/Overlay";

type modalType = {
  title: string;
  close: () => void;
  children: ReactNode;
};

const ModalLayout: FC<modalType> = ({ close, children, title }) => {
  return (
    <div>
      <Overlay />
      <div
        className={`fixed hider w-[90%] max-w-[30rem] duration-500 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-fit overflow-y-auto max-h-[30rem] bg-white rounded-lg grid modal-grid z-30 p-3`}
      >
        <div className="flex items-center justify-between">
          <div>{title}</div>
          <LiaTimesSolid
            className="absolute right-4 top-4 cursor-pointer"
            onClick={close}
          />
        </div>

        <div className="h-full">{children}</div>
      </div>
    </div>
  );
};

export default ModalLayout;
