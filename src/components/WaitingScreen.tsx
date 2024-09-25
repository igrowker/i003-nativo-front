const WaitingScreen = () => {
  return (
    <div className="flex flex-col items-center justify-between">
      <img src="./spinner.png" alt="spinner" className="spinner transform" />
      <p className="m-5 h-auto w-[260px] text-[20px] font-bold text-[#000000]">
        Aguardá un momento, estamos creando tu cuenta
      </p>
      <p className="text-[14px] font-semibold">
        Esto puede llevar unos minutos...
      </p>
      <button className="mt-32 h-[42px] w-[312px] rounded-[20px] bg-[#8EC63F] text-[16px] font-bold text-[#000000]">
        Terminar registro
      </button>
    </div>
  );
};

export default WaitingScreen;
