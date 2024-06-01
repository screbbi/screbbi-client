import { ReactNode } from "react";
import { BsStars } from "react-icons/bs";
import { useStore } from "zustand";
import store from "../store/state";

const EmptyToken = ({
  children,
  text,
}: {
  children: ReactNode;
  text: string;
}) => {
  const { token } = useStore(store);

  return (
    <div className="flex items-center gap-4 text-nowrap">
      {token <= 0 ? (
        <div className="relative group">
          <button
            className="text-base text-white bg-buttonPurple rounded-md py-2 font-normal gap-2 inline-flex justify-center items-center px-4 opacity-80"
            disabled={true}
          >
            <BsStars />
            {text}
          </button>

          <div className="absolute -left-6 bg-neutral-800 top-10 text-white text-sm p-2 w-60 text-wrap rounded-md group-hover:block hidden">
            You are out of credits, Upgrade or buy a credit pack to generate
          </div>
        </div>
      ) : (
        children
      )}
    </div>
  );
};

export default EmptyToken;
