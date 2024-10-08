import { Donation } from "../interfaces/Donation";
import useUserStore from "../store/useUserStore";
import { formatDate, formatTime } from "../utils/dateUtils";

const api = import.meta.env.VITE_API_URL;


function handleError(error: unknown, silent = false) {
  if (!silent) {
    console.error("Error:", error);
  }
  return { success: false, error: "Ocurrió un error en la operación" };
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
    const token = useUserStore.getState().token;
    const accountId = useUserStore.getState().user?.accountId;

    if (!accountId) return [];

    const [beneficiaryResponse, donorResponse] = await Promise.all([
      fetch(
        `${api}/api/donaciones/historial-donaciones/beneficiario/${accountId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      ),
      fetch(`${api}/api/donaciones/historial-donaciones/donador/${accountId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
    ]);

    if (beneficiaryResponse.ok && donorResponse.ok) {
      const [beneficiaryDonations, donorDonations] = await Promise.all([
        beneficiaryResponse.json(),
        donorResponse.json(),
      ]);

      const allDonations = [...beneficiaryDonations, ...donorDonations];

      const normalizedDonations = allDonations.map((donation) =>
        normalizeDonation(donation, accountId),
      );

      const sortedDonations = normalizedDonations.sort((a, b) => {
        const dateA = a.creationDate
          ? new Date(a.creationDate)
          : new Date(a.createdAt);
        const dateB = b.creationDate
          ? new Date(b.creationDate)
          : new Date(b.createdAt);
        return dateB.getTime() - dateA.getTime();
      });

      if (statusFilter) {
        return sortedDonations.filter(
          (donation: Donation) => donation.status === statusFilter,
        );
      }

      return sortedDonations;
    } else {
      return [];
    }
  } catch (error) {
    return handleError(error);
  }
}

export async function getDonationsByDateRange(
  fromDate?: string,
  toDate?: string,
): Promise<Donation[]> {
  try {
    const token = useUserStore.getState().token;
    const accountId = useUserStore.getState().user?.accountId;

    if (!accountId) return [];

    const [beneficiaryResponse, donorResponse] = await Promise.all([
      fetch(
        `${api}/api/donaciones/historial-donaciones/beneficiario/${accountId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      ),
      fetch(`${api}/api/donaciones/historial-donaciones/donador/${accountId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
    ]);

    if (beneficiaryResponse.ok && donorResponse.ok) {
      const [beneficiaryDonations, donorDonations] = await Promise.all([
        beneficiaryResponse.json(),
        donorResponse.json(),
      ]);

      const allDonations = [...beneficiaryDonations, ...donorDonations];

      const normalizedDonations = allDonations.map((donation) =>
        normalizeDonation(donation, accountId),
      );

      const sortedDonations = normalizedDonations.sort((a, b) => {
        const dateA = a.creationDate
          ? new Date(a.creationDate)
          : new Date(a.createdAt);
        const dateB = b.creationDate
          ? new Date(b.creationDate)
          : new Date(b.createdAt);

        return dateB.getTime() - dateA.getTime();
      });

      if (fromDate && toDate && fromDate === toDate) {
        return sortedDonations.filter((donation: Donation) => {
          const donationDate = donation.updateAt
            ? donation.updateAt.toString()
            : donation.createdAt.toString();
          return donationDate.includes(fromDate);
        });
      }

      if (fromDate && toDate) {
        const from = new Date(fromDate);
        const to = new Date(toDate);

        from.setHours(0, 0, 0, 0);
        to.setHours(23, 59, 59, 999);

        return sortedDonations.filter((donation: Donation) => {
          const donationDate = donation.updateAt
            ? new Date(donation.updateAt)
            : new Date(donation.createdAt);
          donationDate.setHours(0, 0, 0, 0);
          return donationDate >= from && donationDate <= to;
        });
      }
      return sortedDonations;
    } else {
      return [];
    }
  } catch (error) {
    return handleError(error);
  }
}

function normalizeDonation(donation: Donation, accountId: string) {
  const creationDate = donation.updateAt
    ? new Date(donation.updateAt)
    : new Date(donation.createdAt);

  const updatedAt = donation.updateAt
    ? new Date(donation.updateAt)
    : new Date(donation.createdAt);

  const formattedDate = formatDate(creationDate);
  const formattedTime = formatTime(creationDate);

  const receiverFullName = `${donation.beneficiaryName} ${donation.beneficiaryLastName}`;
  const senderFullName = `${donation.donorName} ${donation.donorLastName}`;

  let newTransactionType: string;
  let description: string = "";

  const isDonor = donation.accountIdDonor === accountId;
  const isAnonymous = senderFullName.includes("Anónimo");

  switch (donation.status) {
    case "PENDING":
      newTransactionType = isDonor ? "Solicitud de donación enviada" : "Solicitud de donación recibida";
      break;
    case "ACCEPTED":
      newTransactionType = isDonor ? "Donación enviada" : "Donación recibida";
      break;
    case "DENIED":
      newTransactionType = "Solicitud de donación rechazada";
      break;
    default:
      newTransactionType = "Estado desconocido";
      break;
  }

  description = isDonor
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

export default {
  createDonation,
  modifyDonationStatus,
  getAccountDonations,
  getDonationsByDateRange,
};
