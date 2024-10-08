import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useModal from "../hooks/useModal";
import useUserStore from "../store/useUserStore";
import { User } from "../interfaces/User";
import { FaArrowLeft } from "react-icons/fa6";
import { ContainerWhite } from "../components/dashboard/ContainerWhite";
import { FiltersModal } from "../components/history/FiltersModal";
import { TbFilter, TbFilterCheck } from "react-icons/tb";
import donationService from "../services/donationService";
import { Donation } from "../interfaces/Donation";
import {
  IoCheckmarkCircleOutline,
  IoCloseCircleOutline,
} from "react-icons/io5";

const Donations: React.FC = () => {
  const user_: User | null = useUserStore((store) => store.user);
  const accountId: string | null = user_?.accountId ?? null;
  const [donationsData, setDonationsData] = useState<Donation[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedDateRange, setSelectedDateRange] = useState<{
    fromDate: string;
    toDate: string;
  } | null>(null);

  const { isModalOpen, modalContent, openModal, closeModal } = useModal();

  const fetchDonations = async () => {
    if (!accountId) return;

    try {
      let donationsData: Donation[] = [];

      if (selectedStatus) {
        donationsData =
          await donationService.getAccountDonations(selectedStatus);
      } else if (selectedDateRange) {
        donationsData = await donationService.getDonationsByDateRange(
          selectedDateRange.fromDate.toString(),
          selectedDateRange.toDate.toString(),
        );
      } else {
        donationsData = await donationService.getAccountDonations();
      }

      setDonationsData(donationsData);
    } catch (error) {
      return null;
    }
  };

  useEffect(() => {
    if (accountId) {
      fetchDonations();
    }
  }, [accountId, selectedStatus, selectedDateRange]);

  if (!donationsData) return;

  const handleChangeStatus = async (donation: Donation, newStatus: string) => {
    try {
      const { success, error } = await donationService.modifyDonationStatus(
        donation.id,
        donation.accountIdDonor,
        newStatus,
        donation.amount,
      );

      if (success) {
        fetchDonations();
      } else {
        console.error("Error al cambiar el estado de la donación:", error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <main className="relative flex min-h-[70vh] flex-col items-center gap-4 bg-light-green px-4 py-6 font-lato">
      <Link
        to="/dashboard"
        className="flex w-full items-center gap-2 text-sm font-semibold"
      >
        <FaArrowLeft className="pt-1 text-base" /> Volver al dashboard
      </Link>
      <h1 className="text-xl font-bold leading-[22px]">Donaciones</h1>
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
      <ContainerWhite key="donations" className="z-10 w-full px-2 py-4">
        {donationsData.length > 0 ? (
          <ul className="flex flex-col gap-2 py-2 pl-2 pr-8">
            {donationsData.map((donation: Donation, index: number) => (
              <li
                key={donation.id}
                className={`flex justify-between ${donationsData.length != index + 1 && "border-b py-3"}`}
              >
                <div>
                  <p className="text-sm font-semibold">
                    {donation.formattedDate}
                  </p>
                  <p className="text-sm">{donation.transaction}</p>
                  <p className="text-sm font-medium">{donation.description}</p>
                  {donation.status == "ACCEPTED" && (
                    <p className="w-fit rounded-[20px] bg-secondary-green px-6 text-center text-xs">
                      ACEPTADO
                    </p>
                  )}
                  {donation.status == "COMPLETED" && (
                    <p className="w-fit rounded-[20px] bg-secondary-green px-6 text-center text-xs">
                      COMPLETO
                    </p>
                  )}
                  {donation.status == "PENDING" && (
                    <p className="w-fit rounded-[20px] bg-secondary-yellow/30 px-6 text-center text-xs">
                      PENDIENTE
                    </p>
                  )}
                  {donation.status == "EXPIRED" && (
                    <p className="w-fit rounded-[20px] bg-red-300 px-6 text-center text-xs">
                      EXPIRADO
                    </p>
                  )}
                  {donation.status == "DENIED" && (
                    <p className="w-fit rounded-[20px] bg-red-300 px-6 text-center text-xs">
                      RECHAZADO
                    </p>
                  )}
                </div>
                <div className="flex flex-col items-center justify-evenly">
                  <div className="w-full text-end">
                    <p
                      className={`font-bold ${(donation.status == "DENIED" || donation.status == "EXPIRED") && "line-through"}`}
                    >
                      {(donation.status == "ACCEPTED" ||
                        donation.status == "PENDING") &&
                      donation.accountIdBeneficiary == accountId
                        ? "+"
                        : "-"}
                      ${donation.amount.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600">
                      {donation.formattedTime}
                    </p>
                  </div>
                  {donation.status == "PENDING" &&
                    donation.accountIdBeneficiary == accountId && (
                      <div className="flex gap-1">
                        <button
                          className="rounded-[20px] text-center text-primary-green/90"
                          onClick={() =>
                            handleChangeStatus(donation, "ACCEPTED")
                          }
                        >
                          <IoCheckmarkCircleOutline className="text-3xl" />
                        </button>
                        <button
                          className="rounded-[20px] text-center text-red-600"
                          onClick={() => handleChangeStatus(donation, "DENIED")}
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

export default Donations;
