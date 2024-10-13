import { ReactNode } from "react";

interface ContainerGreenProps {
  children: ReactNode;
}

export const ContainerGreen = ({ children }: ContainerGreenProps) => {
  return (
    <div className="rounded-[30px] bg-primary-green px-6 py-8 drop-shadow-box">
      <div className="rounded-[20px] bg-light-grey px-4 py-7 drop-shadow-box sm:px-5">
        {children}
      </div>
    </div>
  );
};
