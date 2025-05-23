"use client";

import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";

function FaqSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      AOS.init();
    }
  }, []);

  const toggleAnswer = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "¿Cómo publico una vacante en Futbolink?",
      answer:
        "Para publicar una oferta en Futbolink debes registrarte como agencia/club en la web. Una vez registrado, en el panel de control te aparecerá el menú de ofertas donde podrás subir, editar y cerrar las vacantes que necesites.",
    },
    {
      question: "¿Cómo me inscribo en un curso o máster?",
      answer:
        "Para inscribirte en un curso de una empresa colaboradora de Futbolink debes rellenar el formulario 'más información' del curso en el que estás interesado. Una vez realizado esto, la empresa organizadora se pondrá en contacto contigo para brindarte toda la información necesaria.",
    },
    {
      question: "¿Cómo me suscribo a una oferta?",
      answer:
        'Podés ver nuestro video orientativo haciendo click en <span class="text-verde-oscuro font-bold">ayuda</span>, y prepárate para despegar en tu carrera.',
    },
  ];

  return (
    <section className="py-16 mt-20 px-6 bg-gray-100">
      <div className="flex flex-col md:flex-row items-center justify-between mb-12">
        {/* Imagen */}
        <div className="w-full md:w-1/2 mb-6 md:mb-0">
          <Image
            src="https://img.freepik.com/foto-gratis/estadio-barcelona-helicoptero-espana_1398-4989.jpg?t=st=1736458259~exp=1736461859~hmac=c6c4d1301166fce56714bc260da93f3df68e9776479676d8a36364cb06d5c9a2&w=996"
            alt="Imagen explicativa"
            className="w-full rounded-lg shadow-lg"
            width={600}
            height={500}
          />
        </div>

        {/* Texto de preguntas frecuentes */}
        <div className="w-full md:w-1/2 md:pl-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center md:text-left">
            ¿Todavía con dudas? Las despejamos para ti a continuación…
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="faq-item"
                data-aos="fade-up"
                data-aos-duration="800"
              >
                <button
                  onClick={() => toggleAnswer(index)}
                  className="w-full text-left text-xl font-semibold text-gray-800 bg-gray-200 p-4 rounded-lg focus:outline-none hover:bg-gray-300"
                >
                  {faq.question}
                </button>
                {activeIndex === index && (
                  <p
                    className="mt-4 text-lg text-gray-600"
                    dangerouslySetInnerHTML={{ __html: faq.answer }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default FaqSection;
