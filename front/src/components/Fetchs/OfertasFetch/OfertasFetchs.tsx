import {
  ICreateJob,
  ICreateJobOffer,
  IJobApplication,
  IOfferCard,
} from "@/Interfaces/IOffer";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

//Formulario crear job
export const fetchCreateOffer = async (
  offer: ICreateJobOffer,
  token: string
) => {
  if (!offer) {
    console.error(
      "❌ Error: `offer` es `undefined` antes de enviarlo al backend."
    );
    return;
  }

  console.log("✅ Datos enviados al backend:", offer);

  const response = await fetch(`${apiUrl}/jobs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(offer),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("❌ Error en la respuesta del backend:", errorData);
    throw new Error(errorData.message || "Error desconocido");
  }

  const data = await response.json();
  console.log("✅ Respuesta del backend después de crear la oferta:", data);

  return data; // 📌 Importante: devolver la oferta creada
};

//Formulario crear job
export const fetchCreateJob = async (offer: ICreateJob, token: string) => {
  const response = await fetch(`${apiUrl}/jobs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(offer),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error desconocido");
  }

  const data = await response.json();
  return data;
};

//Listar aplicaciones de un trabajo por Id
export const fetchApplicationsByJobId = async (
  jobId: string
): Promise<IJobApplication[]> => {
  try {
    const response = await fetch(`${apiUrl}/applications/jobs/${jobId}`);
    if (!response.ok) throw new Error("Error al obtener aplicaciones");
    return await response.json();
  } catch (error) {
    console.error("Error en fetchApplicationsByJobId:", error);
    return [];
  }
};

export const fetchJobOfferById = async (
  jobId: string
): Promise<IOfferCard | null> => {
  try {
    const response = await fetch(`${apiUrl}/jobs/${jobId}`);
    if (!response.ok)
      throw new Error("No se pudo obtener la oferta de trabajo");
    return await response.json();
  } catch (error) {
    console.error("Error en fetchJobOfferById:", error);
    return null;
  }
};
