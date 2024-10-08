import React, { useState, useRef, useEffect } from "react";
import useUserStore from "../../store/useUserStore";

interface QRCodeScannerProps {
  onScan?: (amount: number) => void;
}

const QRCodeScanner: React.FC<QRCodeScannerProps> = () => {
  const [scannedData, setScannedData] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { user, token } = useUserStore();

  const handleScan = () => {
    // In a real application, this would use the device's camera to scan the QR code
    // For this example, we'll simulate scanning by parsing the input as JSON
    try {
      const parsedData = JSON.parse(scannedData);
      if (parsedData.amount && typeof parsedData.amount === "number") {
        // onScan(parsedData.amount);
      } else {
        alert("Invalid QR code data");
      }
    } catch (error) {
      alert("Error parsing QR code data");
    }
  };

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          let video = videoRef.current;
          if (video) {
            video.srcObject = stream;
            video.play();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const captureImage = () => {
    let canvas = canvasRef.current;
    let video = videoRef.current;
    if (canvas && video) {
      let context = canvas.getContext("2d");
      if (context) {
        context.drawImage(video, 0, 0, 640, 480);
        let data = canvas.toDataURL("image/png");
        // props.onCapture(data);
      }
    }
  };

  console.log("user", user?.accountId);

  const handlePay = async () => {
    try {
      const response = await fetch(
        `https://i003-nativo-back-production.up.railway.app/api/cliente/${user?.accountId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  return (
    <div className="mt-8 flex min-h-screen flex-col items-center justify-start gap-4">
      <div className="relative flex h-[592px] w-[312px] flex-col items-center justify-center rounded-[20px] bg-[#E1F0D7]">
        <p className="absolute top-6 w-[219px] text-center text-base font-semibold">
          Escaneá el código QR para poder pagarle al negocio
        </p>
        <div className="flex flex-col items-center justify-center gap-4">
          <div>
            <video ref={videoRef} width="640" height="480" />
            <canvas
              ref={canvasRef}
              width="640"
              height="480"
              style={{ display: "none" }}
            />
          </div>
        </div>
      </div>

      <button
        className={`h-[42px] w-[312px] rounded-[20px] bg-[#8EC63F] text-[16px] font-semibold text-black transition-colors hover:bg-[#7db535] disabled:cursor-not-allowed`}
        onClick={handlePay}
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center">
            <div className="mr-2 h-5 w-5 animate-spin rounded-full border-b-2 border-t-2 border-white"></div>
            Cargando...
          </span>
        ) : (
          "Continuar"
        )}
      </button>
    </div>
  );
};

export default QRCodeScanner;
