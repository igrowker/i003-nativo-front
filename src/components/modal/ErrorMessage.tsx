import { MdClose } from "react-icons/md";

const ErrorMessage: React.FC<{
  title: string;
  message: string;
  closeModal: () => void;
}> = ({ title, message, closeModal }) => {
  return (
    <div className="w-[80%] my-2 flex flex-col items-center gap-2 rounded-[20px] border border-secondary-green bg-light-grey p-6 drop-shadow-box absolute z-20 top-0 left-0 translate-x-[13%] translate-y-[50%]">
      <p className="text-xl font-bold leading-6">¡Error!</p>
      <p className="text-lg font-bold leading-6 text-center">{title}</p>
      <div className="my-2 flex size-20 items-center justify-center rounded-full bg-red-200 drop-shadow-box">
        <MdClose className="text-6xl text-red-600" />
      </div>
      <p className="text-center mt-8">{message}</p>
      <button
            onClick={closeModal}
            className="w-full rounded-[30px] bg-red-200 px-4 py-2 font-bold leading-[19px] mt-8"
          >
            Cerrar
          </button>
    </div>
  );
};

export default ErrorMessage;
