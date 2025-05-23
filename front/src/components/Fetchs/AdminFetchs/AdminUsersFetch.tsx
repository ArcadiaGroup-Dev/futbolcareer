import { ICreateCurso, ICurso } from "@/Interfaces/ICursos";
import { ICreateNotice, INotice } from "@/Interfaces/INews";
import { IApplication } from "@/Interfaces/IOffer";
import { IProfileData } from "@/Interfaces/IUser";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// Función para obtener los usuarios
export const getUsers = async (): Promise<IProfileData[]> => {
  try {
    const response = await fetch(`${apiUrl}/user`);
    if (!response.ok) {
      throw new Error("Error al obtener los usuarios");
    }
    const users: IProfileData[] = await response.json();
    return users;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const fetchApplications = async (application: IApplication) => {
  const response = await fetch(`${apiUrl}/applications`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(application),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error desconocido");
  }

  const data = await response.json();
  return data;
};

//Eliminar usuarios
export const deleteUser = async (userId: string) => {
  try {
    const response = await fetch(`${apiUrl}/user/${userId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Error al eliminar usuario");
    }

    // Si el servidor responde con un cuerpo vacío (content-length: 0)
    if (response.status === 200 && response.statusText === "OK") {
      return { message: "Usuario eliminado con éxito" }; // Mensaje sin cuerpo
    }

    // Si la respuesta tiene contenido, procesar el JSON
    return await response.json();
  } catch (error) {
    console.error("Error en deleteUser:", error);
    throw error;
  }
};

// Función para obtener las noticias paginadas
export const getNews = async (page = 1): Promise<INotice[]> => {
  try {
    const response = await fetch(`${apiUrl}/News?page=${page}`);
    if (!response.ok) {
      throw new Error("Error al obtener las noticias");
    }
    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getNewsById = async (noticeId: string) => {
  try {
    const response = await fetch(`${apiUrl}/News/${noticeId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error al obtener la noticia");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener la noticia:", error);
    throw error;
  }
};

export const getCursosById = async (cursoId: string) => {
  try {
    const response = await fetch(`${apiUrl}/cursos/${cursoId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error al obtener el curso");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener el curso:", error);
    throw error;
  }
};

//Formulario crear noticias
export const fetchCreateNews = async (notice: ICreateNotice, token: string) => {
  const response = await fetch(`${apiUrl}/News`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",

      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(notice),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error desconocido");
  }

  const data = await response.json();
  return data;
};

// Función para obtener los cursos
export const getCursos = async (): Promise<ICurso[]> => {
  try {
    const response = await fetch(`${apiUrl}/cursos`);
    if (!response.ok) {
      throw new Error("Error al obtener las noticias");
    }
    const curso: ICurso[] = await response.json();
    return curso;
  } catch (error) {
    console.error(error);
    return [];
  }
};

//Formulario crear cursos
export const fetchCreateCourse = async (curso: ICreateCurso) => {
  const response = await fetch(`${apiUrl}/cursos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(curso),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error desconocido");
  }

  const data = await response.json();
  return data;
};

//Eliminar curso
export const fetchDeleteCurso = async (cursoId: string, token: string) => {
  try {
    const response = await fetch(`${apiUrl}/cursos/${cursoId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error al eliminar noticia");
    }

    // Si el servidor responde con un cuerpo vacío (content-length: 0)
    if (response.status === 200 && response.statusText === "OK") {
      return {
        ok: true,
        status: response.status,
        message: "Noticia eliminada con éxito",
      }; // Devuelve el estado y mensaje
    }

    // Si la respuesta tiene contenido, procesar el JSON
    return {
      ok: false,
      status: response.status,
      message: await response.json(),
    };
  } catch (error) {
    console.error("Error al eliminar noticia:", error);
    throw error;
  }
};

export const fetchEditCourse = async (
  token: string,
  courseId: string,
  updatedCourse: ICurso
) => {
  const response = await fetch(`${apiUrl}/cursos/${courseId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updatedCourse),
  });

  if (!response.ok) {
    throw new Error("Error al actualizar el curso");
  }

  return await response.json();
};

// Eliminar noticia
export const fetchDeleteNotice = async (noticeId: string, token: string) => {
  try {
    const response = await fetch(`${apiUrl}/News/${noticeId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error al eliminar noticia");
    }

    // Si el servidor responde con un cuerpo vacío (content-length: 0)
    if (response.status === 200 && response.statusText === "OK") {
      return {
        ok: true,
        status: response.status,
        message: "Noticia eliminada con éxito",
      }; // Devuelve el estado y mensaje
    }

    // Si la respuesta tiene contenido, procesar el JSON
    return {
      ok: false,
      status: response.status,
      message: await response.json(),
    };
  } catch (error) {
    console.error("Error al eliminar noticia:", error);
    throw error;
  }
};

export const fetchEditNotice = async (
  token: string,
  noticeId: string,
  updatedCourse: INotice
) => {
  const response = await fetch(`${apiUrl}/News/${noticeId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updatedCourse),
  });

  if (!response.ok) {
    throw new Error("Error al actualizar el curso");
  }

  return await response.json();
};
