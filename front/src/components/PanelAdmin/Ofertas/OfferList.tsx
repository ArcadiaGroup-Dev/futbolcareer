"use client";
import React, { useContext, useEffect, useState } from "react";
import CardOffer from "./CardOffer";
import { IOfferCard } from "@/Interfaces/IOffer";
import { getOfertas } from "@/components/Fetchs/OfertasFetch/OfertasAdminFetch";
import { UserContext } from "@/components/Context/UserContext";
import ModalApplication from "@/components/Applications/ModalApplications";

const OfferList: React.FC = () => {
  const [offers, setOffers] = useState<IOfferCard[]>([]);
  const [filteredOffers, setFilteredOffers] = useState<IOfferCard[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [contractTypeFilter, setContractTypeFilter] = useState<string>("");
  const [positionFilter, setPositionFilter] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isToken, setIsTokene] = useState(false);
  const [isOffer, setIsOffer] = useState<IOfferCard>();
  const { token } = useContext(UserContext);

  const decodeToken = (token: string) => {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => `%${("00" + c.charCodeAt(0).toString(16)).slice(-2)}`)
        .join("")
    );
    return JSON.parse(jsonPayload);
  };

  const userId = token ? decodeToken(token).id : null;

  // Opciones de tipo de contrato
  const contractTypes = [
    "Contrato Profesional",
    "Semiprofesional",
    "Amateur",
    "Contrato de cesión",
    "Prueba",
  ];

  // Opciones de posición
  const positions = [
    "Abogado",
    "Administrativo",
    "Agente",
    "Árbitro",
    "Analista",
    "Científico Deportivo",
    "Coordinador",
    "Comercial",
    "Delegado",
    "Director Deportivo",
    "Director de Negocio",
    "Director Técnico",
    "Diseñador Gráfico",
    "Editor Multimedia",
    "Entrenador",
    "Entrenador de Porteros",
    "Ejecutivo",
    "Fisioterapeuta",
    "Finanzas",
    "Gerente",
    "Inversor",
    "Jefe de Reclutamiento",
    "Jugador",
    "Marketing Digital",
    "Médico",
    "Nutricionista",
    "Ojeador Scout",
    "Periodista",
    "Preparador Físico",
    "Profesor",
    "Psicólogo",
    "Recursos Humanos",
    "Representante",
    "Terapeuta",
    "Utillero",
  ];

  const asd = [
    {
      id: "ffbfcbd8-3a0c-4d27-9689-b47ae6f206aa",
      title: "Futbolistas para liga amateur de Italia",
      location: "Otranto ",
      salary: "600-800",
      createdAt: "2025-05-05T11:33:11.755Z",
      description:
        "Club de la liga Promozione de Italia busca futbolistas con pasaporte europeo.\n-Delantero\n-Defensa central",
      status: "OPEN",
      contractDurations: "Por temporada",
      position: "Jugador",
      extra: [
        "Sueldo fijo",
        "Alojamiento incluido",
        "Viáticos incluidos",
        "Equipamiento deportivo",
      ],
      nationality: "Italy",
      imgUrl:
        "https://res.cloudinary.com/dagcofbhm/image/upload/v1746444787/dwkpuxmpyowuwbsl8aip.png",
      contractTypes: "Amateur",
      category: "Amateur",
      sportGenres: "Masculino",
      moneda: null,
      minAge: 17,
      maxAge: 26,
      sport: "Fútbol 11",
      minExperience: "Semiprofesional",
      availabilityToTravel: "Si",
      euPassport: "Si",
      currencyType: "EUR",
      recruiter: {
        id: "4785a053-1f5d-4a48-a214-f64a48608a9f",
        name: "Ismael",
        ubicacionActual: "Italia",
        lastname: "Ulman",
        nameAgency: "Otranto ",
        email: "rlbalista@hotmail.com",
        password:
          "$2b$10$cbE6DxCP4FqIOZAGfsqXnOh82e58KRhpVHyyVleMerW0lYe18Xkha",
        puesto: "Club amateur",
        role: "RECRUITER",
        imgUrl:
          "https://res.cloudinary.com/dagcofbhm/image/upload/v1746444677/g5jatugqku3tnybklhnh.png",
        phone: "392 369 8639",
        nationality: "Italy",
        location: "Otranto",
        genre: "Masculino",
        birthday: null,
        countryToWork: null,
        pasaporteUe: null,
        height: null,
        age: 1945,
        weight: null,
        skillfulFoot: null,
        bodyStructure: null,
        habilities: null,
        primaryPosition: null,
        secondaryPosition: null,
        videoUrl: null,
        trayectorias: null,
        socialMedia: {
          website:
            "https://www.tuttocampo.it/Puglia/Promozione/GironeB/Squadra/CittaDiOtranto/720072/Scheda",
        },
        subscription: null,
        cv: null,
      },
    },
    {
      id: "8010f751-6978-4170-afeb-0d7142db606a",
      title: "Futbolistas para club de 4ª división de Finlandia",
      location: "",
      salary: "700/800",
      createdAt: "2025-05-05T11:36:49.330Z",
      description:
        "Posiciones:\n\n– Portero, defensa central, centrocampista de contención y delantero.",
      status: "OPEN",
      contractDurations: "Por temporada",
      position: "Jugador",
      extra: [
        "Sueldo fijo",
        "Alojamiento incluido",
        "Viáticos incluidos",
        "Bonos por rendimiento",
        "Equipamiento deportivo",
      ],
      nationality: "Finland",
      imgUrl:
        "https://res.cloudinary.com/dagcofbhm/image/upload/v1746445003/ekp5gkvfahcshy8g3abd.png",
      contractTypes: "Semiprofesional",
      category: "Semiprofesional",
      sportGenres: "Masculino",
      moneda: null,
      minAge: 19,
      maxAge: 24,
      sport: "Fútbol 11",
      minExperience: "Semiprofesional",
      availabilityToTravel: "Si",
      euPassport: "Si",
      currencyType: "EUR",
      recruiter: {
        id: "4785a053-1f5d-4a48-a214-f64a48608a9f",
        name: "Ismael",
        ubicacionActual: "Italia",
        lastname: "Ulman",
        nameAgency: "Otranto ",
        email: "rlbalista@hotmail.com",
        password:
          "$2b$10$cbE6DxCP4FqIOZAGfsqXnOh82e58KRhpVHyyVleMerW0lYe18Xkha",
        puesto: "Club amateur",
        role: "RECRUITER",
        imgUrl:
          "https://res.cloudinary.com/dagcofbhm/image/upload/v1746444677/g5jatugqku3tnybklhnh.png",
        phone: "392 369 8639",
        nationality: "Italy",
        location: "Otranto",
        genre: "Masculino",
        birthday: null,
        countryToWork: null,
        pasaporteUe: null,
        height: null,
        age: 1945,
        weight: null,
        skillfulFoot: null,
        bodyStructure: null,
        habilities: null,
        primaryPosition: null,
        secondaryPosition: null,
        videoUrl: null,
        trayectorias: null,
        socialMedia: {
          website:
            "https://www.tuttocampo.it/Puglia/Promozione/GironeB/Squadra/CittaDiOtranto/720072/Scheda",
        },
        subscription: null,
        cv: null,
      },
    },
    {
      id: "fa3c7f81-8fde-47c3-858e-151a7ce9111c",
      title: "Futbolistas para club de Serie B de Italia",
      location: "Bari",
      salary: "20000",
      createdAt: "2025-05-05T11:38:35.054Z",
      description:
        "– Enviar video highlight del jugador (actualizado).\n\n– Solo jugador directo y libre o agente que controle al jugador al 100%.",
      status: "OPEN",
      contractDurations: "Por temporada",
      position: "Jugador",
      extra: [
        "Sueldo fijo",
        "Transporte incluido",
        "Alojamiento incluido",
        "Viáticos incluidos",
        "Bonos por rendimiento",
        "Equipamiento deportivo",
      ],
      nationality: "Italy",
      imgUrl:
        "https://res.cloudinary.com/dagcofbhm/image/upload/v1746445111/e1xpg5n8ksqjfp1udkhd.png",
      contractTypes: "",
      category: "Profesional",
      sportGenres: "",
      moneda: null,
      minAge: 19,
      maxAge: 24,
      sport: "",
      minExperience: "Experiencia en ligas similares",
      availabilityToTravel: "Si",
      euPassport: "Si",
      currencyType: "EUR",
      recruiter: {
        id: "4785a053-1f5d-4a48-a214-f64a48608a9f",
        name: "Ismael",
        ubicacionActual: "Italia",
        lastname: "Ulman",
        nameAgency: "Otranto ",
        email: "rlbalista@hotmail.com",
        password:
          "$2b$10$cbE6DxCP4FqIOZAGfsqXnOh82e58KRhpVHyyVleMerW0lYe18Xkha",
        puesto: "Club amateur",
        role: "RECRUITER",
        imgUrl:
          "https://res.cloudinary.com/dagcofbhm/image/upload/v1746444677/g5jatugqku3tnybklhnh.png",
        phone: "392 369 8639",
        nationality: "Italy",
        location: "Otranto",
        genre: "Masculino",
        birthday: null,
        countryToWork: null,
        pasaporteUe: null,
        height: null,
        age: 1945,
        weight: null,
        skillfulFoot: null,
        bodyStructure: null,
        habilities: null,
        primaryPosition: null,
        secondaryPosition: null,
        videoUrl: null,
        trayectorias: null,
        socialMedia: {
          website:
            "https://www.tuttocampo.it/Puglia/Promozione/GironeB/Squadra/CittaDiOtranto/720072/Scheda",
        },
        subscription: null,
        cv: null,
      },
    },
    {
      id: "a6196214-bd94-4528-ae07-ed5dcc6a4c45",
      title: "Futbolistas para club de liga de Catar",
      location: "",
      salary: "8000",
      createdAt: "2025-05-05T11:41:47.701Z",
      description:
        "Posiciones:\n\n– Lateral derecho (2).\n\n– Centrocampista, área a área (8).",
      status: "OPEN",
      contractDurations: "Contrato Temporal",
      position: "Jugador",
      extra: [
        "Sueldo fijo",
        "Alojamiento incluido",
        "Bonos por rendimiento",
        "Equipamiento deportivo",
        "Viáticos incluidos",
        "Transporte incluido",
      ],
      nationality: "Qatar",
      imgUrl:
        "https://res.cloudinary.com/dagcofbhm/image/upload/v1746445303/vko9s44klupwd7vttoby.png",
      contractTypes: "Contrato Profesional",
      category: "Profesional",
      sportGenres: "Masculino",
      moneda: null,
      minAge: 18,
      maxAge: 24,
      sport: "Fútbol 11",
      minExperience: "Experiencia en ligas similares",
      availabilityToTravel: "Si",
      euPassport: "Si",
      currencyType: "USD",
      recruiter: {
        id: "4785a053-1f5d-4a48-a214-f64a48608a9f",
        name: "Ismael",
        ubicacionActual: "Italia",
        lastname: "Ulman",
        nameAgency: "Otranto ",
        email: "rlbalista@hotmail.com",
        password:
          "$2b$10$cbE6DxCP4FqIOZAGfsqXnOh82e58KRhpVHyyVleMerW0lYe18Xkha",
        puesto: "Club amateur",
        role: "RECRUITER",
        imgUrl:
          "https://res.cloudinary.com/dagcofbhm/image/upload/v1746444677/g5jatugqku3tnybklhnh.png",
        phone: "392 369 8639",
        nationality: "Italy",
        location: "Otranto",
        genre: "Masculino",
        birthday: null,
        countryToWork: null,
        pasaporteUe: null,
        height: null,
        age: 1945,
        weight: null,
        skillfulFoot: null,
        bodyStructure: null,
        habilities: null,
        primaryPosition: null,
        secondaryPosition: null,
        videoUrl: null,
        trayectorias: null,
        socialMedia: {
          website:
            "https://www.tuttocampo.it/Puglia/Promozione/GironeB/Squadra/CittaDiOtranto/720072/Scheda",
        },
        subscription: null,
        cv: null,
      },
    },
    {
      id: "f2e096db-0774-4b7f-9ff1-3965ff31cf87",
      title: "Entrenador profesional para equipo de liga de Arabia Saudí",
      position: "Entrenador",
      sportGenres: "Masculino",
      availabilityToTravel: "Si",
      euPassport: "No",
      currencyType: "USD",
      salary: "",
      minAge: 0,
      maxAge: 0,
      createdAt: "2025-05-05T11:44:31.871Z",
      contractTypes: "Contrato Profesional",
      nationality: "Saudi Arabia",
      contractDurations: "Por temporada",
      minExperience: "Experiencia en ligas similares",
      location: "",
      category: "Profesional",
      sport: "Fútbol 11",
      description:
        "Entrenador profesional portugués para el primer equipo saudí:\n\nLicencia UEFA A.\n\nEl salario es cuestionable.\n\nSe requieren altos logros con clubes portugueses.\n\nCondiciones:\n\nMuy buen contrato",
      imgUrl:
        "https://res.cloudinary.com/dagcofbhm/image/upload/v1746445461/oadccmpinn22ttvmjex6.jpg",
      extra: ["Sueldo fijo", "A convenir"],
      status: "OPEN",
      type: "",
      recruiter: {
        id: "4785a053-1f5d-4a48-a214-f64a48608a9f",
        role: "RECRUITER", // roles posibles para el reclutador
      },
    },
  ];

  useEffect(() => {
    const fetchOffers = async () => {
      setLoading(true);
      // const data = await getOfertas();
      const data = asd;
      setOffers(data);
      setFilteredOffers(data);
      setLoading(false);
    };
    fetchOffers();
  }, []);

  useEffect(() => {
    let filtered = offers;

    // Filtro por tipo de contrato
    if (contractTypeFilter) {
      filtered = filtered.filter((offer) =>
        offer.contractTypes?.includes(contractTypeFilter)
      );
    }

    // Filtro por posición
    if (positionFilter) {
      filtered = filtered.filter((offer) =>
        offer.position?.includes(positionFilter)
      );
    }

    // Filtro por términos de búsqueda
    if (searchTerm) {
      filtered = filtered.filter((offer) => {
        const lowerSearchTerm = searchTerm.toLowerCase();
        return (
          offer.contractTypes?.toLowerCase().includes(lowerSearchTerm) ||
          offer.position?.toLowerCase().includes(lowerSearchTerm) ||
          offer.title?.toLowerCase().includes(lowerSearchTerm) ||
          offer.location?.toLowerCase().includes(lowerSearchTerm)
        );
      });
    }

    setFilteredOffers(filtered);
  }, [searchTerm, contractTypeFilter, positionFilter, offers]);

  if (loading) {
    return (
      <p className="text-center text-gray-600 mt-28">Cargando ofertas...</p>
    );
  }

  const sortedOffers = filteredOffers.slice().sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const handleApplyClick = (offer: string | undefined) => {
    const findOffer = sortedOffers.find((el) => el.id === offer);
    setIsOffer(findOffer);

    if (token) {
      setIsModalOpen(true); // Mostrar la notificación si no hay token
      setIsTokene(false);
      return;
    }
    setIsModalOpen(true);
    setIsTokene(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="mt-12 p-4 sm:p-6 lg:p-12">
      <h1 className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white p-2 font-semibold text-center">
        OFERTAS LABORALES
      </h1>

      <div className="flex justify-between w-full py-[1.5rem] max-w-[100rem] mx-auto">
        {/* Filtros */}
        <div className="flex flex-wrap justify-end gap-4 lg:flex-nowrap">
          {/* Filtro por tipo de contrato */}

          <select
            value={contractTypeFilter}
            onChange={(e) => setContractTypeFilter(e.target.value)}
            className="w-full max-w-[15rem] p-2 border border-gray-300 rounded-md text-gray-700"
          >
            <option value="">Seleccionar tipo de contrato</option>
            {contractTypes.map((contractType) => (
              <option key={contractType} value={contractType}>
                {contractType}
              </option>
            ))}
          </select>

          {/* Filtro por posición */}

          <select
            value={positionFilter}
            onChange={(e) => setPositionFilter(e.target.value)}
            className="w-full max-w-[15rem] p-2 border border-gray-300 rounded-md text-gray-700"
          >
            <option value="">Seleccionar posición</option>
            {positions.map((position) => (
              <option key={position} value={position}>
                {position}
              </option>
            ))}
          </select>
        </div>

        {/* Barra de búsqueda */}
        <div className="flex justify-center items-center w-full max-w-[20rem] sm:text-xs md:text-md lg:text-md">
          <input
            type="text"
            placeholder="Buscar por oferta por título, posición o ubicación..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md text-gray-700"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 max-w-[100rem] mx-auto md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-4">
        {sortedOffers.length > 0 ? (
          sortedOffers.map((offer) => (
            <CardOffer
              handleApplyClick={() => handleApplyClick(offer.id)}
              key={offer.id}
              offer={offer}
            />
          ))
        ) : (
          <p>No se encontraron ofertas.</p>
        )}
        {/* Modal de aplicación */}
        {isModalOpen && isOffer?.id && (
          <ModalApplication
            jobId={isOffer?.id?.toString()}
            userId={userId ? userId.toString() : ""}
            jobTitle={isOffer?.title}
            isOffer={isOffer}
            typeMessage={isToken}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </div>
  );
};

export default OfferList;
