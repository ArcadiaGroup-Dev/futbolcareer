"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import JobApplications from "@/components/Jobs/JobApplications";

const JobApplicationsPage: React.FC = () => {
  const { id } = useParams(); 
  const [jobId, setJobId] = useState<string | null>(null);

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