import React, { useState } from "react";
import useUserStore from "../../store/useUserStore";
import PayWithQrModal from "../../components/modal/PayWithQrModal";
import { useNavigate } from "react-router-dom";

interface QRCodeScannerProps {
  onScan?: (amount: number) => void;
}

interface DataResponseDto {
  amount: number;
  description: string;
  id: string;
  receiverAccount: string;
  receiverName: string;
  receiverSurname: string;
  senderAccount: string;
  senderName: string | null;
  senderSurname: string | null;
  transactionDate: string;
  transactionStatus: string;
}

const API_URL = `${import.meta.env.VITE_API_URL}/api/pagos/cliente`;

const QRCodeScanner: React.FC<QRCodeScannerProps> = () => {
  const [newData, setNewData] = useState<DataResponseDto | null>(null);
  const [modalState, setModalState] = useState({
    isOpen: false,
    isSubmitting: false,
  });
  const navigate = useNavigate();

  const { user, token } = useUserStore();

  const handlePay = async () => {
    if (!user?.accountId || !token) return;
    setModalState({ isOpen: true, isSubmitting: true });
    try {
      const response = await fetch(`${API_URL}/${user.accountId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error en la respuesta de la red");
      }

      // filtramos el ultimo objeto del array
      const responseData = await response.json();
      const lastTransaction = responseData.slice(-1)[0];
      setNewData(lastTransaction);
    } catch (error) {
      console.error("Error durante la operación de fetch:", error);
    } finally {
      setModalState((prevState) => ({ ...prevState, isSubmitting: false }));
    }
  };

  const closeModal = () => {
    setModalState({ isOpen: false, isSubmitting: false });
  };

  return (
    <>
      {newData && modalState.isOpen && (
        <PayWithQrModal
          newData={newData}
          closeModal={closeModal}
          isLoading={modalState.isSubmitting}
        />
      )}
      <div className="mt-8 flex min-h-screen flex-col items-center justify-start gap-4">
        <div className="relative flex h-[592px] w-[312px] flex-col items-center justify-center rounded-[20px] bg-[#E1F0D7]">
          <p className="absolute top-6 w-[219px] text-center text-base font-semibold">
            Escaneá el código QR para poder pagarle al negocio
          </p>
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="relative h-40 w-40">
              <img
                src="./scan.gif"
                alt="scan"
                className="h-full w-full rounded-lg object-cover shadow-lg"
              />
            </div>
          </div>
        </div>

        <button
          className={`h-[42px] w-[312px] rounded-[20px] bg-[#8EC63F] text-[16px] font-semibold text-black transition-colors hover:bg-[#7db535] disabled:cursor-not-allowed`}
          onClick={handlePay}
        >
          {modalState.isSubmitting ? (
            <span className="flex items-center justify-center">
              <div className="mr-2 h-5 w-5 animate-spin rounded-full border-b-2 border-t-2 border-white"></div>
              Leyendo...
            </span>
          ) : (
            "Continuar"
          )}
        </button>

        <button
          className="h-[42px] w-[312px] rounded-[20px] bg-[#8EC63F] text-[16px] font-semibold text-black transition-colors hover:bg-[#7db535]"
          onClick={() => navigate("/dashboard")}
        >
          Volver
        </button>
      </div>
    </>
  );
};

export default QRCodeScanner;
