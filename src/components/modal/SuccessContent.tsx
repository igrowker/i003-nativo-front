import React from "react";

const SuccessContent: React.FC<{
  title: string;
  sender: string;
  receiver: string;
  amount: string;
}> = ({ title, sender, receiver, amount }) => {
  return (
    <div className="my-2 flex flex-col items-center gap-2 rounded-[20px] border border-secondary-green bg-light-grey p-6 drop-shadow-box">
      <p className="text-xl font-bold leading-6 text-center">{title}</p>
      <div className="my-2 flex size-20 items-center justify-center rounded-full bg-light-green drop-shadow-box">
        <img src="./verified.png" alt="spinner" className="h-14" />
      </div>
      <p className="mb-2 text-[32px] font-bold leading-9">${amount}</p>
      <div className="w-full rounded-[20px] border border-secondary-green bg-light-green p-3 drop-shadow-box">
        <p className="font-bold">Para</p>
        <p>{receiver}</p>
      </div>
      <div className="w-full rounded-[20px] border border-secondary-green bg-light-grey p-3 drop-shadow-box">
        <p className="font-bold">Desde</p>
        <p>{sender}</p>
      </div>
    </div>
  );
};

export default SuccessContent;
