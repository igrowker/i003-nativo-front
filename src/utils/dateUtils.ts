export const dateRangeOptions = [
  { value: "today", label: "Hoy" },
  { value: "yesterday", label: "Ayer" },
  { value: "last_week", label: "Última semana" },
  { value: "last_15_days", label: "Últimos 15 días" },
  { value: "last_month", label: "Último mes" },
  { value: "last_year", label: "Último año" },
];

export const getDateRange = (range: string) => {
  const today = new Date();
  let fromDate = new Date();
  const toDate = today.toISOString().split("T")[0]; // Formato YYYY-MM-DD

  switch (range) {
    case "yesterday":
      fromDate.setDate(today.getDate() - 1);
      break;
    case "last_week":
      fromDate.setDate(today.getDate() - 7);
      break;
    case "last_15_days":
      fromDate.setDate(today.getDate() - 15);
      break;
    case "last_month":
      fromDate.setMonth(today.getMonth() - 1);
      break;
    case "last_year":
      fromDate.setFullYear(today.getFullYear() - 1);
      break;
    default:
      fromDate = today;
  }

  return {
    fromDate: fromDate.toISOString().split("T")[0], // Formato YYYY-MM-DD
    toDate,
  };
};

export const formatDate = (date: Date) => {
  return date.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });
};

export const formatTime = (date: Date) => {
  return date.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

export function stringToDate(dateString: string, isEndOfDay = false) {
  const parts = dateString.split("-").map(Number);

  const hours = isEndOfDay ? 23 : 0;
  const minutes = isEndOfDay ? 59 : 0;
  const seconds = isEndOfDay ? 59 : 0;
  const milliseconds = isEndOfDay ? 999 : 0;

  return new Date(
    Date.UTC(
      parts[0],
      parts[1] - 1,
      parts[2],
      hours,
      minutes,
      seconds,
      milliseconds,
    ),
  );
}
