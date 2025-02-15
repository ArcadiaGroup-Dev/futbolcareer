"use client";

import Image from "next/image";
import { useState, useEffect, useContext } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; 
import {  FaInstagram, FaTwitter } from "react-icons/fa";
import { IProfileData} from "@/Interfaces/IUser";
import { UserContext } from "@/components/Context/UserContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import userH from "@/helpers/helperUser";
import JobOfferForm from "@/components/Jobs/JobOfferForm";

const PanelManager = () => {
  const {token,logOut} = useContext(UserContext);
  const [activeSection, setActiveSection] = useState("profile");
  const [userData, setUserData] = useState<IProfileData | null>(null);
  const [error, setError] = useState<string | null>(null);
 
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
 const router = useRouter();
  const handleSectionChange = (section: string) => {
    setActiveSection(section);
  };

  const handleLogOut = () => {
    logOut(); 
    router.push('/'); 
  };
  
  
  useEffect(() => {
    if (token) {
      try {
        const userId = JSON.parse(atob(token.split('.')[1])).id;

        if (userId) {
          fetch(`${apiUrl}/user/${userId}`)
            .then((response) => {
              if (!response.ok) {
                throw new Error('Failed to fetch user data');
              }
              return response.json();
            })
            .then((data) => {
              setUserData(data);
            })
            .catch((error) => {
              console.error('Error fetching user data:', error);
              setError('Failed to load user data.');
            });
        }
      } catch (error) {
        setError('Error decoding token or fetching user data.');
        console.error('Error:', error);
      }
    }
  }, [token, apiUrl]);

  // Inicializamos AOS cuando el componente se monta
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="flex min-h-screen mt-24 text-black bg-gray-50">
      {/* Panel izquierdo: Datos del usuario y pestañas */}
      <div className="w-72 bg-gradient-to-r from-green-600 to-green-500 text-white p-6 rounded-l-lg shadow-lg">
        {/* Datos Básicos del Usuario */}
        <div className="mb-8 flex flex-col items-center space-y-4">
          <Image
            src={userData?.imgUrl || "/default-avatar.webp"}
            alt="Foto de perfil"
            width={100}
            height={100}
            className="rounded-full border-4 border-white shadow-lg"
          />
          <div className="space-y-2 text-center">
            <h2 className="text-2xl font-semibold">
              {userData?.name} {userData?.lastname}
            </h2>
            <h2 className="text-2xl font-semibold">
              {userData?.nameAgency}
            </h2>
            <p className="text-sm">{userData?.phone}</p>
            <p className="text-sm">{userData?.email}</p>
          </div>
        </div>

        {/* Barra de navegación (pestañas) */}
        <nav className="space-y-2">
          <ul>
            <li>
              <button
                onClick={() => handleSectionChange("profile")}
                className="w-full py-2 px-4 flex items-center space-x-2 text-left rounded-lg hover:bg-green-700 transition duration-200"
              >
                <span className="text-lg">👤</span>
                <span>Mi Perfil</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => handleSectionChange("skills")}
                className="w-full py-2 px-4 flex items-center space-x-2 text-left rounded-lg hover:bg-green-700 transition duration-200"
              >
                <span className="text-lg">⚡</span>
                <span>Postulantes</span>
              </button>
            </li>
            <li>
              
              <button
                onClick={() => handleSectionChange("createOffers")}
                className="w-full py-2 px-4 flex items-center space-x-2 text-left rounded-lg hover:bg-green-700 transition duration-200"
              >
                <span className="text-lg">📝</span>
                <span>Crear Oferta</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => handleSectionChange("appliedOffers")}
                className="w-full py-2 px-4 flex items-center space-x-2 text-left rounded-lg hover:bg-green-700 transition duration-200"
              >
                <span className="text-lg">📜</span>
                <span>Ofertas Aplicadas</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => handleSectionChange("social")}
                className="w-full py-2 px-4 flex items-center space-x-2 text-left rounded-lg hover:bg-green-700 transition duration-200"
              >
                <span className="text-lg">🌐</span>
                <span>Redes Sociales</span>
              </button>
            </li>
          </ul>
        </nav>
        <button
        onClick={handleLogOut}
        className="mt-4 p-2 text-white bg-green-800 rounded"
      >
        Cerrar sesión
      </button>
      </div>

      
        {/* Si hay un error, mostramos un mensaje */}
        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-800 rounded-lg">
            {error}
          </div>
        )}

      <div className="flex-1 p-8">
     
        {/* Sección de Perfil */}
        {activeSection === "profile" && (
          <div
            className="bg-white p-10 rounded-xl shadow-xl mb-8 max-w-5xl mx-auto min-h-[500px]"
            data-aos="fade-up"
          >
            <h3 className="text-2xl font-semibold mb-6 text-gray-800">
              Información Adicional
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                
                <p className="text-lg text-gray-600 mb-4">
                  <span className="font-medium">País:</span>{" "}
                  {userData?.nationality  || undefined}
                </p>
                <p className="text-lg text-gray-600 mb-4">
                  <span className="font-medium">Ciudad:</span>{" "}
                  {userData?.location  || undefined}
                </p>
                <p className="text-lg text-gray-600 mb-4">
                  <span className="font-medium text-gray-700">WhatsApp:</span>{" "}
                  {userData?.phone}
                </p>
                 <p className="text-lg text-gray-600 mb-4">
<span className="font-medium">Fundado en:</span>{" "}
{userData?.birthday  || undefined}
</p>
               
                
              </div>

           
            </div>
            <p className="text-gray-600 mt-12">
          Haz click en <span className="font-semibold">Completar datos</span> para terminar tu perfil.
        </p>
          </div>
        )}

         {/* Sección crear jobs */}
         {activeSection === "createOffers" && (
          <div
            className="bg-white p-6 rounded-lg shadow-lg mb-6"
            data-aos="fade-up"
          >
           
      <JobOfferForm/>

          </div>
        )}


        {/* Sección de Ofertas Aplicadas */}
        {activeSection === "appliedOffers" && (
          <div
            className="bg-white p-6 rounded-lg shadow-lg mb-6"
            data-aos="fade-up"
          >
            <h3 className="text-xl font-semibold mb-4">Ofertas Aplicadas</h3>
            <ul className="space-y-4">
              {userH.appliedOffers.map((offer, index) => (
                <li
                  key={index}
                  className="bg-gray-100 p-4 rounded-md shadow-sm"
                >
                  <h4 className="font-semibold">{offer.title}</h4>
                  <p className="text-gray-500">{offer.description}</p>
                  <p className="text-gray-500 text-sm">Fecha: {offer.date}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

       
        {/* Sección de Redes Sociales */}
        {activeSection === "social" && (
  <div className="bg-white p-6 rounded-lg shadow-lg mb-6" data-aos="fade-up">
    <h3 className="text-xl font-semibold mb-4">Redes Sociales</h3>
    <div className="space-y-4">
      {userData?.socialMedia?.instagram || userData?.socialMedia?.twitter ? (
        <>
          {userData?.socialMedia?.instagram && (
            <Link
              href={`https://www.instagram.com/${userData.socialMedia.instagram}`}
              className="text-blue-500 hover:underline flex items-center space-x-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="text-xl" />
              <span>Instagram</span>
            </Link>
          )}

          {userData?.socialMedia?.twitter && (
            <Link
              href={`https://twitter.com/${userData.socialMedia.twitter}`}
              className="text-blue-500 hover:underline flex items-center space-x-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter className="text-xl" />
              <span>Twitter</span>
            </Link>
          )}
        </>
      ) : (
        <p className="text-gray-600">
          Haz click en <span className="font-semibold">Completar datos</span> para agregar redes.
        </p>
      )}
    </div>

          </div>
        )}
      </div>
      <Link href={"/profile"}>
            <div className="rounded border-2 md:w-3/4 sm:1/6 text-center bg-blue-300 hover:bg-blue-400 hover:cursor-pointer p-2 text-gray-800">
                Completar datos
              </div>
              </Link>
    </div>
  );
};

export default PanelManager;
