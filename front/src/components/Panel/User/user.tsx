"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import userH from "../../../helpers/helperUser"; // Aquí están los datos del usuario
import AOS from "aos";
import "aos/dist/aos.css"; // Asegúrate de importar los estilos de AOS
import { FaInstagram, FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa"; // Iconos de redes sociales

const UserProfile = () => {
  const [activeSection, setActiveSection] = useState("profile");

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
  };

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
            src={userH.profilePicture}
            alt="Foto de perfil"
            width={100}
            height={100}
            className="rounded-full border-4 border-white shadow-lg"
          />
          <div className="space-y-2 text-center">
            <h2 className="text-2xl font-semibold">
              {userH.firstName} {userH.lastName}
            </h2>
            <p className="text-lg text-gray-200">{userH.role}</p>
            <p className="text-sm">{userH.phone}</p>
            <p className="text-sm">{userH.email}</p>
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
                <span>Habilidades</span>
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
      </div>

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
                  <span className="font-medium">Fecha de Nacimiento:</span>{" "}
                  {userH.birthDate}
                </p>
                <p className="text-lg text-gray-600 mb-4">
                  <span className="font-medium">Género:</span> {userH.gender}
                </p>
                <p className="text-lg text-gray-600 mb-4">
                  <span className="font-medium">WhatsApp:</span>{" "}
                  {userH.whatsapp}
                </p>
                <p className="text-lg text-gray-600 mb-4">
                  <span className="font-medium">CV:</span>
                  <a
                    href={userH.cv}
                    className="text-blue-500 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ver CV
                  </a>
                </p>
                <p className="text-lg text-gray-600 mb-4">
                  <span className="font-medium">Documento Adicional:</span>
                  <a
                    href={userH.additionalDocument}
                    className="text-blue-500 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ver Documento
                  </a>
                </p>
              </div>

              {/* Video de Presentación incrustado a la derecha */}
              <div className="flex justify-center items-center">
                <span className="font-medium text-lg mb-4">
                  Video de Presentación:
                </span>
                <div className="relative w-full max-w-[500px] h-[250px] overflow-hidden rounded-lg bg-black ml-4">
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src="https://www.youtube.com/embed/lscs_jCKz58?si=gKpwYaZit93EGAlZ"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Sección de Habilidades */}
        {activeSection === "skills" && (
          <div
            className="bg-white p-6 rounded-lg shadow-lg mb-6"
            data-aos="fade-up"
          >
            <h3 className="text-xl font-semibold mb-4">Habilidades</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {userH.skills.map((skill, index) => (
                <div
                  key={index}
                  className="bg-gray-100 p-4 rounded-md shadow-sm"
                >
                  <h4 className="font-semibold">{skill.skill}</h4>
                  <p className="text-gray-500">Nivel: {skill.level}</p>
                  <p className="text-gray-500">Frecuencia: {skill.frequency}</p>
                </div>
              ))}
            </div>
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
          <div
            className="bg-white p-6 rounded-lg shadow-lg mb-6"
            data-aos="fade-up"
          >
            <h3 className="text-xl font-semibold mb-4">Redes Sociales</h3>
            <div className="space-y-4">
              {userH.socialLinks.instagram && (
                <a
                  href={userH.socialLinks.instagram}
                  className="text-blue-500 hover:underline flex items-center space-x-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram className="text-xl" />
                  <span>Instagram</span>
                </a>
              )}
              {userH.socialLinks.facebook && (
                <a
                  href={userH.socialLinks.facebook}
                  className="text-blue-500 hover:underline flex items-center space-x-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebook className="text-xl" />
                  <span>Facebook</span>
                </a>
              )}
              {userH.socialLinks.twitter && (
                <a
                  href={userH.socialLinks.twitter}
                  className="text-blue-500 hover:underline flex items-center space-x-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTwitter className="text-xl" />
                  <span>Twitter</span>
                </a>
              )}
              {userH.socialLinks.youtube && (
                <a
                  href={userH.socialLinks.youtube}
                  className="text-blue-500 hover:underline flex items-center space-x-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaYoutube className="text-xl" />
                  <span>YouTube</span>
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
