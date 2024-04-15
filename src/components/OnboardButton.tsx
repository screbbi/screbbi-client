import ButtonLoader from "./ButtonLoader";

const OnboardButton = ({
  text,
  disable,
  click,
  type,
  loading,
}: {
  text: string;
  type?: "button" | undefined | "submit" | "reset";
  disable?: boolean;
  loading?: boolean;
  click?: () => void;
}) => {
  return (
    <div>
      <button
        className={`text-sm text-white bg-buttonPurple w-full rounded-md py-3 mt-4 font-normal flex-center gap-2 flex justify-center items-center ${
          disable || loading ? "opacity-70" : "opacity-100"
        }`}
        disabled={loading || disable}
        onClick={click}
        type={type ?? "button"}
      >
        {loading && <ButtonLoader />}
        {text}
      </button>
    </div>
  );
};

export default OnboardButton;
