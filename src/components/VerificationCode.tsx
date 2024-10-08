import { useState, useRef, useEffect } from "react";
import logonativo from "/logonativo.png";
import useUserStore from "../store/useUserStore";
import { useNavigate } from "react-router-dom";
import Toast from "./ui/Toast";

const VerificationCode = () => {
  const [values, setValues] = useState<string[]>(Array(6).fill(""));
  const [timer, setTimer] = useState<number>(5);
  const [message, setMessage] = useState<string>("");
  const [userVerified, setUserVerified] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messageButton, setMessageButton] =
    useState<string>("Verificar código");
  const [showToast, setShowToast] = useState<boolean>(true);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const navigate = useNavigate();

  const setVerificationCode = useUserStore(
    (state) => state.setVerificationCode,
  );
  const verifyCode = useUserStore((state) => state.verifyCode);
  const verificationCode = useUserStore((state) => state.verificationCode);
  const user = useUserStore((state) => state.user);
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => Math.max(prev - 1, 0)); // Asegurar que no baje de 0
      }, 1000);

      // Limpiar el intervalo cuando el componente se desmonte o cuando el temporizador llega a 0
      return () => clearInterval(interval);
    }
  }, [timer]);

  if (!user || !verificationCode) {
    navigate("/register");
    return;
  }

  const handleCloseToast = () => {
    setShowToast(false);
  };

  // Solicitud GET
  const handleResend = async () => {
    try {
      setMessage("");
      setTimer(5);
      const response = await fetch(
        `https://i003-nativo-back-production.up.railway.app/api/autenticacion/reenvio-codigo?email=${user?.email}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      768767;

      if (response.ok) {
        const result = await response.text();
        const parsedResult = JSON.parse(result);
        setVerificationCode(parsedResult.verificationCode); // Actualizar el código de verificación
        setShowToast(true);
      } else if (response.status === 400) {
        setMessage("La cuenta ya se encuentra verificada.");
      } else {
        setMessage("Ocurrió un error al reenviar el código.");
      }
    } catch (error) {
      setMessage("Ocurrió un error de red.");
    }
  };

  const handleChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newValue = event.target.value;
    if (!/^\d*$/.test(newValue)) return; // Solo permitir números

    const newValues = [...values];
    newValues[index] = newValue;
    setValues(newValues);

    // Mover el enfoque al siguiente input si se ingresó un número
    if (newValue && index < values.length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    // Retroceder al campo anterior si se presiona 'Backspace' y el campo está vacío
    if (event.key === "Backspace" && !values[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleVerify = async (): Promise<void> => {
    const inputCode = values.join("");
    setIsLoading(true);
    setMessageButton("Enviando...");
    if (inputCode.length < 6) {
      setMessage("Debes ingresar el código completo.");
      setIsLoading(false);
      setMessageButton("Verificar código");
      return;
    }

    const verified = await verifyCode(inputCode);
    if (verified) {
      setMessage("Código verificado con éxito.");
      setUserVerified(true);
    } else {
      setMessage("Código incorrecto.");
    }
    setIsLoading(false);
    setMessageButton("Verificar código");
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center gap-5 p-[1rem] text-center">
      <img
        src={logonativo}
        alt="logo"
        className="flex h-[197px] w-[197px] items-center justify-center"
      />
      {message && (
        <div className="rounded-md bg-green-500 p-2 text-white">{message}</div>
      )}
      {userVerified && (
        <h1 className="text-[28px] font-bold text-[#000000]">
          Cuenta verificada con éxito
        </h1>
      )}
      {!userVerified && (
        <>
          {showToast && (
            <Toast
              verificationCode={verificationCode}
              onClose={handleCloseToast}
            />
          )}
          <div className="flex flex-col items-center justify-center gap-10">
            <h1 className="w-[232px] text-[22px] font-bold text-[#000000]">
              Ingresá el código que te enviamos al email
            </h1>

            <p className="text-[16px]">{user?.email}</p>
            <div style={{ display: "flex", gap: "10px" }}>
              {values.map((value, index) => (
                <input
                  key={index}
                  ref={(el) => (inputsRef.current[index] = el)}
                  type="text"
                  maxLength={1}
                  value={value}
                  onChange={(e) => handleChange(index, e)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  style={{
                    width: "40px",
                    height: "40px",
                    textAlign: "center",
                    fontSize: "24px",
                    borderRadius: "6px",
                    border: "1px solid #D9D9D9",
                    backgroundColor: "#E8F5E9",
                  }}
                />
              ))}
            </div>

            <p className={`text-[#ADADAD] ${timer === 0 ? "hidden" : ""}`}>
              Reenviar código (00:{timer.toString().padStart(2, "0")})
            </p>
            {timer === 0 && (
              <button
                onClick={handleResend}
                className="text-[#0000EE] underline"
              >
                Reenviar código
              </button>
            )}
          </div>
          <button
            className={`h-[42px] w-[312px] rounded-[20px] ${values.some((value) => !value) ? "cursor-not-allowed bg-slate-400 text-[#faf8f8]" : "bg-[#8EC63F]"} mt-10 text-[16px] font-bold text-[#000000]`}
            onClick={handleVerify}
            disabled={values.some((value) => !value)}
          >
            {isLoading ? "Enviando..." : messageButton}
          </button>
        </>
      )}

      {userVerified && (
        <div className="flex h-[400px] flex-col items-center justify-between">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex h-[144px] w-[144px] items-center justify-center rounded-full bg-[#E1F0D7]">
              <img src="./verified.png" alt="verified-img" />
            </div>
            <h1 className="h-auto w-[199px] text-[20px] font-bold text-[#000000]">
              ¡Muy bien! Verificamos tu cuenta con éxito
            </h1>
          </div>
          <button
            className="h-[42px] w-[312px] rounded-[20px] bg-[#8EC63F] text-[16px] font-bold text-[#000000]"
            onClick={() => navigate("/dashboard")}
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
};

export default VerificationCode;
