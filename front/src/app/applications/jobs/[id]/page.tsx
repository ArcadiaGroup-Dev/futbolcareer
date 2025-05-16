"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import JobApplications from "@/components/Jobs/JobApplications";

const JobApplicationsPage: React.FC = () => {
  const { id } = useParams(); 
  const [jobId, setJobId] = useState<string | null>(null);

  const asd = [
    {
        "id": "ffe9bae3-17a4-4a1e-a7e4-6caee4b30472",
        "message": "Mensaje de aplicación",
        "status": "PENDING",
        "appliedAt": "2025-05-08T20:59:43.116Z",
        "player": {
            "id": "16a3ee5c-64a7-428c-a000-b84ae3112763",
            "name": "Mel",
            "ubicacionActual": "Argentina",
            "lastname": "Hell",
            "nameAgency": null,
            "email": "test@gmail.com",
            "password": "$2b$10$WQQPk8r9iT/1E/Sg/YM3tu4cX97sEmaAgMoeq2E7mdpBoynhCARpW",
            "puesto": "Jugador",
            "role": "PLAYER",
            "imgUrl": null,
            "phone": null,
            "nationality": "",
            "location": null,
            "genre": "Femenino",
            "birthday": null,
            "countryToWork": null,
            "pasaporteUe": null,
            "height": null,
            "age": null,
            "weight": null,
            "skillfulFoot": null,
            "bodyStructure": null,
            "habilities": null,
            "primaryPosition": null,
            "secondaryPosition": null,
            "videoUrl": null,
            "trayectorias": null,
            "socialMedia": null,
            "subscription": null,
            "cv": null
        }
    },
    {
        "id": "233b8baa-c56f-43f1-aba1-7db4980a7e3a",
        "message": "Mensaje de aplicación",
        "status": "PENDING",
        "appliedAt": "2025-05-10T01:11:56.642Z",
        "player": {
            "id": "6e19ca43-9770-4d1c-ae1c-61d7e1d149c4",
            "name": "federico",
            "ubicacionActual": "buenos aires ",
            "lastname": "suarez",
            "nameAgency": null,
            "email": "coflipweb@gmail.com",
            "password": "$2b$10$RyZ7y9sC49WjRH0GvzUpke5gKf6tR.JKWFBMV0xsPgKOCEESBN9N2",
            "puesto": "Entrenador",
            "role": "PLAYER",
            "imgUrl": null,
            "phone": null,
            "nationality": "",
            "location": null,
            "genre": "Masculino",
            "birthday": null,
            "countryToWork": null,
            "pasaporteUe": null,
            "height": null,
            "age": null,
            "weight": null,
            "skillfulFoot": null,
            "bodyStructure": null,
            "habilities": null,
            "primaryPosition": null,
            "secondaryPosition": null,
            "videoUrl": null,
            "trayectorias": null,
            "socialMedia": null,
            "subscription": null,
            "cv": null
        }
    }
]

  useEffect(() => {
   
    if (typeof id === "string") {
      setJobId(id);
    }
  }, [id]); 

  
  if (!jobId) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-center text-lg text-gray-600">Cargando...</p>
      </div>
    );
  }

  return (
    <div>
   
      <JobApplications jobId={jobId} />
    </div>
  );
};

export default JobApplicationsPage;