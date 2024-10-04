import { Transaction } from "../interfaces/Transaction";
import useUserStore from "../store/useUserStore";

const api = import.meta.env.VITE_API_URL;

export async function getAccountInformation(id: string) {
  try {
    const token = useUserStore.getState().token;

    const response = await fetch(
      `${api}/api/cuenta/consultar-saldo/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      },
    );

    if (response.ok) {
      return await response.json();
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error al buscar información de la cuenta:", error);
    return null;
  }
}

export async function getHistoryByAccount() {
  try {
    const token = useUserStore.getState().token;

    const response = await fetch(
      `${api}/api/cuenta/historial/todo`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      },
    );

    if (response.ok) {
      return await response.json();
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error al buscar historial de la cuenta:", error);
    return null;
  }
}

export async function getLatestHistoryByAccount() {
  try {
    const token = useUserStore.getState().token;
    const accountId = useUserStore.getState().user?.accountId;

    const today = new Date();
    const fromDate = new Date();
    fromDate.setDate(today.getDate() - 15);

    const formatDate = (date: Date) => date.toISOString().split('T')[0];
    const fromDateFormatted = formatDate(fromDate);
    const toDateFormatted = formatDate(today);

    const response = await fetch(
      `${api}/api/cuenta/historial/fechas/${fromDateFormatted}/${toDateFormatted}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      },
    );

    if (response.ok) {
      const transactions = await response.json();

      const modifiedTransactions = transactions.map((transaction: Transaction) => {

        const formattedDate = new Date(transaction.creationDate).toLocaleDateString('es-ES', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit'
        });

        const newTransactionType = transaction.transaction === "Microcrédito" && transaction.senderAccount === accountId
          ? "Colaboración enviada "
          : "Colaboración recibida";

        const receiverFullName = transaction.receiverName.concat(" ", transaction.receiverSurname);
        const senderFullName = transaction.senderName.concat(" ", transaction.senderSurname);

        return {
          ...transaction,
          transaction: newTransactionType,
          creationDate: formattedDate,
          receiverFullName: receiverFullName,
          senderFullName: senderFullName,
        };
      });
      console.log(modifiedTransactions)
      return modifiedTransactions;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error al buscar historial de la cuenta:", error);
    return null;
  }
}

export default {
  getAccountInformation,
  getHistoryByAccount,
  getLatestHistoryByAccount
};