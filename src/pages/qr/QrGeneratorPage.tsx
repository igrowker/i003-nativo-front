import { useState, useEffect } from "react";
import QRGenerator from "../../components/qr/QRGenerator";
import useUserStore from "../../store/useUserStore";
import { statusOptions } from "../../utils/statusOptions";
import { useNavigate } from "react-router-dom";

// Types
type QRPaymentResponse = {
  amount: number;
  description: string;
  id: string;
  qr: string;
  receiverAccount: string;
  receiverName: string;
  receiverSurname: string;
};

type QRFormData = {
  amount: number;
  receiverAccount: string;
  description?: string;
};

// Constants
const API_URL = `${import.meta.env.VITE_API_URL}/api/pagos/crear-qr-id`;

// Utility functions
const formatNumber = (x: number): string =>
  x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const QrGeneratorPage = () => {
  // State
  const [formData, setFormData] = useState<QRFormData>({
    amount: 0,
    receiverAccount: "",
    description: "",
  });
  const [qrResponse, setQrResponse] = useState<QRPaymentResponse | null>(null);
  const [loading, setLoading] = useState({
    isLoading: true,
    isSubmitting: false,
  });
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [error, setError] = useState("");
  const [isUserReady, setIsUserReady] = useState(false);
  const [isPaymentApproved, setIsPaymentApproved] = useState(false);

  const navigate = useNavigate();

  // Store
  const { user, token } = useUserStore();

  const acceptedStatus = statusOptions.find(
    (option) => option.value === "ACCEPTED",
  );

  // Efecto para obtener la cuenta del usuario
  useEffect(() => {
    if (user?.accountId) {
      setFormData((prev) => ({
        ...prev,
        receiverAccount: user.accountId || "",
      }));
      setLoading((prev) => ({ ...prev, isLoading: false }));
      setIsUserReady(true);
    } else {
      const interval = setInterval(() => {
        if (user?.accountId) {
          setFormData((prev) => ({
            ...prev,
            receiverAccount: user.accountId || "",
          }));
          setLoading((prev) => ({ ...prev, isLoading: false }));
          setIsUserReady(true);
          clearInterval(interval);
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, [user]);

  // Handlers
  const handleGenerateQR = async () => {
    // Restablecer el estado de aprobación de pago antes de generar un nuevo QR
    setIsPaymentApproved(false);
    setError("");

    if (!isUserReady)
      return setError("No se pudo obtener la información del usuario.");
    if (formData.amount <= 0)
      return setError("Por favor, ingrese un monto válido mayor a 0.");
    if (!token) return setError("No autorizado. Por favor, inicie sesión.");

    setLoading((prev) => ({ ...prev, isSubmitting: true }));

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          senderAccount: "3b97d5df-9bd8-47d2-9144-fc5ac39b11e0", //hardcodeamos el senderAccount
          ...formData,
        }),
      });

      if (!response.ok) {
        throw new Error(
          response.status === 401
            ? "No autorizado. Por favor, verifique sus credenciales."
            : response.status === 403
              ? "Monto inválido o no permitido."
              : "Error al generar el código QR.",
        );
      }

      const data: QRPaymentResponse = await response.json();
      setQrResponse(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al generar el código QR.",
      );
    } finally {
      setLoading((prev) => ({ ...prev, isSubmitting: false }));
    }
  };

  // Handler para envío de formulario
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isUserReady)
      return setError("No se pudo obtener la información del usuario.");

    const form = new FormData(e.currentTarget);
    setFormData({
      receiverAccount: user?.accountId as string,
      amount: Number(form.get("amount")),
      description: form.get("description") as string,
    });
    setIsDetailsOpen(false);
  };

  // Efecto para verificar si el QR ya fue pagado
  useEffect(() => {
    if (qrResponse && !isPaymentApproved) {
      const intervalId = setInterval(async () => {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/pagos/id/${qrResponse.id}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            },
          );
          if (!response.ok)
            throw new Error("Error en la respuesta del servidor");

          const result = await response.json();
          if (result.transactionStatus === acceptedStatus?.value) {
            setIsPaymentApproved(true);
            clearInterval(intervalId);
          }
        } catch (error) {
          console.error("Error al verificar el pago del QR:", error);
        }
      }, 5000);
      return () => clearInterval(intervalId);
    }
  }, [qrResponse, token, isPaymentApproved]);

  // Función para limpiar inputs
  const cleanInputs = () =>
    setFormData({ amount: 0, receiverAccount: "", description: "" });

  if (loading.isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="mt-8 flex min-h-screen flex-col items-center justify-start gap-4">
      <h3 className="text-xl font-bold">Cobrá con QR</h3>

      {error && (
        <div
          className="relative w-[312px] rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
          role="alert"
        >
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {qrResponse ? (
        <QRGenerator
          dataQr={qrResponse}
          numberWithCommas={formatNumber}
          setGenerateQr={() => setQrResponse(null)}
          success={isPaymentApproved}
          cleanInputs={cleanInputs}
        />
      ) : (
        <>
          <div className="relative flex h-[528px] w-[312px] flex-col items-center justify-center rounded-[20px] bg-[#E1F0D7]">
            <p className="absolute top-6 text-base font-semibold">
              Ingresá el monto a cobrar
            </p>
            <div className="mt-4 flex w-4/5 justify-center border-b border-black">
              <p className="text-4xl font-semibold">
                $ {formatNumber(formData.amount)}
              </p>
            </div>
            <button
              className="mt-6 flex items-center gap-2 rounded-md p-2 text-xs transition-colors hover:bg-[#d1e0c7]"
              onClick={() => setIsDetailsOpen(true)}
            >
              <img src="./pencil.png" alt="pen" className="h-4 w-4" /> Detalles
            </button>
          </div>

          <button
            className={`h-[42px] w-[312px] rounded-[20px] text-black ${formData.amount > 0 ? "bg-[#8EC63F] hover:bg-[#7db535]" : "bg-[#C7C7C7]"} text-[16px] font-semibold transition-colors disabled:cursor-not-allowed`}
            disabled={formData.amount <= 0 || loading.isSubmitting}
            onClick={handleGenerateQR}
          >
            {loading.isSubmitting ? (
              <span className="flex items-center justify-center">
                <div className="mr-2 h-5 w-5 animate-spin rounded-full border-b-2 border-t-2 border-white"></div>
                Cargando...
              </span>
            ) : (
              "Generar código QR"
            )}
          </button>

          <button
            className="h-[42px] w-[312px] rounded-[20px] bg-[#8EC63F] p-2 text-black transition-colors hover:bg-[#7db535]"
            onClick={() => navigate("/dashboard")}
          >
            Volver
          </button>

          {isDetailsOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="w-[232px] rounded-[20px] bg-white p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-[14px] font-bold">Detalles</h3>
                  <button
                    onClick={() => setIsDetailsOpen(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>
                <form
                  onSubmit={handleFormSubmit}
                  className="flex flex-col gap-4"
                >
                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor="amount"
                      className="text-xs font-medium text-gray-700"
                    >
                      Monto a cobrar
                    </label>
                    <input
                      type="number"
                      name="amount"
                      id="amount"
                      defaultValue={formData.amount}
                      placeholder="0.00"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor="description"
                      className="text-xs font-medium text-gray-700"
                    >
                      Motivo (opcional)
                    </label>
                    <input
                      type="text"
                      name="description"
                      id="description"
                      defaultValue={formData.description}
                      placeholder="Descripción del pago"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="mt-10 w-full rounded-md bg-[#8EC63F] p-2 text-black transition-colors hover:bg-[#7db535]"
                  >
                    Listo
                  </button>
                </form>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default QrGeneratorPage;
