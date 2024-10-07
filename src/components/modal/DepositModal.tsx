import React, { useState } from "react";
import { Link } from "react-router-dom";
import { User } from "../../interfaces/User";
import useUserStore from "../../store/useUserStore";
import accountService from "../../services/accountService";
import MoneyInput from "./MoneyInput";
import LoadingContent from "./LoadingContent";
import SuccessContent from "./SuccessContent";
import ErrorContent from "./ErrorContent";

export const DepositModal: React.FC<{
  onCloseOk: () => void;
  onClose: () => void;
}> = ({ onCloseOk, onClose }) => {
  const user: User | null = useUserStore((store) => store.user);
  const accountId: string | null = user?.accountId ?? null;
  const [amount, setAmount] = useState<number | string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleContinue = async () => {
    const numericAmount =
      typeof amount === "string" ? parseFloat(amount) : amount;

    if (numericAmount <= 0 || accountId == null) return;

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const accountData = await accountService.addMoneyToAccount(
        accountId,
        numericAmount,
      );
      console.log("Dinero agregado a la cuenta:", accountData);
      setIsSuccess(true);
    } catch (error) {
      setErrorMessage("Ocurrió un error al agregar dinero.");
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) return null;

  let content;
  if (isLoading) {
    content = (
      <LoadingContent
        title="Procesando el pago..."
        sender="Mi cuenta externa"
        receiver="Mi cuenta nativo"
      />
    );
  } else if (isSuccess === true) {
    content = (
      <>
        <SuccessContent
          title="¡Ingreso realizado!"
          sender="Mi cuenta externa"
          receiver="Mi cuenta nativo"
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
            onClick={onCloseOk}
            className="w-full rounded-[30px] bg-white px-4 py-2 font-bold leading-[19px]"
          >
            Cerrar
          </button>
        </div>
      </>
    );
  } else if (errorMessage) {
    content = (
      <ErrorContent
        error="¡Ingreso realizado!"
        sender="Mi cuenta externa"
        receiver="Mi cuenta nativo"
        amount={amount.toString()}
      />
    );
  } else {
    content = (
      <>
        <h2 className="text-xl font-bold leading-6 text-light-grey">
          Depositar Dinero
        </h2>
        <div className="flex gap-2 rounded-[20px] border border-secondary-green bg-light-grey p-3 drop-shadow-box">
          <div className="flex size-12 items-center justify-center rounded-full bg-light-green">
            {user?.name.charAt(0) + user?.surname.charAt(0)}
          </div>
          <div>
            <p className="font-bold">Para</p>
            <p>Mi cuenta Nativo</p>
          </div>
        </div>
        <div className="mb-2 flex gap-2 rounded-[20px] border border-secondary-green bg-light-grey p-3 drop-shadow-box">
          <div className="flex size-12 items-center justify-center rounded-full bg-light-green">
            {user?.name.charAt(0) + user?.surname.charAt(0)}
          </div>
          <div>
            <p className="font-bold">Desde</p>
            <p>Mi cuenta externa</p>
          </div>
        </div>
        <MoneyInput amount={amount} setAmount={setAmount} />
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
            disabled={amount === "" || parseFloat(amount.toString()) <= 0}
          >
            Continuar
          </button>
        </div>
      </>
    );
  }

  return <>{content}</>;
};
