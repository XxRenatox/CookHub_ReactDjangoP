import React, { useState } from "react";
import Navbar from "../common/Navbar";
import {
  ArrowDownIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import Footer from "../common/Footer";

const faqList = [
  {
    question: "¿Cómo funcionan las recetas personalizadas?",
    answer:
      "Nuestras recetas personalizadas se basan en tus preferencias y los productos que tienes disponibles. Solo necesitas ingresar tus gustos y los ingredientes, y nosotros te sugerimos recetas adaptadas a ti.",
  },
  {
    question: "¿Qué son las técnicas de cocina?",
    answer:
      "Las técnicas de cocina son métodos y habilidades específicas que te ayudarán a mejorar tu destreza en la cocina. Incluimos desde lo básico hasta técnicas avanzadas para que puedas aplicar en tus recetas.",
  },
  {
    question: "¿Cómo puedo compartir una receta en redes sociales?",
    answer:
      "Puedes compartir cualquier receta en tus redes sociales utilizando los enlaces de compartir disponibles en cada receta.",
  },
  {
    question: "¿Puedo agregar mis propias recetas?",
    answer:
      "Solo los usuarios premium pueden agregar recetas personalizadas a nuestra plataforma. Con la suscripción premium, también podrás gestionar y compartir tus recetas con otros usuarios.",
  },
  {
    question: "¿Qué tipo de recetas puedo encontrar aquí?",
    answer:
      "Nuestra plataforma ofrece una amplia variedad de recetas, desde platos principales hasta postres, con opciones para todos los niveles de habilidad en la cocina.",
  },
];

function Faq() {
  const [darkMode, setDarkMode] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <Navbar
        options={[{ title: "Contacto", href: "#info" }]}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
      <main
        className={`${
          darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
        } w-full h-screen flex items-center transition-colors duration-300`}
      >
        <section className="flex flex-wrap flex-col items-center justify-center flex-grow mt-15">
          <h1 className="font-extrabold text-3xl pb-10 text-center">
            Sección de Preguntas Frecuentes
          </h1>
          <div className="space-y-6 border-t w-2/3">
            {faqList.map((item, index) => (
              <div
                key={index}
                className="p-5 border-t cursor-pointer"
                onClick={() => toggleFaq(index)}
              >
                <div className="flex justify-between items-center">
                  <h2 className="font-semibold">{item.question}</h2>
                  <a href="#">
                    {openIndex === index ? (
                      <ArrowDownIcon className="w-5 h-5" />
                    ) : (
                      <ChevronRightIcon className="w-5 h-5" />
                    )}
                  </a>
                </div>
                {openIndex === index && <p className="py-4">{item.answer}</p>}
              </div>
            ))}
          </div>
        </section>
      </main>
      <div id="info">
        <Footer darkMode={darkMode} />
      </div>
    </>
  );
}

export default Faq;
