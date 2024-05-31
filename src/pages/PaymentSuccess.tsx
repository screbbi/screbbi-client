import { FiCheckCircle } from "react-icons/fi";

const PaymentSuccess = () => {
  return (
    <div className="bg-[url(https://editor.sudowrite.com/assets/sorbet-background.png)] bg-cover bg-no-repeat min-h-screen flex justify-center items-center">
      <div>
        <div className="flex justify-center">
          <FiCheckCircle className="text-5xl" />
        </div>
        <div className="successful font-semibold text-2xl mt-6 mb-2">
          {/* <div className="successful text-green-600 font-semibold text-2xl"> */}
          Payment Successful
        </div>
        <div className="flex justify-center">
          <button className="text-white bg-black px-6 py-2 rounded-lg font-semibold text-sm">
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
