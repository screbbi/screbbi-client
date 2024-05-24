const Notlinked = ({ handleClick }: { handleClick: () => void }) => {
  return (
    <div className="absolute right-0 top-full bg-white w-60 z-20 shadow-lg rounded-md p-4">
      <div>
        This document is <span className="font-semibold">not linked</span> to
        your Outline
      </div>
      <div className="mt-2">
        AIContentWriter will not refer to this part of your outline when
        generatig text
      </div>

      <div className="flex justify-end mt-2">
        <button
          className="bg-buttonPurple text-white p-2 rounded-lg"
          onClick={(e) => {
            e.stopPropagation();
            handleClick();
          }}
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default Notlinked;
