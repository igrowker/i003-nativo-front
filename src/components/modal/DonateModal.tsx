import React, { useState, useEffect } from "react"; // Asegúrate de importar useEffect
import { Link } from "react-router-dom";
import { User } from "../../interfaces/User";
import useUserStore from "../../store/useUserStore";
import MoneyInput from "./MoneyInput";
import LoadingContent from "./LoadingContent";
import SuccessContent from "./SuccessContent";
import ErrorContent from "./ErrorContent";
import { FaUser } from "react-icons/fa6";
import donationService from "../../services/donationService";

export const DonateModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const user: User | null = useUserStore((store) => store.user);
  const accountId: string | null = user?.accountId ?? null;
  const [amount, setAmount] = useState<number | string>("");
  const [receiver, setReceiver] = useState<string | null>("");
  const [isAnonymousDonation, setIsAnonymousDonation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSetAnonymousDonation = () => {
    setIsAnonymousDonation(!isAnonymousDonation);
  };

  const handleContinue = async () => {
    const numericAmount =
      typeof amount === "string" ? parseFloat(amount) : amount;

    if (numericAmount <= 0 || accountId == null || receiver == null) return;

    setIsLoading(true);
    setErrorMessage(null);

    const result = await donationService.createDonation(
      receiver,
      isAnonymousDonation,
      numericAmount,
    );

    if (result.success) {
      setIsSuccess(true);
    } else if (result.error) {
      setIsSuccess(false);
      setErrorMessage(result.error);
    }

    setIsLoading(false);
  };

  useEffect(() => {}, [errorMessage]);

  if (!user) return null;

  let content;
  if (isLoading) {
    content = (
      <LoadingContent
        title="Procesando la solicitud..."
        sender="Mi cuenta nativo"
        receiver={receiver || ""}
      />
    );
  } else if (isSuccess === true) {
    content = (
      <>
        <SuccessContent
          title="¡Solicitud de donación realizada!"
          sender="Mi cuenta nativo"
          receiver={receiver || ""}
          amount={amount.toString()}
        />
        <div className="mt-4 flex gap-4">
          <Link
            to="/history"
            className="w-full rounded-[30px] bg-white px-4 py-2 text-center font-bold leading-[19px]"
          >
            Ver historial
          </Link>
          <button
            onClick={onClose}
            className="w-full rounded-[30px] bg-white px-4 py-2 font-bold leading-[19px]"
          >
            Cerrar
          </button>
        </div>
      </>
    );
  } else if (errorMessage) {
    content = (
      <>
        <ErrorContent
          error={errorMessage}
          sender="Mi cuenta nativo"
          receiver={receiver || ""}
          amount={amount.toString()}
        />
        <button
          onClick={onClose}
          className="w-full rounded-[30px] bg-white px-4 py-2 font-bold leading-[19px]"
        >
          Cerrar
        </button>
      </>
    );
  } else {
    content = (
      <>
        <h2 className="text-xl font-bold leading-6 text-light-grey">
          Donar dinero
        </h2>
        <div className="flex gap-2 rounded-[20px] border border-secondary-green bg-light-grey p-3 drop-shadow-box">
          <div className="flex size-12 items-center justify-center rounded-full bg-light-green">
            <FaUser />
          </div>
          <div className="w-3/4">
            <p className="font-bold">Para</p>
            <input
              type="text"
              onChange={(e) => setReceiver(e.target.value)}
              className="w-full rounded-[20px] border-2 border-light-green px-2 py-1"
            />
          </div>
        </div>
        <div className="mb-2 flex gap-2 rounded-[20px] border border-secondary-green bg-light-grey p-3 drop-shadow-box">
          <div className="flex size-12 items-center justify-center rounded-full bg-light-green">
            {user?.name.charAt(0) + user?.surname.charAt(0)}
          </div>
          <div>
            <p className="font-bold">Desde</p>
            <p>Mi cuenta Nativo</p>
          </div>
        </div>
        <MoneyInput amount={amount} setAmount={setAmount} />
        <p className="mt-[-10px] text-sm text-white">Monto mínimo: $100.</p>
        <label className="flex items-center gap-1 text-sm text-light-green">
          <input
            type="checkbox"
            checked={isAnonymousDonation}
            onChange={handleSetAnonymousDonation}
            className="size-4"
          />
          Quiero que mi donación sea anónima.
        </label>
        <div className="mt-6 flex gap-4">
          <button
            onClick={onClose}
            className="w-full rounded-[30px] bg-white px-4 py-2 font-bold leading-[19px]"
          >
            Cerrar
          </button>
          <button
            onClick={handleContinue}
            className="w-full rounded-[30px] bg-white px-4 py-2 font-bold leading-[19px] disabled:opacity-65"
            disabled={
              amount === "" ||
              parseFloat(amount.toString()) < 100 ||
              receiver == null
            }
          >
            Continuar
          </button>
        </div>
      </>
    );
  }

  return <>{content}</>;
};
