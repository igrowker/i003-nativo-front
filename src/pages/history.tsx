import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useModal from "../hooks/useModal";
import useUserStore from "../store/useUserStore";
import { User } from "../interfaces/User";
import { Transaction } from "../interfaces/Transaction";
import accountService from "../services/accountService";
import { ContainerWhite } from "../components/dashboard/ContainerWhite";
import { FiltersModal } from "../components/history/FiltersModal";
import { TbFilter, TbFilterCheck } from "react-icons/tb";
import donationService from "../services/donationService";
import {
  IoCheckmarkCircleOutline,
  IoCloseCircleOutline,
} from "react-icons/io5";

const History: React.FC = () => {
  const user: User | null = useUserStore((store) => store.user);
  const accountId: string | null = user?.accountId ?? null;
  const [historyData, setHistoryData] = useState<Transaction[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedDateRange, setSelectedDateRange] = useState<{
    fromDate: string;
    toDate: string;
  } | null>(null);

  const { isModalOpen, modalContent, openModal, closeModal } = useModal();

  const fetchAccount = async () => {
    if (!accountId) return;

    try {
      let movementsData = [];

      if (selectedStatus) {
        movementsData =
          await accountService.getAccountHistoryByStatus(selectedStatus);
      } else if (selectedDateRange) {
        movementsData = await accountService.getAccountHistoryByDates(
          selectedDateRange.fromDate,
          selectedDateRange.toDate,
        );
      } else {
        movementsData = await accountService.getAccountHistory();
      }
      setHistoryData(movementsData);
    } catch (error) {
      //console.error("Error: ", error);
    }
  };

  useEffect(() => {
    if (accountId) {
      fetchAccount();
    }
  }, [accountId, selectedStatus, selectedDateRange]);

  if (!historyData) return;

  const handleChangeStatus = async (
    transaction: Transaction,
    newStatus: string,
  ) => {
    try {
      const { success, error } = await donationService.modifyDonationStatus(
        transaction.id,
        transaction.senderAccount,
        newStatus,
        transaction.amount,
      );

      if (success) {
        fetchAccount();
      } else {
        console.error("Error al cambiar el estado de la donación:", error);
      }
    } catch (error) {
      //console.error("Error:", error);
    }
  };

  return (
    <main className="relative flex min-h-[70vh] flex-col items-center gap-4 bg-light-green px-4 py-6 font-lato">
        <Link
        to="/dashboard"
        className="flex w-full items-center gap-2 text-sm"
      >
        <img src="./microcredits/arrow_back.svg" /> 
        Volver al inicio
      </Link>
      <h1 className="text-xl font-bold leading-[22px]">Historial</h1>
      <div className="flex gap-2">
        <div className="w-80 rounded-[20px] bg-white px-2 py-1 text-sm text-gray-600">
          Buscá por número de operación o nombre
        </div>
        <button
          className="inline text-xl text-primary-green"
          onClick={() =>
            openModal(
              <FiltersModal
                onClose={closeModal}
                onFilterStatus={setSelectedStatus}
                onFilterDate={setSelectedDateRange}
              />,
            )
          }
        >
          {selectedStatus == null && selectedDateRange == null ? (
            <TbFilter />
          ) : (
            <TbFilterCheck />
          )}
        </button>
      </div>
      <ContainerWhite className="z-10 w-full px-2 py-4">
        {historyData.length > 0 ? (
          <ul className="flex flex-col gap-2 py-2 pl-2 pr-6">
            {historyData.map((transaction: Transaction, index: number) => (
              <li
                key={transaction.id}
                className={`flex justify-between ${historyData.length != index + 1 && "border-b py-3"}`}
              >
                <div>
                  <p className="text-sm font-semibold">
                    {transaction.formattedDate}
                  </p>
                  <p className="text-sm">{transaction.transaction}</p>
                  <p className="text-sm font-medium">
                    {transaction.description}
                  </p>
                  {transaction.status == "ACCEPTED" && (
                    <p className="w-fit rounded-[20px] bg-secondary-green px-6 text-center text-xs">
                      ACEPTADO
                    </p>
                  )}
                  {transaction.status == "COMPLETED" && (
                    <p className="w-fit rounded-[20px] bg-secondary-green px-6 text-center text-xs">
                      COMPLETO
                    </p>
                  )}
                  {transaction.status == "PENDING" && (
                    <p className="w-fit rounded-[20px] bg-secondary-yellow/30 px-6 text-center text-xs">
                      PENDIENTE
                    </p>
                  )}
                  {transaction.status == "EXPIRED" && (
                    <p className="w-fit rounded-[20px] bg-red-300 px-6 text-center text-xs">
                      EXPIRADO
                    </p>
                  )}
                  {transaction.status == "DENIED" && (
                    <p className="w-fit rounded-[20px] bg-red-300 px-6 text-center text-xs">
                      RECHAZADO
                    </p>
                  )}
                </div>
                <div className="flex flex-col items-center justify-evenly">
                  <div className="w-full text-end">
                    <p
                      className={`font-bold ${(transaction.status == "DENIED" || transaction.status == "EXPIRED") && "line-through"}`}
                    >
                      {transaction.status == "ACCEPTED" ||
                        transaction.status == "PENDING"
                        ? transaction.receiverAccount == accountId
                          ? "+"
                          : "-"
                        : ""}
                      ${transaction.amount.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600">
                      {transaction.formattedTime}
                    </p>
                  </div>
                  {transaction.transaction?.toLowerCase().includes("donación") && transaction.status == "PENDING" &&
                    transaction.receiverAccount == accountId && (
                      <div className="flex gap-1">
                        <button
                          className="rounded-[20px] text-center text-primary-green/90"
                          onClick={() =>
                            handleChangeStatus(transaction, "ACCEPTED")
                          }
                        >
                          <IoCheckmarkCircleOutline className="text-3xl" />
                        </button>
                        <button
                          className="rounded-[20px] text-center text-red-600"
                          onClick={() =>
                            handleChangeStatus(transaction, "DENIED")
                          }
                        >
                          <IoCloseCircleOutline className="text-3xl" />
                        </button>
                      </div>
                    )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>Sin movimientos</p>
        )}
      </ContainerWhite>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-light-green bg-opacity-50">
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={closeModal}
          />
          <div className="z-10 w-4/5 rounded bg-white px-6 py-10 shadow-lg">
            {modalContent}
          </div>
        </div>
      )}
    </main>
  );
};

export default History;
