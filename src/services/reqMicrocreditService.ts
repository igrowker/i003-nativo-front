export const requestMicrocreditService = async (
  token: string,
  amount: number,
  title: string,
  description: string,
) => {
  const api = import.meta.env.VITE_API_URL;

  const response = await fetch(`${api}/api/microcreditos/solicitar`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      title,
      description,
      amount,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || response.statusText);
  }

  return response.json();
};
