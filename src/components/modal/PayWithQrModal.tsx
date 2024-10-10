import React, { useState } from "react";
import useUserStore from "../../store/useUserStore";
import { statusOptions } from "../../utils/statusOptions";

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

interface PayWithQrModalProps {
  newData: DataResponseDto;
  closeModal: () => void;
}

const API_URL = `${import.meta.env.VITE_API_URL}/api/pagos/pagar-qr`;

const PayWithQrModal: React.FC<PayWithQrModalProps> = ({
  newData,
  closeModal,
}) => {
  const [paymentStatus, setPaymentStatus] = useState({
    isProcessing: false,
    isSuccess: false,
    error: null as string | null,
  });

  const acceptedStatus = statusOptions.find(
    (option) => option.value === "ACCEPTED",
  );

  const token = useUserStore((store) => store.token);
  const user = useUserStore((store) => store.user);

  const handlePay = async () => {
    if (!token) {
      console.error("El token es necesario para realizar la operación.");
      return;
    }

    // Iniciar la pantalla de procesamiento
    setPaymentStatus({
      isProcessing: true,
      isSuccess: false,
      error: null,
    });

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: newData.id,
          senderAccount: user?.accountId,
          transactionStatus: acceptedStatus?.value,
        }),
      });

      if (!response.ok) {
        const errorMsg = response.status === 400 ? await response.json() : {};
        setPaymentStatus({
          isProcessing: false,
          isSuccess: false,
          error:
            errorMsg.message || "Hubo un error al intentar realizar el pago.",
        });
        return;
      }

      const result = await response.json();

      // Si el pago es exitoso, actualizamos el estado de la UI
      if (result.transactionStatus === acceptedStatus?.value) {
        setPaymentStatus({
          isProcessing: false,
          isSuccess: true,
          error: null,
        });
        return result;
      }

      throw new Error("Transacción no aceptada.");
    } catch (error) {
      handleError("Hubo un error al intentar realizar el pago.");
    } finally {
      setPaymentStatus((prevState) => ({ ...prevState, isProcessing: false }));
    }
  };

  // Función para manejar errores
  const handleError = (message: string) => {
    setPaymentStatus({ isProcessing: false, isSuccess: false, error: message });
    console.error(message);
  };

  // UseEffect para limpiar el mensaje de error después de 3 segundos
  React.useEffect(() => {
    if (paymentStatus.error) {
      const timer = setTimeout(() => {
        setPaymentStatus((prevState) => ({ ...prevState, error: null }));
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [paymentStatus.error]);

  return (
    <>
      {newData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
          <div className="relative h-auto w-full max-w-md rounded-[40px] bg-[#8EC63F] p-6 shadow-lg">
            {paymentStatus.error && (
              <div
                className="relative w-full rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
                role="alert"
              >
                <span className="block sm:inline">{paymentStatus.error}</span>
              </div>
            )}
            {paymentStatus.isProcessing || paymentStatus.isSuccess ? (
              <>
                <div className="flex h-auto flex-col items-center justify-center rounded-[30px] bg-white">
                  <p className="mt-6 text-[20px] font-bold">
                    {!paymentStatus.isSuccess
                      ? "Procesando tu pago..."
                      : "¡Pago realizado!"}
                  </p>
                  {!paymentStatus.isSuccess && (
                    <img
                      src={"/spinner.png"}
                      alt="spinner"
                      className="spinner mt-6 transform"
                      width={90}
                      height={90}
                    />
                  )}

                  {paymentStatus.isSuccess && (
                    <div className="mt-6 flex h-[144px] w-[144px] items-center justify-center rounded-full bg-[#E1F0D7]">
                      <img src="./verified.png" alt="verified-img" />
                    </div>
                  )}

                  <div className="w-full">
                    <div className="m-4 flex flex-col items-start justify-between rounded-[20px] bg-[#E1F0D7] p-4">
                      <div className="text-lg font-semibold text-black">
                        Para
                      </div>
                      <div>{newData.receiverName}</div>
                    </div>

                    <div className="m-4 flex flex-col items-start justify-between rounded-[20px] bg-[#E1F0D7] p-4">
                      <div className="text-lg font-semibold text-black">
                        Desde
                      </div>
                      <div>Mi cuenta nativo</div>
                    </div>
                  </div>
                </div>

                <div className="m-2 flex items-center justify-center gap-4">
                  <button className="h-[38px] w-[130px] rounded-[30px] bg-white text-[16px] font-semibold">
                    Historial
                  </button>
                  <button
                    className="h-[38px] w-[130px] rounded-[30px] bg-white text-[16px] font-semibold"
                    onClick={closeModal}
                  >
                    Cerrar
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2 className="mb-4 text-[20px] font-semibold text-white">
                  Pagar con QR
                </h2>
                <div className="space-y-4">
                  <div className="flex flex-col items-start justify-between rounded-[20px] bg-[#F6FAFD] p-4">
                    <div className="text-lg font-semibold text-black">Para</div>
                    <div>{newData.receiverName}</div>
                  </div>
                  <div className="flex flex-col items-start justify-between rounded-[20px] bg-[#F6FAFD] p-4">
                    <div className="text-lg font-semibold text-black">
                      Motivo
                    </div>
                    <div>{newData.description}</div>
                  </div>

                  <div className="flex flex-col items-start justify-between rounded-[20px] bg-[#F6FAFD] p-4">
                    <div className="text-lg font-semibold text-black">
                      Desde
                    </div>
                    <div>Mi cuenta nativo</div>
                  </div>

                  <div className="flex items-center justify-center rounded-[20px] bg-[#F6FAFD] p-4 text-[36px] font-bold">
                    ${newData.amount}
                  </div>
                </div>

                <button
                  className="text[16px] mt-6 w-full rounded-lg bg-[#F6FAFD] py-3 font-bold text-black transition duration-300 hover:bg-[#4e6e21] hover:text-white"
                  onClick={handlePay}
                >
                  Pagar
                </button>
                <button
                  className="text[16px] mt-6 w-full rounded-lg bg-[#F6FAFD] py-3 font-bold text-black transition duration-300 hover:bg-[#4e6e21] hover:text-white"
                  onClick={closeModal}
                >
                  Cancelar
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default PayWithQrModal;
