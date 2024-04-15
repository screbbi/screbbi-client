const Overlay = ({ click }: { click?: () => void }) => {
  return (
    <div
      className="fixed top-0 left-0 inset-0 bg-black/40"
      onClick={click}
    ></div>
  );
};

export default Overlay;
