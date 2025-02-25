"use client";
import React, { useEffect, useState } from "react";
import { IOfferCard } from "@/Interfaces/IOffer";
import { BsFillCalendarEventFill } from "react-icons/bs";
import { fetchJobOfferById } from "../Fetchs/OfertasFetch/OfertasFetchs";

interface JobOfferDetailsProps {
  jobId: string;
}

const JobOfferDetails: React.FC<JobOfferDetailsProps> = ({ jobId }) => {
  const [jobOffer, setJobOffer] = useState<IOfferCard | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchJobOffer = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await fetchJobOfferById(jobId);
        if (!data) {
          setJobOffer(null);
        } else {
          setJobOffer(data);
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message || "Hubo un error al obtener la oferta");
        } else {
          setError("Hubo un error desconocido al obtener la oferta");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchJobOffer();
  }, [jobId]);

  const handleDeleteOffer = () => {
    // Lógica para eliminar la oferta
    console.log("Eliminar oferta", jobId);
  };

  const handleEditOffer = () => {
    // Lógica para modificar la oferta
    console.log("Modificar oferta", jobId);
  };

  const handleViewApplications = () => {
    // Lógica para ver las aplicaciones de la oferta
    console.log("Ver aplicaciones de la oferta", jobId);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full py-6">
        <p className="text-center text-lg text-gray-600">Cargando...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-full py-6">
        <p className="text-center text-lg text-red-600">{error}</p>
      </div>
    );
  }

  if (!jobOffer) {
    return (
      <div className="flex justify-center items-center h-full py-6">
        <p className="text-center text-lg text-gray-500">Aún no tienes ofertas publicadas.</p>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-100 rounded-lg shadow-lg max-w-4xl mx-auto my-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-800">{jobOffer.title}</h2>
        <span className="text-sm text-gray-500">{jobOffer.status}</span>
      </div>
      <p className="text-gray-700 mb-6 text-lg">{jobOffer.description}</p>

      <div className="flex items-center space-x-4 mb-6">
        <div className="flex items-center space-x-2">
          <BsFillCalendarEventFill className="text-gray-600 text-xl" />
          <p className="text-sm text-gray-600">
            Publicado: {new Date(jobOffer.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-gray-700">Ubicación:</span>
          <span className="text-gray-600">{jobOffer.location}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-gray-700">Salario:</span>
          <span className="text-gray-600">{jobOffer.salary}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-gray-700">Competencias:</span>
          <ul className="list-disc pl-5 text-gray-600">
            {jobOffer.competencies.map((competency, index) => (
              <li key={index}>{competency}</li>
            ))}
          </ul>
        </div>
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-gray-700">Países:</span>
          <ul className="list-disc pl-5 text-gray-600">
            {jobOffer.countries.map((country, index) => (
              <li key={index}>{country}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Botones de acción */}
      <div className="flex justify-end space-x-4 mt-6">
        <button
          onClick={handleEditOffer}
          className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Modificar oferta
        </button>
        <button
          onClick={handleDeleteOffer}
          className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
        >
          Eliminar oferta
        </button>
        <button
          onClick={handleViewApplications}
          className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
        >
          Ver aplicaciones
        </button>
      </div>
    </div>
  );
};

export default JobOfferDetails;
