export interface IOffer {
  id: number;
  title: string;
  description: string;
  projectDescription: string;
  requirements: string[];
  responsibilities: string[];
  skills: string[];
  country: string;
  location?: string; // Cambiado a opcional
  category: string;
  contract: string;
  position?: string;
  flagCode?: string;
  salary: string;
}

export interface IOfferCard {
  offerType: string;
  id?: string;
  title: string;
  nationality: string;
  location: string;
  position: string;
  category: string;
  sportGenres: string;
  sport: string;
  contractTypes: string;
  contractDurations: string;
  salary: number;
  transport: string[];
  minAge: number;
  maxAge: number;
  availabilityToTravel: YesOrNotravell;
  euPassport: YesOrNo;
  gmail?: string;
  imgUrl: string;
  extra: string[];
  minExperience: string;
  createdAt: string;
  status: string;
  type: string;
  description?: string;
  competencies?: string[]; // Ahora es un arreglo de strings
  countries?: string[]; // Ahora es un arreglo de strings
  recruiter: {
    id: string;
    role: "RECRUITER" | "AGENCY"; // roles posibles para el reclutador
  };
}

export interface IApplication {
  message: string;
  userId: string;
  jobId: string;
}

export interface ICreateJobOffer {
  title: string;
  description: string;
  location: string;
  salary: number;
  offerType: string;
  position: string;
  competencies: string[];
  countries: string[];
  imgUrl: string;
  type: string;
}

export interface IJobApplication {
  id?: string;
  message: string; // Mensaje enviado con la postulación
  status: string; // Estado de la postulación (por ejemplo, "PENDING", "OPEN", etc.)
  appliedAt: string; // Fecha en que se aplicó (puede ser un string de fecha)
  player: {
    // Datos del postulante
    id: string;
    // Puedes agregar más propiedades del jugador si lo necesitas
  };
  nationality: string;
  location: string;
  position: string;
  category: string;
  sportGenres: string;
  sport: string;
  transport: string[];
  age: number;
  availabilityToTravel: YesOrNotravell;
  euPassport: YesOrNo;
  gmail?: string;
  minExperience: string;
}

export enum JobStatus {
  OPEN = "OPEN",
  PENDING = "PENDING",
  CLOSED = "CLOSED",
}

export interface ICreateJob {
  title: string;
  nationality: string;
  location: string;
  position: string;
  category: string;
  sportGenres: string;
  sport: string;
  contractTypes: string;
  contractDurations: string;
  salary: number;
  minAge: number;
  maxAge: number;
  availabilityToTravel: YesOrNotravell;
  euPassport: YesOrNo;
  gmail?: string;
  imgUrl: string;
  extra: string[];
  minExperience: string;
}

export enum YesOrNo {
  SI = "Si",
  NO = "No",
}

export enum YesOrNotravell {
  SI = "Si",
  NO = "No",
}
