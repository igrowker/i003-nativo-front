import { Donation } from "../interfaces/Donation";
import useUserStore from "../store/useUserStore";

const api = import.meta.env.VITE_API_URL;

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
        return {
          success: false,
          error: `Error al crear donación: ${response.statusText}`,
        };
      }
    }
  } catch (error) {
    return {
      success: false,
      error: "Ocurrió un error al intentar crear la donación.",
    };
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
        return {
          success: false,
          error: `Error al modificar estado de donación: ${response.statusText}`,
        };
      }
    }
  } catch (error) {
    return {
      success: false,
      error: "Ocurrió un error al intentar cambiar el estado de la donación.",
    };
  }
}

export async function getAccountDonations(statusFilter?: string) {
  try {
    const token = useUserStore.getState().token;
    const accountId = useUserStore.getState().user?.accountId;

    const response = await fetch(
      `${api}/api/donaciones/historial-donaciones/beneficiario/${accountId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (response.ok) {
      const donations = await response.json();

      if (statusFilter) {
        return donations.filter(
          (donation: Donation) => donation.status === statusFilter,
        );
      }

      return donations;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error al buscar donaciones de la cuenta:", error);
    return null;
  }
}

export default {
  createDonation,
  modifyDonationStatus,
  getAccountDonations,
};
