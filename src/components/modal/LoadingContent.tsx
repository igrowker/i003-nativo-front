import React from "react";

const LoadingContent: React.FC<{
  title: string;
  sender: string;
  receiver: string;
}> = ({ title, sender, receiver }) => {
  return (
    <div className="flex flex-col items-center rounded-[20px] border border-secondary-green bg-light-grey p-6 drop-shadow-box">
      <p className="text-xl font-bold leading-6">{title}</p>
      <img
        src="./spinner.png"
        alt="spinner"
        className="my-6 h-24 animate-spin"
      />
      <div className="mb-2 w-full rounded-[20px] border border-secondary-green bg-light-green p-3 drop-shadow-box">
        <p className="font-bold">Para</p>
        <p>{receiver}</p>
      </div>
      <div className="mb-2 w-full rounded-[20px] border border-secondary-green bg-light-grey p-3 drop-shadow-box">
        <p className="font-bold">Desde</p>
        <p>{sender}</p>
      </div>
    </div>
  );
};

export default LoadingContent;
