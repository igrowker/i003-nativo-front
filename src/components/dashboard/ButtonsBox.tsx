import { ContainerWhite } from "./ContainerWhite";
import IconTransferir from "../../assets/Images/dashboard/IconTransferir.png";
import IconSolicitarMicrocredito from "../../assets/Images/dashboard/IconSolicitarMicrocredito.png";
import IconDonar from "../../assets/Images/dashboard/IconDonar.png";
import IconSolicitarDonacion from "../../assets/Images/dashboard/IconSolicitarAyuda.png";
import IconQRPagar from "../../assets/Images/dashboard/IconQRPagar.png";
import IconQRCobrar from "../../assets/Images/dashboard/IconQRCobrar.png";

const ButtonsBox = () => {
  return (
    <section className="grid grid-cols-2 gap-4 text-center text-[15px] font-bold leading-[18px]">
      <ContainerWhite
        className="flex h-[130px] cursor-pointer flex-col items-center justify-center p-4"
        onClick={() => console.log("click transferir")}
      >
        <img src={IconTransferir} alt="icono" className="pb-1" />
        <span className="w-2/3">Transferir</span>
      </ContainerWhite>
      <ContainerWhite
        className="flex h-[130px] cursor-pointer flex-col items-center justify-center p-4"
        onClick={() => console.log("click Solicitar Microcrédito")}
      >
        <img src={IconSolicitarMicrocredito} alt="icono" className="pb-1" />
        <span className="w-2/3">Solicitar Microcrédito</span>
      </ContainerWhite>
      <ContainerWhite
        className="flex h-[130px] cursor-pointer flex-col items-center justify-center p-4"
        onClick={() => console.log("click donar")}
      >
        <img src={IconDonar} alt="icono" className="pb-1" />
        Donar
      </ContainerWhite>
      <ContainerWhite
        className="flex h-[130px] cursor-pointer flex-col items-center justify-center p-4"
        onClick={() => console.log("click Solicitar ayuda o donación")}
      >
        <img src={IconSolicitarDonacion} alt="icono" className="pb-1" />
        Solicitar ayuda o donación
      </ContainerWhite>
      <ContainerWhite
        className="flex h-[130px] cursor-pointer flex-col items-center justify-center p-4"
        onClick={() => console.log("click QR - Pagar")}
      >
        <img src={IconQRPagar} alt="icono" className="pb-1" />
        QR - Pagar
      </ContainerWhite>
      <ContainerWhite
        className="flex h-[130px] cursor-pointer flex-col items-center justify-center p-4"
        onClick={() => console.log("click QR - Cobrar")}
      >
        <img src={IconQRCobrar} alt="icono" className="pb-1" />
        QR - Cobrar
      </ContainerWhite>
    </section>
  );
};

export default ButtonsBox;
