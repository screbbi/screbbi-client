const Notlinked = ({
  handleClick,
  linked,
}: {
  handleClick: () => void;
  linked: string;
}) => {
  return (
    <div className="absolute right-0 top-full bg-white w-60 z-20 shadow-lg rounded-md p-4">
      <div>
        {linked ? (
          <>
            <div>
              This document is linked to{" "}
              <span className="font-semibold">{linked}</span> to your Outline
            </div>
            <div className="mt-2">
              Screbbi will refer to this part of your outline when generatig
              text
            </div>
          </>
        ) : (
          <>
            <div>
              This document is <span className="font-semibold">not linked</span>{" "}
              to your Outline
            </div>
            <div className="mt-2">
              Screbbi will not refer to this part of your outline when
              generating text
            </div>
          </>
        )}
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
