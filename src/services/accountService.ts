import { Transaction } from "../interfaces/Transaction";
import useUserStore from "../store/useUserStore";
import { formatDate, formatTime } from "../utils/dateUtils";

const api = import.meta.env.VITE_API_URL;

export async function getAccountInformation(id: string) {
  try {
    const token = useUserStore.getState().token;

    const response = await fetch(`${api}/api/cuenta/consultar-saldo/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      return await response.json();
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error al buscar información de la cuenta:", error);
    return [];
  }
}

export async function addMoneyToAccount(id: string, amount: number) {
  try {
    const token = useUserStore.getState().token;

    const response = await fetch(`${api}/api/cuenta/agregar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id,
        amount,
      }),
    });

    if (response.ok) {
      return await response.json();
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error al cargar dinero en la cuenta:", error);
    return [];
  }
}

export async function getAccountHistory(): Promise<Transaction[]> {
  try {
    const token = useUserStore.getState().token;
    const accountId = useUserStore.getState().user?.accountId;

    const response = await fetch(`${api}/api/cuenta/historial/todo`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok && accountId != null) {
      const transactions: Transaction[] = await response.json();

      const normalizedTransactions = transactions
        .map((transaction: Transaction) =>
          normalizeTransaction(transaction, accountId),
        )
        .sort(
          (a, b) =>
            new Date(b.creationDate).getTime() -
            new Date(a.creationDate).getTime(),
        );

      return normalizedTransactions;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error al buscar historial de la cuenta:", error);
    return [];
  }
}

export async function getLatestHistoryByAccount() {
  try {
    const token = useUserStore.getState().token;
    const accountId = useUserStore.getState().user?.accountId;

    const today = new Date();
    const fromDate = new Date();
    fromDate.setDate(today.getDate() - 15);

    const formatDate = (date: Date) => date.toISOString().split("T")[0];
    const fromDateFormatted = formatDate(fromDate);
    const toDateFormatted = formatDate(today);

    const response = await fetch(
      `${api}/api/cuenta/historial/fechas/${fromDateFormatted}/${toDateFormatted}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (response.ok && accountId != null) {
      const transactions: Transaction[] = await response.json();

      const normalizedTransactions = transactions
        .map((transaction: Transaction) =>
          normalizeTransaction(transaction, accountId),
        )
        .sort(
          (a, b) =>
            new Date(b.creationDate).getTime() -
            new Date(a.creationDate).getTime(),
        )
        .slice(0, 5);

      return normalizedTransactions;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error al buscar historial de la cuenta:", error);
    return [];
  }
}

export async function getAccountHistoryByStatus(
  status: string,
): Promise<Transaction[]> {
  try {
    const token = useUserStore.getState().token;
    const accountId = useUserStore.getState().user?.accountId;

    const response = await fetch(
      `${api}/api/cuenta/historial/estado/${status}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (response.ok && accountId != null) {
      const transactions: Transaction[] = await response.json();
      const normalizedTransactions = transactions
        .map((transaction: Transaction) =>
          normalizeTransaction(transaction, accountId),
        )
        .sort(
          (a, b) =>
            new Date(b.creationDate).getTime() -
            new Date(a.creationDate).getTime(),
        );

      return normalizedTransactions;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error al buscar historial de la cuenta:", error);
    return [];
  }
}

export async function getAccountHistoryByDates(
  fromDate: string,
  toDate: string,
): Promise<Transaction[]> {
  try {
    const token = useUserStore.getState().token;
    const accountId = useUserStore.getState().user?.accountId;

    const response = await fetch(
      `${api}/api/cuenta/historial/fechas/${fromDate}/${toDate}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (response.ok && accountId != null) {
      const transactions: Transaction[] = await response.json();

      const normalizedTransactions = transactions
        .map((transaction: Transaction) =>
          normalizeTransaction(transaction, accountId),
        )
        .sort(
          (a, b) =>
            new Date(b.endDate).getTime() - new Date(a.endDate).getTime(),
        );

      return normalizedTransactions;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error al buscar historial de la cuenta:", error);
    return [];
  }
}

function normalizeTransaction(transaction: Transaction, accountId: string) {
  const creationDate = new Date(transaction.creationDate);

  const endDate = transaction.endDate
    ? new Date(transaction.endDate)
    : new Date(transaction.creationDate);

  endDate.setHours(endDate.getHours() - 3);

  const formattedDate = formatDate(endDate);
  const formattedTime = formatTime(endDate);

  const receiverFullName = `${transaction.receiverName} ${transaction.receiverSurname}`;
  const senderFullName = `${transaction.senderName} ${transaction.senderSurname}`;

  let newTransactionType;
  let description = "";

  switch (transaction.transaction) {
    case "Microcrédito":
      newTransactionType =
        transaction.senderAccount === accountId
          ? "Contribución enviada"
          : "Contribución recibida";
      description =
        transaction.senderAccount === accountId
          ? `Microcrédito de ${receiverFullName}`
          : `Colaboración recibida de ${senderFullName}`;
      break;

    case "Donación":
      if (transaction.status === "PENDING") {
        newTransactionType =
          transaction.senderAccount === accountId
            ? "Solicitud de donación enviada"
            : "Solicitud de donación recibida";
        description =
          transaction.senderAccount === accountId
            ? `A ${receiverFullName}`
            : senderFullName.includes("null")
              ? "De donante anónimo"
              : `De ${senderFullName}`;
      } else if (transaction.status === "ACCEPTED") {
        newTransactionType =
          transaction.senderAccount === accountId
            ? "Donación enviada"
            : "Donación recibida";
        description =
          transaction.senderAccount === accountId
            ? `A ${receiverFullName}`
            : senderFullName.includes("null")
              ? "De donante anónimo"
              : `De ${senderFullName}`;
      } else if (transaction.status === "DENIED") {
        newTransactionType = "Donación rechazada";
        description =
          transaction.senderAccount === accountId
            ? `A ${receiverFullName}`
            : senderFullName.includes("null")
              ? "De donante anónimo"
              : `De ${senderFullName}`;
      }
      break;

    case "Pago":
      newTransactionType =
        transaction.senderAccount === accountId
          ? "Pago enviado"
          : "Pago recibido";
      description =
        transaction.senderAccount === accountId
          ? `A ${receiverFullName}`
          : `De ${senderFullName}`;
      break;

    default:
      newTransactionType = transaction.transaction;
      description =
        transaction.senderAccount === accountId
          ? `A ${receiverFullName}`
          : senderFullName.includes("null")
            ? "Desde anónimo"
            : `Desde ${senderFullName}`;
      break;
  }

  return {
    ...transaction,
    transaction: newTransactionType,
    creationDate: creationDate,
    endDate,
    formattedDate: formattedDate,
    formattedTime: formattedTime,
    description,
  };
}

export default {
  getAccountInformation,
  addMoneyToAccount,
  getAccountHistory,
  getLatestHistoryByAccount,
  getAccountHistoryByStatus,
  getAccountHistoryByDates,
};
