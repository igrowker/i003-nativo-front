import QRCode from "react-qr-code";

// Types
type PaymentData = {
  amount: number;
  description: string;
  id: string;
  qr: string;
  receiverAccount: string;
  receiverName: string;
  receiverSurname: string;
};

interface QRGeneratorProps {
  dataQr: PaymentData;
  numberWithCommas: (x: number) => string;
  setGenerateQr: (value: boolean) => void;
  success?: boolean;
  cleanInputs?: () => void;
}

function QRGenerator({
  dataQr,
  numberWithCommas,
  setGenerateQr,
  success,
  cleanInputs,
}: QRGeneratorProps) {
  /**
   * @info: Se crea un objeto con los datos del QR, pero sin el QR en sí debido a que la libreria QRCode me limita el uso de caracteres especiales
   */
  const qrData = {
    ...dataQr,
    qr: "",
  };

  // Función para volver a la pantalla anterior y limpiar los inputs del modal
  const handleReturn = () => {
    setGenerateQr(false);
    cleanInputs?.();
  };

  // Renderiza el botón según el estado "success"
  const renderButton = () => {
    const buttonProps = success
      ? { label: "Volver", color: "bg-[#8EC63F]", onClick: handleReturn }
      : {
          label: "Cancelar cobro",
          color: "bg-red-500",
          onClick: handleReturn,
        };

    return (
      <button
        className={`h-[42px] w-[312px] rounded-[20px] ${buttonProps.color} text-base font-semibold text-white transition-colors duration-200 hover:${buttonProps.color.replace(
          "500",
          "600",
        )} focus:outline-none focus:ring-2 focus:ring-offset-2`}
        onClick={buttonProps.onClick}
      >
        {buttonProps.label}
      </button>
    );
  };

  return (
    <div className="mt-8 flex min-h-screen flex-col items-center justify-start gap-4">
      <div className="relative flex h-[528px] w-[312px] flex-col items-center justify-center rounded-[20px] bg-[#E1F0D7]">
        <h2 className="absolute top-6 w-[154px] text-center text-base font-semibold">
          {success
            ? "¡Felicitaciones! EL cobro fue exitoso!"
            : "Mostrá este codigo QR para cobrar"}
        </h2>
        {success ? (
          <>
            <img src="./verified.png" alt="success" />
            <p className="text-center text-[14px] text-gray-700">
              Te pagaron $ {numberWithCommas(dataQr.amount)} <br />
              por {dataQr.description}
            </p>
          </>
        ) : (
          <div className="m-auto flex flex-col items-center justify-between gap-4">
            <QRCode
              value={JSON.stringify(qrData)}
              size={256}
              className="rounded-lg bg-white p-2"
            />

            <p className="text-sm text-gray-500">
              Escanee este código QR para realizar el pago
            </p>

            <div className="flex flex-col items-center justify-center text-center">
              {dataQr.description && (
                <p className="text-base font-semibold text-black">
                  {dataQr.description}
                </p>
              )}
              <p className="text-base font-semibold text-black">
                $ {numberWithCommas(dataQr.amount)}
              </p>
            </div>
          </div>
        )}
      </div>

      {renderButton()}
    </div>
  );
}

export default QRGenerator;
