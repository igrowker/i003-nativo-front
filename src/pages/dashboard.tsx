import { useEffect, useState } from "react";
import { To, useNavigate } from "react-router-dom";
import useUserStore from "../store/useUserStore";
import { User } from "../interfaces/User";
import { Account } from "../interfaces/Account";
import { AccountInfo } from "../components/dashboard/AccountInfo";
import { Transaction } from "../interfaces/Transaction";
import accountService from "../services/accountService";
import { ContainerWhite } from "../components/dashboard/ContainerWhite";
import AccountCardsInfo from "../components/dashboard/AccountCardsInfo";
import AccountLatestMovements from "../components/dashboard/AccountLatestMovements";
import { DashboardButton } from "../components/dashboard/DashboardButton";
import IconTransferir from "../assets/Images/dashboard/IconTransferir.png";
import IconSolicitarMicrocredito from "../assets/Images/dashboard/IconSolicitarMicrocredito.png";
import IconDonar from "../assets/Images/dashboard/IconDonar.png";
import IconSolicitarDonacion from "../assets/Images/dashboard/IconSolicitarAyuda.png";
import IconQRPagar from "../assets/Images/dashboard/IconQRPagar.png";
import IconQRCobrar from "../assets/Images/dashboard/IconQRCobrar.png";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const user: User | null = useUserStore((store) => store.user);
  const accountId: string | null = user?.accountId ?? null;
  const [accountData, setAccountData] = useState<{
    account: Account | null;
    latestMovements: Transaction[];
  }>({
    account: null,
    latestMovements: [],
  });

  const navigateTo = (route: To) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    navigate(route);
  };

  const buttons = [
    {
      icon: IconTransferir,
      label: "Ingresar dinero",
      onClick: () => console.log("click ingreso de dinero"),
    },
    {
      icon: IconDonar,
      label: "Donar",
      onClick: () => console.log("click donar"),
    },
    {
      icon: IconSolicitarMicrocredito,
      label: "Solicitar Microcrédito",
      onClick: () => navigateTo("/apply-microcredit"),
    },
    {
      icon: IconSolicitarDonacion,
      label: "Contribuir a un Microcrédito",
      onClick: () => console.log("click Contribuir a un Microcrédito"),
    },
    {
      icon: IconQRPagar,
      label: "QR - Pagar",
      onClick: () => console.log("click QR - Pagar"),
    },
    {
      icon: IconQRCobrar,
      label: "QR - Cobrar",
      onClick: () => console.log("click QR - Cobrar"),
    },
  ];

  const fetchAccount = async () => {
    if (!accountId) return;
    try {
      const [accountData, latestMovementsData] = await Promise.all([
        accountService.getAccountInformation(accountId),
        accountService.getLatestHistoryByAccount(),
      ]);
      setAccountData({
        account: accountData,
        latestMovements: latestMovementsData,
      });
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  useEffect(() => {
    if (accountId) {
      fetchAccount();
    }
  }, [accountId]);

  return (
    <main className="font-lato">
      <section>
        <div className="mx-auto flex max-w-[480px] flex-col gap-6 bg-light-green px-6 py-4">
          <h1 className="text-[13px] font-bold leading-4">
            ¡Hola, {user?.name || "Nombre"}!
          </h1>
          <ContainerWhite className="flex justify-evenly p-2">
            <AccountInfo amount={accountData.account?.amount || 0} />
          </ContainerWhite>
          <ContainerWhite className="p-6">
            <AccountCardsInfo />
          </ContainerWhite>
          <ContainerWhite className="px-6 py-4 text-[15px] font-bold leading-[18px]">
            <AccountLatestMovements
              latestMovements={accountData.latestMovements}
              accountId={accountId}
            />
          </ContainerWhite>
          <div className="grid grid-cols-2 gap-4 pb-4 text-center text-[15px] font-bold leading-[18px]">
            {buttons.map((button, index) => (
              <DashboardButton
                key={index}
                icon={button.icon}
                label={button.label}
                onClick={button.onClick}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
