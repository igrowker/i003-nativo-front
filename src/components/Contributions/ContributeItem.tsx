import { formatDate } from "../../helpers/formDate";
import { CollaborationModal } from "../modal/CollaborationModal";
import { Microcredit } from '../../interfaces/Microcredit';

interface ContributeItemProps {
  handleCloseModal: () => void;
  microcredit: Microcredit;  
  openModal: (content: JSX.Element) => void;
}


const ContributeItem: React.FC<ContributeItemProps> = ({handleCloseModal, microcredit, openModal  }) => {
  return (
    <article>         
      <div className="flex flex-row items-end justify-between text-xs">
        <p className="w-auto">Motivo</p>
        <hr className="flex-1" />
        <p className="truncate max-w-40">{microcredit.title}</p>
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
        <p className="w-auto">Fecha de solicitud</p>
        <hr className="flex-1" />
        <p>{formatDate(microcredit.createdDate)}</p>
      </div>
      <div className="flex flex-row items-end justify-between text-xs">
        <p className="w-auto">Fecha de vencimiento</p>
        <hr className="flex-1" />
        <p>{formatDate(microcredit.expirationDate)}</p>
      </div>
    <div className="mt-4 flex w-full justify-end">
      <a href="./" className="text-blue-500 underline">
        Ver más...
      </a>
    </div>
    <button
      type="button"
      onClick= { () => openModal(<CollaborationModal onClose={handleCloseModal} microcreditId = {microcredit.id} />)}
      className="mt-6 h-[42px] w-full rounded-full bg-[#8EC63F] text-[20px] font-semibold text-black"
    >
      Contribuir
    </button>
  </article>
  )
}

export default ContributeItem