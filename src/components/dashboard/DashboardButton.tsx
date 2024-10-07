import { ContainerWhite } from "./ContainerWhite";

interface DashboardButtonProps {
  icon: string;
  label: string;
  onClick: () => void;
}

export const DashboardButton: React.FC<DashboardButtonProps> = ({
  icon,
  label,
  onClick,
}) => (
  <ContainerWhite
    className="flex h-[130px] cursor-pointer flex-col items-center justify-center p-4"
    onClick={onClick}
  >
    <img src={icon} alt={`Icono para ${label}`} className="pb-1" />
    <span className="w-2/3">{label}</span>
  </ContainerWhite>
);
