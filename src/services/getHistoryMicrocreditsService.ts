export const getHistoryMicrocreditsService = async (token: string, amount: number, title:string, description: string) => {
  
  const API_URL = import.meta.env.VITE_NATIVO_API_URL;

  try {
    const response = await fetch(`${API_URL}/api/microcreditos/solicitar`, {
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

  if (response.ok) {
        const result = await response.json();
        return result;   
      } else { 
        throw new Error("Error al solicitar el microcrédito");
      }
    } catch (error) {
      console.error("Error en la solicitud de microcrédito:", error);
      throw error;
    }
};
