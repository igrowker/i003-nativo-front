import React, { useState } from "react";
import QRCode from "react-qr-code";
import useUserStore from "../../store/useUserStore";

interface QRPaymentResponse {
  id: string; // ID del pago
  receiverAccount: string; // Cuenta del receptor
  amount: number; // Monto a cobrar
  description?: string; // Descripción del pago
  qr?: string; // Código QR generado
}

interface QRGeneratorProps {
  dataForm: {
    receiverAccount: string;
    amount: number;
    description?: string;
  };
}

const QRGenerator: React.FC<QRGeneratorProps> = ({ dataForm }) => {
  const [amount, setAmount] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [qrCode, setQrCode] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [dataQr, setDataQr] = useState<QRPaymentResponse | null>(null);

  const token = useUserStore((state) => state.token);

  const handleGenerateQR = async () => {
    // Validación del monto
    const numericAmount = Number(amount);
    if (numericAmount <= 0 || isNaN(numericAmount)) {
      setError("Por favor, ingrese un monto válido mayor a 0");
      return;
    }

    setLoading(true);
    setError("");

    if (!token) {
      setLoading(false);
      setError("No autorizado. Por favor, inicie sesión.");
      return;
    }

    try {
      const response = await fetch(
        "https://i003-nativo-back-production.up.railway.app/api/pagos/crear-qr",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            receiverAccount: dataForm.receiverAccount,
            amount: Number(dataForm.amount),
            description: dataForm.description || "",
          }),
        },
      );

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error(
            "No autorizado. Por favor, verifique sus credenciales.",
          );
        } else if (response.status === 403) {
          throw new Error("Monto inválido o no permitido.");
        } else {
          throw new Error("Error al generar el código QR.");
        }
      }

      const data: QRPaymentResponse = await response.json();
      setDataQr(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al generar el código QR.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-2xl font-bold">Generar QR para Pago</h2>

      <div className="mb-4">
        <label
          htmlFor="amount"
          className="block text-sm font-medium text-gray-700"
        >
          Monto a cobrar
        </label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="0.00"
          step="0.01"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Descripción (opcional)
        </label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Descripción del pago"
        />
      </div>

      {error && (
        <div className="mb-4 rounded border border-red-400 bg-red-100 p-2 text-red-700">
          {error}
        </div>
      )}

      <button
        onClick={handleGenerateQR}
        disabled={loading}
        className="w-full rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
      >
        {loading ? "Generando..." : "Generar QR"}
      </button>

      {dataQr && (
        <div className="mt-6 flex flex-col items-center">
          <QRCode value={`./${dataQr.id}`} size={256} />
          <p className="mt-2 text-sm text-gray-500">
            Escanee este código QR para realizar el pago
          </p>
        </div>
      )}
    </div>
  );
};

export default QRGenerator;
