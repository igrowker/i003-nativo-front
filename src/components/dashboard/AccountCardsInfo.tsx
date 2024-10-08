const AccountCardsInfo = () => {
  return (
    <>
      <h3 className="mb-4 text-start text-sm font-medium leading-4">
        Mis tarjetas
      </h3>
      <div className="relative h-[88px] w-full">
        <div className="absolute left-0 top-0 h-[88px] w-[140px] rounded-[10px] bg-[#0177FF]"></div>
        <div className="absolute left-[10%] top-0 h-[88px] w-[140px] rounded-[10px] bg-[#252527] sm:left-[20%]"></div>
        <div className="absolute left-[20%] top-0 h-[88px] w-[140px] rounded-[10px] bg-[#AB7C36] sm:left-[40%]"></div>
        <div className="absolute left-[30%] top-0 h-[88px] w-[140px] rounded-[10px] bg-[#6D2B5D] sm:left-[60%]"></div>
      </div>
    </>
  );
};

export default AccountCardsInfo;
