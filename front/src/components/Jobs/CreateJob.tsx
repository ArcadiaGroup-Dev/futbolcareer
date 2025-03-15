"use client"
import React, { useContext, useState } from "react";
import { UserContext } from "../Context/UserContext";
import { ICreateJob, YesOrNo, YesOrNotravell } from "@/Interfaces/IOffer";
import { fetchCreateJob } from "../Fetchs/OfertasFetch/OfertasFetchs";
import ImageUpload from "../Cloudinary/ImageUpload";
import useNationalities from "../Forms/FormUser/useNationalitys";

const position = [
    "Abogado", "Administrativo", "Agente", "Árbitro", "Analista", "Científico Deportivo",
    "Coordinador", "Comercial", "Delegado", "Director Deportivo", "Director de Negocio",
    "Director Técnico", "Diseñador Gráfico", "Editor Multimedia", "Entrenador", "Entrenador de Porteros",
    "Ejecutivo", "Fisioterapeuta", "Finanzas", "Gerente", "Inversor", "Jefe de Reclutamiento",
    "Jugador", "Marketing Digital", "Médico", "Nutricionista", "Ojeador Scout", "Periodista",
    "Preparador Físico", "Profesor", "Psicólogo", "Recursos Humanos", "Representante", "Terapeuta",
    "Utillero"
  ];
  

const sportGenres = ["Masculino", "Femenino"];
const categories = ["Amateur", "Semiprofesional", "Profesional", "Fútbol base"];
const sports = ["Fútbol 11", "Futsal", "Fútbol Base", "Fútbol Playa", "Pruebas"];
const contractTypes = ["Contrato Profesional", "Semiprofesional", "Amateur", "Contrato de cesión", "Prueba"];
const contractDurations = ["Contrato Temporal", "Por temporada", "Contrato indefinido", "Pasantía/Prácticas", "Freelance", "Autónomo", "Otro tipo de contrato"];
const minExperience = ["Amateur", "Semiprofesional", "Profesional", "Experiencia en ligas similares"];
const extras = ["Sueldo fijo","Transporte incluido", "Bonos por rendimiento", "Viáticos incluidos", "Alojamiento incluido", "No remunerado", "A convenir", "Equipamiento deportivo"];


const FormComponent = () => {
        const { nationalities} = useNationalities();
        const [selectedNationality, setSelectedNationality] = useState<string>('');
        const [isOpen, setIsOpen] = useState<boolean>(false); 
        const [search, setSearch] = useState<string>('');
    const [formData, setFormData] = useState<ICreateJob>({
        title: "",
        nationality: "",
        location:"",
        position: "",
        category: "",
        description:"",
        sport: "",
        contractTypes:"",
        contractDurations: "",
        salary: 0,
        extra: [],
        minAge: 0,
        maxAge: 0,
        sportGenres:"",
        minExperience: "",
        availabilityToTravel: "Si" as YesOrNotravell, 
        euPassport: "Si" as YesOrNo,
        gmail: "",
        imgUrl: "",
    });

    const { token } = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    

 // Maneja el cambio en el campo de búsqueda
 const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);  // Actualiza el texto de búsqueda
    setIsOpen(true);  // Asegura que el dropdown se mantenga abierto mientras se escribe
  };


  // Maneja la selección de una nacionalidad
  const handleSelectNationality = (value: string) => {
    setSelectedNationality(value);  // Actualiza selectedNationality con el valor seleccionado
    setFormData((prevState) => ({
      ...prevState,
      nationality: value,  // Actualiza el estado del formulario
    }));
    setSearch('');  // Limpia el campo de búsqueda
    setIsOpen(false);  // Cierra el dropdown una vez se seleccione una opción
  };

   // Maneja la apertura y cierre del menú
   const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };


  const handleExtraChange = (e: React.ChangeEvent<HTMLInputElement>, extra: string) => {
    const { checked } = e.target;
    setFormData({
        ...formData,
        extra: checked
            ? [...formData.extra, extra]
            : formData.extra.filter(item => item !== extra), 
    });
};


    const isValidImageUrl = (url: string) => {
        const imageRegex = /\.(jpeg|jpg|gif|png|webp|svg)$/i;
        try {
            const parsedUrl = new URL(url, window.location.href); 
            return imageRegex.test(parsedUrl.pathname); 
        } catch {
            return false;
        }
    };

    const handleImageUpload = (url: string) => {
        setFormData((prev) => ({
            ...prev,
            imgUrl: url, 
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(formData);
        setLoading(true);
        setError(null);
        setSuccessMessage(null); 

        if (!isValidImageUrl(formData.imgUrl)) {
            setError("La URL de la imagen no es válida.");
            setLoading(false);
            return;
        }

        if (!token) {
            setError("Token no disponible.");
            setLoading(false);
            return;
        }

        setTimeout(async () => {
            try {
                const response = await fetchCreateJob(formData, token);
                console.log("Oferta creada:", response);
                setSuccessMessage("¡Oferta creada exitosamente!"); 
                setFormData({
                    title: "",
                    nationality: "",
                    location:"",
                    position: "",
                    category: "",
                    sport: "",
                    contractTypes:"",
                    contractDurations: "",
                    salary: 0,
                    extra: [],
                    minAge: 0,
                    description:"",
                    maxAge: 0,
                    sportGenres:"",
                    minExperience: "",
                    availabilityToTravel: "Si" as YesOrNotravell, 
                    euPassport: "Si" as YesOrNo,
                    gmail: "",
                    imgUrl: "",
                });
            } catch (err: unknown) {
                setError(err instanceof Error ? err.message : "Error desconocido");
            } finally {
                setLoading(false);
            }
        }, 2000);
    };

    return (
        <div className="max-w-6xl mx-auto p-4 bg-gray-100  text-gray-700 rounded-lg shadow-lg shadow-gray-400  border-2 hover:cursor-pointer ">
           <div className="max-w-2xl  mx-auto p-4 ">
    <h1 className="text-xl font-bold mb-4 text-center bg-gray-600 text-white p-2 rounded">
        Crear Oferta de Trabajo
    </h1>
</div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4">
                
                <div className="flex flex-col">
                    <label className="text-sm font-bold mb-2">Título</label>
                    <input
                        type="text"
                        className="p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-600"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="Nombre de la oferta laboral"
                    />
                </div>
    
               {/* Nacionalidad */}
        <div className="col-span-1 mb-4 relative">
          <label htmlFor="nationalitySearch" className="block text-sm font-bold mb-2">Buscar Nacionalidad</label>
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Buscar nacionalidad..."
            onClick={toggleDropdown}
            className="w-full border text-gray-600 border-gray-300 rounded-lg p-1 mb-1"
          />
        </div>
  
        {/* Nacionalidad seleccionada */}
        <div className="col-span-1 relative mb-4">
          <label htmlFor="nationality" className="block text-sm font-bold mb-2">Nacionalidad seleccionada
            <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={selectedNationality}
            readOnly
            className="w-full border text-gray-600 border-gray-300 rounded-lg p-1 mb-1"
          />
        </div>
  
        <div className="flex flex-col">
                    <label className="text-sm font-bold mb-2">Ciudad:</label>
                    <input
                        type="text"
                        className="p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-600"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="Ciudad de la oferta laboral"
                    />
                </div>
    
        {/* Dropdown de opciones */}
        {isOpen && (
          <div className="absolute z-10 w-full sm:w-auto max-w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-1 max-h-60 overflow-auto">
            {loading && <p>Cargando nacionalidades...</p>}
            {error && <p className="text-red-500">{error}</p>}
            <ul>
              {nationalities
                .filter((nationality) =>
                  nationality.label.toLowerCase().includes(search.toLowerCase())
                )
                .map((nationality) => (
                  <li
                    key={nationality.value}
                    className="p-2 cursor-pointer text-gray-700 hover:bg-gray-200"
                    onClick={() => handleSelectNationality(nationality.label)}
                  >
                    {nationality.label}
                  </li>
                ))}
            </ul>
          </div>
        )}
    
                <div className="flex flex-col">
                    <label className="text-sm font-bold  mb-2">Posición</label>
                    <select
                        className="p-1 mb-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-600"
                        value={formData.position}
                        onChange={(e) => setFormData({ ...formData,position: e.target.value })}
                    >
                        {position.map((position, index) => (
                            <option key={index} value={position}>{position}</option>
                        ))}
                    </select>
                </div>
    
                <div className="flex flex-col">
                    <label className="text-sm font-bold mb-2">Categoría</label>
                    <select
                        className="p-1 mb-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-600"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                        {categories.map((category, index) => (
                            <option key={index} value={category}>{category}</option>
                        ))}
                    </select>
                </div>
                
                <div className="flex flex-col">
                    <label className="text-sm font-bold mb-2">Género deporte</label>
                    <select
                        className="p-1 mb-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-600"
                        value={formData.sportGenres}
                        onChange={(e) => setFormData({ ...formData,sportGenres: e.target.value })}
                    >
                        {sportGenres.map((sportGenres, index) => (
                            <option key={index} value={sportGenres}>{sportGenres}</option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-bold mb-2">Modalidad</label>
                    <select
                        className="p-1 mb-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-600"
                        value={formData.sport}
                        onChange={(e) => setFormData({ ...formData, sport: e.target.value })}
                    >
                        {sports.map((sport, index) => (
                            <option key={index} value={sport}>{sport}</option>
                        ))}
                    </select>
                </div>
 
                <div className="flex flex-col">
                    <label className="text-sm font-bold mb-2">Tipo de contrato</label>
                    <select
                        className="p-1 mb-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-600"
                        value={formData.contractTypes}
                        onChange={(e) => setFormData({ ...formData,contractTypes: e.target.value })}
                    >
                        {contractTypes.map((contractTypes, index) => (
                            <option key={index} value={contractTypes}>{contractTypes}</option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-bold mb-2">Tiempo de contrato</label>
                    <select
                        className="p-1 mb-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-600"
                        value={formData.contractDurations}
                        onChange={(e) => setFormData({ ...formData,contractDurations: e.target.value })}
                    >
                          {contractDurations.map((duration, index) => (
                        <option key={index} value={duration}>{duration}</option>
                    ))}
                    </select>
                  

                </div>

      
                <div className="flex flex-col">
                <label className="text-sm font-bold mb-2">Salario</label>
                <input
                    type="number"
                    className="p-1 mb-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-600"
                    value={formData.salary === 0 ? '' : formData.salary}
                    onChange={(e) => {
                        const value = e.target.value;
                        setFormData({
                            ...formData,
                            salary: value === '' ? 0 : Number(value),
                        });
                    }}
                />
            </div>



                <div className="flex flex-col">
                    <label className="text-sm font-bold mb-2">Edad mínima</label>
                    <input
                    type="number"
                    className="p-1 mb-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-600"
                    value={formData.minAge === 0 ? '' : formData.minAge}
                    onChange={(e) => {
                        const value = e.target.value;
                        setFormData({
                            ...formData,
                            minAge: value === '' ? 0 : Number(value),
                        });
                    }}
                />
                </div>
    
                <div className="flex flex-col">
                    <label className="text-sm font-bold mb-2">Edad máxima</label>
                    <input
                    type="number"
                    className="p-1 mb-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-600"
                    value={formData.maxAge === 0 ? '' : formData.maxAge}
                    onChange={(e) => {
                        const value = e.target.value;
                        setFormData({
                            ...formData,
                            maxAge: value === '' ? 0 : Number(value),
                        });
                    }}
                />
                </div>

              
                                           
    
                <div className="flex flex-col">
                    <label className="text-sm font-bold mb-2">Experiencia mínima</label>
                    <select
                        className="p-1 mb-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-600"
                        value={formData.minExperience}
                        onChange={(e) => setFormData({ ...formData,minExperience: e.target.value })}
                    >
                        {minExperience.map((minExperience, index) => (
                            <option key={index} value={minExperience}>{minExperience}</option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-bold mb-2">Mínimo de experiencia:</label>
                    <input
                        type="text"
                        className="p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-600"
                        value={formData.minExperience}
                        onChange={(e) => setFormData({ ...formData, minExperience: e.target.value })}
                        placeholder="Mínimo de experiencia de la oferta laboral"
                    />
                </div>
    
               

    
                <div className="flex flex-col">
                    <label className="text-sm font-bold mb-2">Pasaporte de la UE</label>
                    <select
                        className="p-1 mb-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-600"
                        value={formData.euPassport}
                        onChange={(e) => setFormData({ ...formData, euPassport: e.target.value as YesOrNo })}
                    >
                        <option value="Si">Si</option>
                        <option value="No">No</option>
                    </select>

                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-bold mb-2">Disponibilidad para viajar:</label>
                    <select
                        className="p-1 mb-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-600"
                        value={formData.availabilityToTravel}
                        onChange={(e) => setFormData({ ...formData, availabilityToTravel: e.target.value as YesOrNotravell })}
                    >
                        <option value="Si">Si</option>
                        <option value="No">No</option>
                    </select>

                </div>
    
                <div className="flex flex-col">
                    <label className="text-sm font-bold mb-2">Gmail (opcional)</label>
                    <input
                        type="email"
                        className="p-1 mb-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-600"
                        value={formData.gmail}
                        onChange={(e) => setFormData({ ...formData, gmail: e.target.value })}
                    />
                </div>
    
                <div className="flex flex-col">
                <label className="text-sm font-bold mb-2">Descripción</label>
                <textarea
                    name="description"
                    maxLength={50}  
                    className="p-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-600"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Escribe una breve descripción..."
                />
                <p className="text-xs text-gray-500">{50 - formData.description.length} caracteres restantes</p>
                </div>
                
                <div className="flex flex-col border-2 border-gray-300 p-2 rounded">
                <label className="text-sm font-bold">Extras al salario</label> <p className="mb-2 text-sm">(haz click en las que desees agregar)</p>
                <div className="flex flex-wrap gap-2">
                    {extras.map((extra, index) => (
                        <div key={index} className="flex items-center">
                            <input
                                type="checkbox"
                                id={`extra-${index}`}
                                value={extra}
                                checked={formData.extra.includes(extra)} // Verifica si la opción está seleccionada
                                onChange={(e) => handleExtraChange(e, extra)} // Llama a la función de manejo
                                className="p-2 border text-gray-600 border-gray-300 rounded-md"
                            />
                            <label htmlFor={`extra-${index}`} className="ml-2">{extra}</label>
                        </div>
                    ))}
                </div>
            </div>

               
    
            <div className="flex flex-col md:col-span-2 mt-4">
  <label className="text-sm font-bold mb-2">Cargar Imagen</label>
  <div className="w-full">
    <ImageUpload onUpload={handleImageUpload} />
  </div>
</div>
    
<div className="max-w-2xl mx-auto p-4">
    <div className="max-w-6xl mx-auto p-4">
        <button
            type="submit"
            className="text-xl w-full font-bold mb-4 text-center bg-gray-600 text-white p-2 rounded hover:bg-gray-700"
            disabled={loading}
        >
            {loading ? "Creando oferta..." : "Crear Oferta"}
        </button>
    </div>
</div>


                {error && <p className="col-span-1 md:col-span-2 lg:col-span-3 text-red-500 mt-4">{error}</p>}
                {successMessage && <p className="col-span-1 md:col-span-2 lg:col-span-3 text-green-700 mt-4">{successMessage}</p>}
            </form>
        </div>
    );
    
};

export default FormComponent;
