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

  // Opciones de idiomas
  const languages = ["Español", "Ingles", "Italiano"];

  // Opciones de modalidad de cursos
  const modalitys = ["Presencial", "Online", "Presencial + Online"];

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const cursosData = await getCursos();
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

  if (error) return <p>{error}</p>;

  const handleVerCursoClick = (id: string) => {
    setLoadingCurso(true);

    setTimeout(() => {
      setLoadingCurso(false);
      router.push(`/cursos/${id}`);
    }, 2000);
  };

  return (
    <div className="min-h-[80vh] mt-12 p-4 pt-[4rem] bg-gray-100 sm:p-6 sm:pt-[4rem] lg:p-12 lg:pb-16">
      <h1 className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white text-[1.8rem] p-2 font-semibold text-center mb-4">
        CURSOS Y FORMACIONES
      </h1>

      <div className="flex flex-col gap-4 justify-between w-full py-[1.5rem] max-w-[100rem] mx-auto md:flex-row">
        {/* Filtros */}
        <div className="flex flex-wrap gap-4 lg:flex-nowrap">
          {/* Filtro por tipo de contrato */}

          <select
            value={languageFilter}
            onChange={(e) => setLanguageFilter(e.target.value)}
            className="w-full md:max-w-[15rem] md:min-w-[12rem] p-2 border border-gray-300 rounded-md text-gray-700"
          >
            <option value="">Idioma</option>
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
            className="w-full md:max-w-[15rem] md:min-w-[12rem] p-2 border border-gray-300 rounded-md text-gray-700"
          >
            <option value="">Modalidad de curso</option>
            {modalitys.map((mod) => (
              <option key={mod} value={mod}>
                {mod}
              </option>
            ))}
          </select>
        </div>

        {/* Barra de búsqueda */}
        <div className="flex justify-center items-center w-full md:max-w-[20rem] sm:text-xs md:text-md lg:text-md">
          <input
            type="text"
            placeholder="Buscar por título, modalidad, idioma o ubicación..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md text-gray-700"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 max-w-[100rem] mx-auto sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
        {filteredCursos.length ? (
          filteredCursos.map((curso, index) => (
            <CursoCard
              curso={curso}
              key={index}
              handleVerCursoClick={() => handleVerCursoClick(curso.id)}
            />
          ))
        ) : (
          <p className="text-gray-700 text-[1.2rem]">
            No se encontraron cursos.
          </p>
        )}
      </div>

      {loadingCurso && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center h-full">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-400"></div>
        </div>
      )}

      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center h-full">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-400"></div>
        </div>
      )}
    </div>
  );
};

export default CursosList;
