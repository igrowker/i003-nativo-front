export const formatDate = (dateString: string) => {
  const [datePart] = dateString.split("T");
  const [year, month, day] = datePart.split("-");
  return `${day}/${month}/${year}`;
};
