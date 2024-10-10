import { formatDate } from "../../helpers/formDate";
import { Microcredit } from "../../interfaces/Microcredit";

const SeeMore: React.FC<{
  title: string;
  microcredit: Microcredit;
  closeSeeMoreModal: () => void;
}> = ({ title,  microcredit, closeSeeMoreModal }) => {

   return (
    <div className="absolute left-0 top-0 z-20 my-2 flex w-[70%] translate-x-[22%] translate-y-[70%] flex-col items-center gap-2 rounded-[20px] border border-secondary-green bg-light-grey p-6 drop-shadow-box">
      <article className="w-full">
        <h2 className="mb-8 text-center font-semibold">{title}</h2>
        <div className="flex flex-row items-end justify-between text-xs">
          <p className="w-auto">Motivo</p>
          <hr className="flex-1" />
          <p className="max-w-40 truncate">{microcredit.title}</p>
        </div>
        <div className="flex flex-row items-end justify-between text-xs">
          <p className="w-auto">Monto</p>
          <hr className="flex-1" />
          <p>${microcredit.amount}</p>
        </div>
        <div className="flex flex-row items-end justify-between text-xs">
          <p className="w-auto">Cantidad restante</p>
          <hr className="flex-1" />
          <p>${microcredit.remainingAmount}</p>
        </div>
        <div className="flex flex-row items-end justify-between text-xs">
          <p className="w-auto">Tasa fija</p>
          <hr className="flex-1" />
          <p>20%</p>
        </div>
        <div className="flex flex-row items-end justify-between text-xs">
          <p className="w-auto">No. contribuciones</p>
          <hr className="flex-1" />
          <p>{microcredit.contributions.length}</p>
        </div>
        <div className="flex flex-row items-end justify-between text-xs">
          <p className="w-auto">Fecha de solicitud</p>
          <hr className="flex-1" />
          <p>{formatDate(microcredit.createdDate)}</p>
        </div>
        <div className="flex flex-row items-end justify-between text-xs">
          <p className="w-auto">Fecha de vencimiento</p>
          <hr className="flex-1" />
          <p>{formatDate(microcredit.expirationDate)}</p>
        </div>
        <div className="flex flex-row items-end justify-between text-xs">
          <p className="w-auto">Status</p>
          <hr className="flex-1" />
          <p>{microcredit.transactionStatus}</p>
        </div>
        <button
          onClick={closeSeeMoreModal}
          className="mt-8 w-full rounded-[30px] bg-[#8EC63F] px-4 py-2 font-bold leading-[19px]"
        >
          Cerrar
        </button>
      </article>
    </div>
  );
};

export default SeeMore;
