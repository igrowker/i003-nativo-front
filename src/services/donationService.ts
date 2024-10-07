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

export default {
  createDonation,
};
