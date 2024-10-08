import { Donation } from "../interfaces/Donation";
import useUserStore from "../store/useUserStore";
import { formatDate, formatTime, stringToDate } from "../utils/dateUtils";

const api = import.meta.env.VITE_API_URL;

async function fetchDonations(endpoint: string): Promise<Donation[]> {
  const token = useUserStore.getState().token;
  const accountId = useUserStore.getState().user?.accountId;

  if (!accountId) return [];

  const response = await fetch(
    `${api}/api/donaciones/${endpoint}/${accountId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error(`Error fetching donations: ${response.statusText}`);
  }

  return response.json();
}

function handleError(error: unknown, silent = false) {
  if (!silent) {
    console.error("Error:", error);
  }
  return { success: false, error: "Ocurrió un error en la operación" };
}

async function getAllDonations() {
  const [beneficiaryDonations, donorDonations] = await Promise.all([
    fetchDonations("historial-donaciones/beneficiario"),
    fetchDonations("historial-donaciones/donador"),
  ]);

  return [...beneficiaryDonations, ...donorDonations];
}

function getTransactionType(status: string, isDonor: boolean): string {
  switch (status) {
    case "PENDING":
      return isDonor
        ? "Solicitud de donación enviada"
        : "Solicitud de donación recibida";
    case "ACCEPTED":
      return isDonor ? "Donación enviada" : "Donación recibida";
    case "DENIED":
      return "Solicitud de donación rechazada";
    default:
      return "Estado desconocido";
  }
}

function normalizeDonation(donation: Donation, accountId: string) {
  const creationDate = donation.updateAt
    ? new Date(donation.updateAt)
    : new Date(donation.createdAt);

  const formattedDate = formatDate(creationDate);
  const formattedTime = formatTime(creationDate);

  const updatedAt = donation.updateAt
    ? new Date(donation.updateAt)
    : new Date(donation.createdAt);

  const receiverFullName = `${donation.beneficiaryName} ${donation.beneficiaryLastName}`;
  const senderFullName = `${donation.donorName} ${donation.donorLastName}`;

  const isDonor = donation.accountIdDonor === accountId;
  const isAnonymous = senderFullName.includes("Anónimo");

  const newTransactionType = getTransactionType(donation.status, isDonor);
  const description = isDonor
    ? `A ${receiverFullName}`
    : isAnonymous
      ? "De donante anónimo"
      : `De ${senderFullName}`;

  return {
    ...donation,
    transaction: newTransactionType,
    creationDate: creationDate,
    formattedDate: formattedDate,
    formattedTime: formattedTime,
    description,
    updatedAt,
  };
}

export async function createDonation(
  accountIdBeneficiary: string,
  anonymousDonation: boolean,
  amount: number,
) {
  try {
    const token = useUserStore.getState().token;
    const accountId = useUserStore.getState().user?.accountId;

    const response = await fetch(`${api}/api/donaciones/crear-donacion`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        amount,
        accountIdDonor: accountId,
        accountIdBeneficiary,
        anonymousDonation,
      }),
    });

    if (response.status === 200) {
      return { success: true, data: await response.json() };
    } else {
      const errorResponse = await response.json();

      if (response.status === 400 || response.status === 404) {
        return { success: false, error: errorResponse.message || "Error" };
      } else {
        return handleError(
          `Error al crear donación: ${response.statusText}`,
          true,
        );
      }
    }
  } catch (error) {
    return handleError(error, true);
  }
}

export async function modifyDonationStatus(
  id: string,
  accountIdDonor: string,
  status: string,
  amount: number,
) {
  try {
    const token = useUserStore.getState().token;
    const accountId = useUserStore.getState().user?.accountId;

    const response = await fetch(`${api}/api/donaciones/confirmar-donacion`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id,
        amount,
        accountIdDonor,
        accountIdBeneficiary: accountId,
        status,
      }),
    });

    if (response.status === 200) {
      return { success: true, data: await response.json() };
    } else {
      const errorResponse = await response.json();

      if (response.status === 400 || response.status === 404) {
        return { success: false, error: errorResponse.message || "Error" };
      } else {
        return handleError(
          `Error al modificar estado de donación: ${response.statusText}`,
          true,
        );
      }
    }
  } catch (error) {
    return handleError(error, true);
  }
}

export async function getAccountDonations(
  statusFilter?: string,
): Promise<Donation[]> {
  try {
    const accountId = useUserStore.getState().user?.accountId;

    if (!accountId) return [];

    const allDonations = await getAllDonations();

    const normalizedDonations = allDonations.map((donation) =>
      normalizeDonation(donation, accountId),
    );

    const sortedDonations = normalizedDonations.sort((a, b) => {
      const dateA = a.updatedAt || a.createdAt;
      const dateB = b.updatedAt || b.createdAt;
      return new Date(dateB).getTime() - new Date(dateA).getTime();
    });

    if (statusFilter) {
      return sortedDonations.filter(
        (donation: Donation) => donation.status === statusFilter,
      );
    }

    return sortedDonations;
  } catch (error) {
    return handleError(error);
  }
}

export async function getDonationsByDateRange(
  fromDate?: string,
  toDate?: string,
): Promise<Donation[]> {
  try {
    const accountId = useUserStore.getState().user?.accountId;

    if (!accountId) return [];

    const allDonations = await getAllDonations();
    const normalizedDonations = allDonations.map((donation) =>
      normalizeDonation(donation, accountId),
    );

    const sortedDonations = normalizedDonations.sort((a, b) => {
      const dateA = a.updatedAt || a.createdAt;
      const dateB = b.updatedAt || b.createdAt;
      return new Date(dateB).getTime() - new Date(dateA).getTime();
    });

    return filterDonationsByDate(sortedDonations, fromDate, toDate);
  } catch (error) {
    return handleError(error);
  }
}

function filterDonationsByDate(
  donations: Donation[],
  fromDate?: string,
  toDate?: string,
): Donation[] {
  if (fromDate && toDate && fromDate === toDate) {
    return donations.filter((donation: Donation) => {
      const donationDate = donation.updateAt || donation.createdAt;
      return donationDate.toString().includes(fromDate);
    });
  }

  if (fromDate && toDate) {
    const from = stringToDate(fromDate);
    const to = stringToDate(toDate, true);

    console.log("From Date:", from);
    console.log("To Date:", to);

    return donations.filter((donation: Donation) => {
      const donationDate = donation.updateAt
        ? new Date(donation.updateAt)
        : new Date(donation.createdAt);
      donationDate.setHours(0, 0, 0, 0);
      return donationDate >= from && donationDate <= to;
    });
  }

  return donations;
}

export default {
  createDonation,
  modifyDonationStatus,
  getAccountDonations,
  getDonationsByDateRange,
};
