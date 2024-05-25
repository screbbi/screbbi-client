const RewriteOption = ({
  setCardNumber,
  cardNumber,
}: {
  cardNumber: number;
  setCardNumber: (e: any) => void;
}) => {
  return (
    <div className="absolute top-full left-0 w-60 bg-white p-3 shadow-lg rounded-md">
      <div className="p-3">
        <div className="text-sm font-semibold mb-2">Number of card</div>
        <input
          type="number"
          className="border border-selectText text-black block w-full p-2 rounded-md outline-0"
          placeholder="Card Number"
          value={cardNumber}
          min={1}
          onChange={(e) => {
            setCardNumber(e.target.value);
            localStorage.setItem("cardNumber", e.target.value);
          }}
        />
      </div>
    </div>
  );
};

export default RewriteOption;
