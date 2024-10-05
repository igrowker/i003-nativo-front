import { useState } from "react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import MoneyJar from "../../assets/Images/dashboard/money-jar.png";

export const AccountInfo: React.FC<{ amount: number }> = ({ amount }) => {
  const [showMoney, setShowMoney] = useState(true);

  const switchShowMoney = () => {
    if (showMoney) {
      setShowMoney(false);
    } else {
      setShowMoney(true);
    }
  };
  return (
    <>
      <div>
        <div className="mt-7 flex gap-2">
          <h2 className="text-sm font-medium leading-4">Dinero disponible</h2>
          <button onClick={switchShowMoney}>
            <MdOutlineRemoveRedEye className="text-2xl" />
          </button>
        </div>
        <h2 className="mr-6 text-center text-[26px]">
          {showMoney ? `$${amount ?? "0.00"}` : "$***"}
        </h2>
      </div>
      <img src={MoneyJar} alt="dinero" />
    </>
  );
};
