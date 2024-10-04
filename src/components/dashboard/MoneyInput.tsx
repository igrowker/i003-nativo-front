import React from "react";

interface MoneyInputProps {
  amount: number | string;
  setAmount: React.Dispatch<React.SetStateAction<number | string>>;
}

const MoneyInput: React.FC<MoneyInputProps> = ({ amount, setAmount }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    setAmount(value ? parseInt(value) : "");
  };

  const formatCurrency = (value: number | string) => {
    if (!value) return "$0";
    return `$${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
  };

  return (
    <input
      type="text"
      value={formatCurrency(amount)}
      onChange={handleChange}
      className="rounded-[20px] bg-light-grey py-10 text-center text-3xl font-bold drop-shadow-box focus:outline-none"
      placeholder="$0"
    />
  );
};

export default MoneyInput;
