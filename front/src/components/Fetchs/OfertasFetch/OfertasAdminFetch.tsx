import { IOfferCard } from "@/Interfaces/IOffer";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// 🔹 Obtener todas las ofertas
export const getOfertas = async (): Promise<IOfferCard[]> => {
  try {
    const response = await fetch(`${apiUrl}/jobs`);

    if (!response.ok) {
      console.error("❌ Error al obtener ofertas:", response.statusText);
      return [];
    }

    const data = await response.json();
    console.log("✅ Ofertas recibidas del backend:", data);

    if (!Array.isArray(data)) {
      console.error("❌ Respuesta inesperada, no es un array:", data);
      return [];
    }

    return data;
  } catch (error) {
    console.error("❌ Error en `getOfertas()`:", error);
    return [];
  }
};

// 🔹 Obtener oferta por ID
export const getOfertaById = async (id: string): Promise<IOfferCard | null> => {
  try {
    const response = await fetch(`${apiUrl}/jobs/${id}`);

    if (!response.ok) {
      console.error(`❌ Error al obtener oferta ${id}:`, response.statusText);
      return null;
    }

    const data: IOfferCard = await response.json();
    console.log(`✅ Oferta ${id} recibida:`, data);
    return data;
  } catch (error) {
    console.error(`❌ Error en getOfertaById(${id}):`, error);
    return null;
  }
};
