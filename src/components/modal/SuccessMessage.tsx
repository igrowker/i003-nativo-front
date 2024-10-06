const SuccessMessage: React.FC<{
  title: string;
  message: string
  closeModal: () => void;
}> = ({ title, message, closeModal }) => {
  return (
    <div className="w-[80%] my-2 flex flex-col items-center gap-2 rounded-[20px] border border-secondary-green bg-light-grey p-6 drop-shadow-box absolute z-20 top-0 left-0 translate-x-[13%] translate-y-[50%]">
      <p className="text-xl font-bold leading-6 text-center">{title}</p>
      <div className="my-2 flex size-20 items-center justify-center rounded-full bg-light-green drop-shadow-box">
        <img src="./verified.png" alt="image success" className="h-14" />
      </div>
      <p className="text-center">{message}</p>
      <button
        onClick={closeModal}
        className="w-full rounded-[30px] bg-[#8EC63F] px-4 py-2 font-bold leading-[19px] mt-8"
      >
        Cerrar
      </button>
    </div>
  );
};

export default SuccessMessage;
