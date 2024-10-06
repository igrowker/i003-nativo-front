import { ReactNode } from "react";

interface ContainerWhiteProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export const ContainerWhite = ({
  children,
  className = "",
  onClick,
}: ContainerWhiteProps) => {
  return (
    <div
      className={`rounded-[20px] border border-secondary-green bg-white drop-shadow-box ${className}`}
      onClick={onClick ? onClick : undefined}
    >
      {children}
    </div>
  );
};
