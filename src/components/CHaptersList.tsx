const CHaptersList = ({
  chapters,
  handleClick,
}: {
  chapters: any;
  handleClick: (e: string) => void;
}) => {
  return (
    <div className="absolute right-0 top-full bg-white w-48 z-20 shadow-lg rounded-md p-4 text-sm">
      <div className="font-semibold">Choose a chapter:</div>
      {Object.values(chapters).map((val: any, idx: number) => (
        <div key={idx}>
          {val.map((item: any) => (
            <div
              className="my-1 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                handleClick(item.chapter);
              }}
              key={item.chapter}
            >
              {item.chapter}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default CHaptersList;
