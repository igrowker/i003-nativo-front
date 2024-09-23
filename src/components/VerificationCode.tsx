import { useState, useRef, useEffect } from "react";
import WaitingScreen from "./WaitingScreen";
import logonativo from "/logonativo.png";

const VerificationCode = () => {
  const [values, setValues] = useState<string[]>(["", "", "", "", "", ""]);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const [timer, setTimer] = useState<number>(60); // Temporizador de 60 segundos para reenviar el código
  const [message, setMessage] = useState<string>(""); // Mensaje de éxito o error
  const [userVerified, setUserVerified] = useState<boolean>(true);
  const [next, setNext] = useState<boolean>(false);
  const userEmail = "usuarionativo@gmail.com"; // Este es el correo que se utilizará en la API (luego se cambiará por el correo del usuario registrado)

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => Math.max(prev - 1, 0)); // Asegurar que no baje de 0
      }, 1000);

      // Limpiar el intervalo cuando el componente se desmonte o cuando el temporizador llega a 0
      return () => clearInterval(interval);
    }
  }, [timer]);

  // Función que reinicia el temporizador a 60 segundos y hace la solicitud GET
  const handleResend = async () => {
    try {
      setMessage("");
      setTimer(60);

      const response = await fetch(
        `http://localhost:8080/api/autenticacion/reenvio-codigo?email=${userEmail}`,
        {
          method: "GET",
        },
      );

      if (response.ok) {
        const result = await response.text();
        setMessage(result); // Mostrar mensaje de éxito
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

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-5 p-[1rem] text-center">
      <img
        src={logonativo}
        alt="logo"
        className="flex h-[197px] w-[197px] items-center justify-center"
      />

      {!userVerified && (
        <>
          <h1 className="w-[232px] text-[22px] font-bold text-[#000000]">
            Ingresá el código que te enviamos al email
          </h1>
          <p className="text-[16px]">{userEmail}</p>
          <div style={{ display: "flex", gap: "10px" }}>
            {values.map((value, index) => (
              <input
                key={index}
                ref={(el) => (inputsRef.current[index] = el)}
                type="text"
                maxLength={1} // Limitar a un solo caracter por input
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
                  backgroundColor: "#E8F5E9", // Color de fondo similar a la imagen
                }}
              />
            ))}
          </div>
          <p className={`text-[#ADADAD] ${timer === 0 ? "hidden" : ""}`}>
            Reenviar código (00:{timer.toString().padStart(2, "0")})
          </p>
          {timer === 0 && (
            <button onClick={handleResend} className="text-[#0000EE] underline">
              Reenviar código
            </button>
          )}
          {message && <p className="mt-3 text-red-500">{message}</p>}
        </>
      )}

      {userVerified && !next && (
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
            onClick={() => setNext(true)}
          >
            Siguiente
          </button>
        </div>
      )}

      {next && <WaitingScreen />}
    </div>
  );
};

export default VerificationCode;
