import React from "react";

interface ToastProps {
  verificationCode: string;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ verificationCode, onClose }) => {
  // Hace que el Toast se cierre al hacer click fuera de él
  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-[#E1F0D7] bg-opacity-[60%]"
      onClick={handleClickOutside}
    >
      <div className="absolute top-40 flex h-[95px] w-[310px] animate-slide-down items-center justify-center">
        <div className="rounded-lg border-[8px] border-[#8EC63F] bg-[#E1F0D7] p-3">
          <p className="text-start text-[12px] font-normal text-black">
            Tu código de asociación es{" "}
            <span className="font-bold">{verificationCode}</span>. Nunca te
            pediremos este dato por teléfono u otro medio. No lo compartas.{" "}
            <strong>NATIVO</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Toast;
