import { formatDate } from "../../helpers/formDate";
import { CollaborationModal } from "../modal/CollaborationModal";
import { Microcredit } from "../../interfaces/Microcredit";
import { BiChevronDown } from "react-icons/bi";
import SeeMore from "../modal/SeeMore";
import { useState } from "react";

interface ContributeItemProps {
  handleCloseModal: () => void;
  microcredit: Microcredit;
  openModal: (content: JSX.Element) => void;
}

const ContributeItem: React.FC<ContributeItemProps> = ({
  handleCloseModal,
  microcredit,
  openModal,
}) => {
  const [isSeeMoreOpen, setIsSeeMoreOpen] = useState(false);

  const closeSeeMoreModal = () => {
    setIsSeeMoreOpen(false);
  };

  return (
    <article>
      {/*<div className="flex flex-row items-end justify-between text-xs">
        <p className="w-auto">Motivo</p>
        <hr className="flex-1" />
        <p className="max-w-40 truncate">{microcredit.title}</p>
      </div>*/}
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
        <p>10%</p>
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
      <div className="mt-3 w-full text-end font-medium text-blue-400">
        <button
          onClick={() => setIsSeeMoreOpen(true)}
          className="text-xs leading-3"
        >
          Ver más <BiChevronDown className="inline text-2xl" />
        </button>
      </div>
      <button
        type="button"
        onClick={() =>
          openModal(
            <CollaborationModal
              onClose={handleCloseModal}
              microcreditId={microcredit.id}
            />,
          )
        }
        className="mt-6 h-[42px] w-full rounded-full bg-[#8EC63F] text-[20px] font-semibold text-black"
      >
        Contribuir
      </button>
      {isSeeMoreOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-light-green bg-opacity-50">
          <SeeMore
            title="Detalle de microcrédito"
            microcredit={microcredit}
            closeSeeMoreModal={closeSeeMoreModal}
          />
        </div>
      )}
    </article>
  );
};

export default ContributeItem;
