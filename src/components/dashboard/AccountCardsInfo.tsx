const AccountCardsInfo = () => {
  return (
    <>
      <h3 className="mb-7 text-start text-sm font-medium leading-4">
        Mis tarjetas
      </h3>
      <div className="relative h-[88px]">
        <div className="absolute left-0 top-0 h-[88px] w-[140px] rounded-[10px] bg-[#0177FF]"></div>
        <div className="absolute left-[45px] top-0 h-[88px] w-[140px] rounded-[10px] bg-[#252527] sm:left-[70px]"></div>
        <div className="absolute left-[90px] top-0 h-[88px] w-[140px] rounded-[10px] bg-[#AB7C36] sm:left-[140px]"></div>
        <div className="absolute left-[140px] top-0 h-[88px] w-[140px] rounded-[10px] bg-[#6D2B5D] sm:left-[210px]"></div>
      </div>
    </>
  );
};

export default AccountCardsInfo;
