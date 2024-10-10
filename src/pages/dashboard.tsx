import { useEffect, useState } from "react";
import useSmoothNavigate from "../hooks/useSmoothNavigate";
import useModal from "../hooks/useModal";
import useUserStore from "../store/useUserStore";
import accountService from "../services/accountService";
import { User } from "../interfaces/User";
import { Account } from "../interfaces/Account";
import { AccountInfo } from "../components/dashboard/AccountInfo";
import { Transaction } from "../interfaces/Transaction";
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
import { DepositModal } from "../components/modal/DepositModal";
import { DonateModal } from "../components/modal/DonateModal";

const Dashboard: React.FC = () => {
  const smoothNavigate = useSmoothNavigate();
  const { isModalOpen, modalContent, openModal, closeModal } = useModal();
  const user: User | null = useUserStore((store) => store.user);
  const accountId: string | null = user?.accountId ?? null;
  // console.log("accountId", accountId);
  const [accountData, setAccountData] = useState<{
    account: Account | null;
    latestMovements: Transaction[];
  }>({
    account: null,
    latestMovements: [],
  });

  const handleRefresh = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    fetchAccount();
  };

  const handleCloseModalOk = () => {
    closeModal();
    handleRefresh();
  };

  const handleCloseModal = () => {
    closeModal();
  };

  const buttons = [
    {
      icon: IconTransferir,
      label: "Ingresar dinero",
      onClick: () =>
        openModal(
          <DepositModal
            onCloseOk={handleCloseModalOk}
            onClose={handleCloseModal}
          />,
        ),
    },
    {
      icon: IconDonar,
      label: "Donar",
      onClick: () =>
        openModal(
          <DonateModal
            onCloseOk={handleCloseModalOk}
            onClose={handleCloseModal}
          />,
        ),
    },
    {
      icon: IconSolicitarMicrocredito,
      label: "Solicitar Microcrédito",
      onClick: () => smoothNavigate("/apply-microcredit"),
    },
    {
      icon: IconSolicitarDonacion,
      label: "Contribuir a un Microcrédito",
      onClick: () => smoothNavigate("/contribute-microcredit"),
    },
    {
      icon: IconQRPagar,
      label: "QR - Pagar",
      onClick: () => smoothNavigate("/pay-qr"),
    },
    {
      icon: IconQRCobrar,
      label: "QR - Cobrar",
      onClick: () => smoothNavigate("/generate-qr"),
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

  // const token = useUserStore((store) => store.token);

  // const fetchPrueba = async () => {
  //   try {
  //     const response = await fetch(
  //       `api/api/pagos/id/2d9dc894-7962-490e-97d5-ea7ce652a840`,
  //       {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       },
  //     );

  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }

  //     console.log("response", response);

  //     const data = await response.json();
  //     console.log(data);
  //   } catch (error) {
  //     console.error("Error: ", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchPrueba();
  // }, []);

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
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-light-green bg-opacity-50">
          <div className="flex w-11/12 max-w-md flex-col gap-4 rounded-[40px] bg-primary-green p-6 shadow-lg">
            {modalContent}
          </div>
        </div>
      )}
    </main>
  );
};

export default Dashboard;
