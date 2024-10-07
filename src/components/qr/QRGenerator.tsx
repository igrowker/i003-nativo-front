import QRCode from "react-qr-code";
import { useState } from "react";

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
}

function QRGenerator({
  dataQr,
  numberWithCommas,
  setGenerateQr,
}: QRGeneratorProps) {
  const [success] = useState(true);

  const qrData = {
    ...dataQr,
    qr: "",
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

      {success ? (
        <button
          className="h-[42px] w-[312px] rounded-[20px] bg-[#8EC63F] text-base font-semibold text-white transition-colors duration-200 hover:bg-[#7db535] focus:outline-none focus:ring-2 focus:ring-[#8EC63F] focus:ring-offset-2"
          onClick={() => setGenerateQr(false)}
        >
          Volver
        </button>
      ) : (
        <button
          className="h-[42px] w-[312px] rounded-[20px] bg-red-500 text-base font-semibold text-white transition-colors duration-200 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          onClick={() => setGenerateQr(false)}
        >
          Cancelar cobro
        </button>
      )}
    </div>
  );
}

export default QRGenerator;
