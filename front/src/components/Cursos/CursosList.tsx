"use client";
import React, { useContext, useEffect, useState } from "react";
import { ICurso } from "@/Interfaces/ICursos";
import Image from "next/image";
import { getCursos } from "@/components/Fetchs/AdminFetchs/AdminUsersFetch";
import Link from "next/link";
import CursoCard from "./CursoCard";
import { useRouter } from "next/navigation";

const CursosList = () => {
  const [cursos, setCursos] = useState<ICurso[]>([]);
  const [filteredCursos, setFilteredCursos] = useState<ICurso[]>([]);
  const [languageFilter, setLanguageFilter] = useState<string>("");
  const [modalityFilter, setModalityFilter] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingCurso, setLoadingCurso] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const asd = [
    {
      id: "139f2cc9-e1cf-40b7-b895-a76c6f738bbe",
      image:
        "https://res.cloudinary.com/dagcofbhm/image/upload/v1746620093/e8fx36diyhko5adsq4k3.jpg",
      title: "Curso de Analista Táctico en Fútbol",
      description:
        "Aprendé a analizar partidos de forma profesional utilizando herramientas como Wyscout, LongoMatch y conceptos de táctica moderna. Ideal para entrenadores, scouts y analistas de video.",
      category: "Curso",
      country: "España ",
      language: "Español",
      modality: "100% Online Virtual",
      contact: "info@escueladefutbolpro.com",
    },
    {
      id: "6ac4f93e-b963-4ec4-898f-bda508064e36",
      image:
        "https://res.cloudinary.com/dagcofbhm/image/upload/v1746620238/gmr1nf0ayijb1tn1wr1u.jpg",
      title: " Preparación Física en el Fútbol de Alto Rendimiento",
      description:
        "Curso dictado por preparadores físicos con experiencia en clubes de Primera División. Se abordan metodologías de entrenamiento, control de cargas y prevención de lesiones.\n\n",
      category: "Master",
      country: "Argentina ",
      language: "Español",
      modality: "Presencial (BuenosAires)",
      contact: " contacto@pfutbol.ar",
    },
    {
      id: "65a722c9-0e82-4f13-967f-f727f206b385",
      image:
        "https://res.cloudinary.com/dagcofbhm/image/upload/v1746620297/n8ble9vt0o4xfdn5ogwc.jpg",
      title: "UEFA C Coaching License",
      description:
        "Formación oficial de la Federación Italiana de Fútbol para entrenadores que buscan iniciarse profesionalmente. Certificación reconocida por UEFA.",
      category: "Diplomatura",
      country: "Italia ",
      language: "Italiano",
      modality: "Presencial + Online (híbrido)",
      contact: " info@figc.it",
    },
    {
      id: "41216623-a45d-4f3a-a167-4cede484cdc3",
      image:
        "https://res.cloudinary.com/dagcofbhm/image/upload/v1746620350/rgxpgqdpnnlysgiw57x3.png",
      title: "Gestión Deportiva y Dirección de Clubes",
      description:
        "Curso diseñado para futuros dirigentes y gestores deportivos. Incluye módulos sobre finanzas, marketing, estructuras de club y legislación deportiva.",
      category: "Seminario",
      country: "México",
      language: "Español",
      modality: "Online",
      contact: "cursos@futbolmanagement.mx",
    },
    {
      id: "83a1b72f-a380-40ee-9249-d65a9394bbbd",
      image:
        "https://res.cloudinary.com/dagcofbhm/image/upload/v1746620395/x3bnzmlekflhcsfxngui.webp",
      title: " Curso Intensivo de Nutrición para Futbolistas",
      description:
        "Enfocado en mejorar la alimentación de jugadores, tanto en etapas de formación como en el alto rendimiento. Ideal para futbolistas, entrenadores y nutricionistas deportivos.",
      category: "Curso",
      country: "Colombia",
      language: "Español",
      modality: "Online",
      contact: "contacto@nutrifutbol.co",
    },
    {
      id: "a7ded207-175a-4eb8-8b0c-54911b9dd092",
      image:
        "https://res.cloudinary.com/dagcofbhm/image/upload/v1746620453/ypx6az4nwkruq05wa6t0.jpg",
      title: "Scouting y Captación de Talento en Fútbol Juvenil",
      description:
        "Curso especializado en la identificación y evaluación de jóvenes talentos. Ideal para clubes, academias y agencias interesadas en mejorar su red de captación.",
      category: "Curso",
      country: "Reino Unido",
      language: "Inglés",
      modality: " Online (con sesiones en vivo)",
      contact: " scoutacademy@ukfutbol.org",
    },
  ];

  // Opciones de idiomas
  const languages = ["Español", "Ingles", "Italiano"];

  // Opciones de modalidad de cursos
  const modalitys = ["Presencial", "Online", "Presencial + Online"];

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        // const cursosData = await getCursos();
        const cursosData = asd;
        setCursos(cursosData);
        setFilteredCursos(cursosData);
      } catch {
        setError("No se pudieron cargar los cursos");
      } finally {
        setLoading(false);
      }
    };

    fetchCursos();
  }, []);

  useEffect(() => {
    let filtered = cursos;

    // Filtro por idioma
    if (languageFilter) {
      filtered = filtered.filter((curso) =>
        curso.language?.includes(languageFilter)
      );
    }

    // Filtro por modalidad
    if (modalityFilter) {
      filtered = filtered.filter((offer) =>
        offer.modality?.includes(modalityFilter)
      );
    }

    // Filtro por términos de búsqueda
    if (searchTerm) {
      filtered = filtered.filter((curso) => {
        const lowerSearchTerm = searchTerm.toLowerCase();
        return (
          curso.language?.toLowerCase().includes(lowerSearchTerm) ||
          curso.modality?.toLowerCase().includes(lowerSearchTerm) ||
          curso.title?.toLowerCase().includes(lowerSearchTerm) ||
          curso.country?.toLowerCase().includes(lowerSearchTerm)
        );
      });
    }

    setFilteredCursos(filtered);
  }, [searchTerm, languageFilter, modalityFilter, cursos]);

  // const sortedCursos = filteredCursos.slice().sort((a, b) => {
  //   return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  // });

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  const handleVerCursoClick = (id: string) => {
    setLoadingCurso(true);

    setTimeout(() => {
      setLoadingCurso(false);
      router.push(`/cursos/${id}`);
    }, 2000);
  };

  return (
    <div className="mt-12 p-4 sm:p-6 lg:p-12">
      <h1 className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white p-2 font-semibold text-center mb-4">
        CURSOS Y FORMACIONES
      </h1>

      <div className="flex justify-between w-full py-[1.5rem] max-w-[100rem] mx-auto">
        {/* Filtros */}
        <div className="flex flex-wrap justify-end gap-4 lg:flex-nowrap">
          {/* Filtro por tipo de contrato */}

          <select
            value={languageFilter}
            onChange={(e) => setLanguageFilter(e.target.value)}
            className="w-full max-w-[15rem] p-2 border border-gray-300 rounded-md text-gray-700"
          >
            <option value="">Seleccionar un idioma</option>
            {languages.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>

          {/* Filtro por posición */}

          <select
            value={modalityFilter}
            onChange={(e) => setModalityFilter(e.target.value)}
            className="w-full max-w-[15rem] p-2 border border-gray-300 rounded-md text-gray-700"
          >
            <option value="">Seleccionar la modalidad de curso</option>
            {modalitys.map((mod) => (
              <option key={mod} value={mod}>
                {mod}
              </option>
            ))}
          </select>
        </div>

        {/* Barra de búsqueda */}
        <div className="flex justify-center items-center w-full max-w-[20rem] sm:text-xs md:text-md lg:text-md">
          <input
            type="text"
            placeholder="Buscar por título, modalidad, idioma o ubicación..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md text-gray-700"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 max-w-[100rem] mx-auto sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 hover:cursor-pointer">
        {filteredCursos.length &&
          filteredCursos.map((curso, index) => (
            <CursoCard
              curso={curso}
              key={index}
              handleVerCursoClick={() => handleVerCursoClick(curso.id)}
            />
          ))}
      </div>

      {loadingCurso && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center h-full">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-400"></div>
        </div>
      )}
    </div>
  );
};

export default CursosList;
