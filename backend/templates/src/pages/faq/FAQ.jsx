import React, { useState } from "react";
import NavBar from "../../components/common/Navbar";
import { ChevronDownIcon, ChevronRightIcon} from "@heroicons/react/24/outline";

const Faq = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [openCategory, setOpenCategory] = useState(null);

  const toggleCategory = (index) => {
    setOpenCategory(openCategory === index ? null : index);
  };

  const categories = [
    {
      category: "General",
      items: [
        {
          question: "¿Cómo funcionan las recetas personalizadas?",
          answer:
            "Nuestras recetas personalizadas se basan en tus preferencias y los productos que tienes disponibles. Solo necesitas ingresar tus gustos y los ingredientes, y nosotros te sugerimos recetas adaptadas a ti.",
        },
        {
          question: "¿Qué tipo de recetas puedo encontrar aquí?",
          answer:
            "Nuestra plataforma ofrece una amplia variedad de recetas, desde platos principales hasta postres, con opciones para todos los niveles de habilidad en la cocina.",
        },
        {
          question: "¿Es necesario registrarse para usar CookHub?",
          answer:
            "No es necesario registrarse para explorar las recetas generales, pero para acceder a las funciones personalizadas, como guardar tus recetas favoritas, sí es necesario crear una cuenta.",
        },
        {
          question: "¿Puedo compartir recetas con otros usuarios?",
          answer:
            "Sí, puedes compartir tus recetas favoritas con otros usuarios a través de redes sociales o generando un enlace único desde nuestra plataforma.",
        },
        {
          question: "¿Hay soporte para alergias alimentarias?",
          answer:
            "Sí, puedes especificar tus alergias alimentarias en tu perfil, y las recetas que mostramos estarán adaptadas para evitar esos ingredientes.",
        },
      ],
    },
    {
      category: "Funciones Premium",
      items: [
        {
          question: "¿Qué beneficios obtengo al ser Premium?",
          answer:
            "Los usuarios Premium tienen acceso a recetas exclusivas, planificadores de comidas personalizados y la posibilidad de guardar un número ilimitado de recetas.",
        },
        {
          question: "¿Cuánto cuesta la suscripción Premium?",
          answer:
            "El costo de la suscripción Premium varía según el plan elegido: mensual, semestral o anual. Consulta la sección de precios en nuestra página para más detalles.",
        },
        {
          question: "¿Puedo cancelar mi suscripción Premium en cualquier momento?",
          answer:
            "Sí, puedes cancelar tu suscripción en cualquier momento desde la configuración de tu cuenta. El acceso Premium estará disponible hasta que termine tu período de facturación.",
        },
        {
          question: "¿Qué métodos de pago aceptan para Premium?",
          answer:
            "Aceptamos tarjetas de crédito, débito y métodos de pago digitales como PayPal. También ofrecemos pagos en moneda local en algunos países.",
        },
      ],
    },
    {
      category: "Técnicas y Consejos",
      items: [
        {
          question: "¿Cómo puedo mejorar mis habilidades en la cocina?",
          answer:
            "Explora nuestros tutoriales paso a paso sobre técnicas básicas y avanzadas para mejorar tus habilidades culinarias.",
        },
        {
          question: "¿Qué hacer si no tengo todos los ingredientes de una receta?",
          answer:
            "Nuestra plataforma te sugiere alternativas para ingredientes comunes, permitiéndote ajustar la receta a lo que tengas disponible.",
        },
        {
          question: "¿Cómo puedo medir las porciones adecuadamente?",
          answer:
            "Consulta nuestra guía de porciones para conocer las medidas exactas según el tipo de comida y la cantidad de personas.",
        },
        {
          question: "¿Tienen videos de técnicas de cocina?",
          answer:
            "Sí, contamos con una amplia selección de videos explicativos para aprender técnicas como cortar, sazonar y cocinar a la perfección.",
        },
        {
          question: "¿Cómo evitar que los alimentos se peguen en la sartén?",
          answer:
            "Precalienta la sartén antes de añadir los alimentos y utiliza una cantidad adecuada de grasa, como aceite o mantequilla, para evitar que se peguen.",
        },
      ],
    },
    {
      category: "Nutrición y Salud",
      items: [
        {
          question: "¿Cómo puedo encontrar recetas saludables?",
          answer:
            "En la sección de recetas saludables, encontrarás platos equilibrados, bajos en calorías y adaptados a diferentes necesidades nutricionales.",
        },
        {
          question: "¿CookHub ofrece información nutricional de las recetas?",
          answer:
            "Sí, cada receta incluye información detallada sobre calorías, macronutrientes y otros valores importantes para ayudarte a tomar decisiones informadas.",
        },
        {
          question: "¿Puedo filtrar recetas para dietas específicas?",
          answer:
            "Sí, puedes filtrar recetas según tus preferencias dietéticas, como vegano, vegetariano, sin gluten, bajo en carbohidratos, entre otras.",
        },
      ],
    },
    {
      category: "Ingredientes y Sustituciones",
      items: [
        {
          question: "¿Qué hago si no tengo un ingrediente específico?",
          answer:
            "Nuestra herramienta de sustituciones te ofrece alternativas para ingredientes comunes, permitiéndote adaptar cualquier receta.",
        },
        {
          question: "¿Cómo saber si un ingrediente está en mal estado?",
          answer:
            "Consulta nuestras guías sobre almacenamiento y conservación para identificar si un ingrediente ya no es apto para consumo.",
        },
        {
          question: "¿Qué ingredientes básicos debería tener siempre en mi despensa?",
          answer:
            "Revisita nuestra lista de despensa esencial, donde encontrarás los alimentos básicos para preparar una variedad de recetas sin complicaciones.",
        },
      ],
    },
    {
      category: "Problemas Técnicos",
      items: [
        {
          question: "¿Qué hago si no puedo acceder a mi cuenta?",
          answer:
            "Si tienes problemas para iniciar sesión, utiliza la opción de recuperación de contraseña o contáctanos a través del soporte técnico.",
        },
        {
          question: "¿Cómo reporto un error en la plataforma?",
          answer:
            "Puedes reportar cualquier problema desde la sección de 'Ayuda' en tu perfil. Incluye detalles del error para que podamos solucionarlo rápidamente.",
        },
        {
          question: "¿CookHub funciona sin conexión a internet?",
          answer:
            "Por ahora, CookHub requiere una conexión a internet para cargar las recetas y funciones personalizadas.",
        },
      ],
    },
  ];
  
  

  return (
    <>
      <NavBar darkMode={darkMode} setDarkMode={setDarkMode} options={[]} />
      <main
        className={`${
          darkMode ? "bg-gray-900 text-white" : "bg-slate-200 text-gray-900"
        } transition-colors duration-300 pt-24 min-h-screen`}
      >
        <div
          className={`max-w-4xl mx-auto p-6 rounded-lg shadow-md transition-colors duration-300 ${
            darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
          }`}
        >
          <h1
            className={`text-3xl font-bold mb-6 text-center ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Sección de Preguntas Frecuentes
          </h1>
          <div className="space-y-4">
            {categories.map((category, index) => (
              <div
                key={index}
                className={`border rounded-lg shadow-sm ${
                  darkMode ? "bg-gray-800" : "bg-white"
                }`}
              >
                <div
                  className={`p-5 flex justify-between items-center cursor-pointer ${darkMode ? "hover:bg-slate-700" : "hover:bg-slate-400"} transition-all duration-200 rounded-lg`}
                  onClick={() => toggleCategory(index)}
                >
                  <h2
                    className={`font-bold text-lg ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {category.category}
                  </h2>
                  {openCategory === index ? (
                    <ChevronRightIcon className="w-6 h-6" />
                  ) : (
                    <ChevronDownIcon className="w-6 h-6" />
                  )}
                </div>
                {openCategory === index && (
                  <div
                    className={`space-y-4 pl-6 pr-6 pt-4 pb-4 border-t border-gray-300 dark:border-gray-600`}
                  >
                    {category.items.map((item, subIndex) => (
                      <div key={subIndex} className="pt-2">
                        <h3
                          className={`font-semibold text-lg ${
                            darkMode ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {item.question}
                        </h3>
                        <p
                          className={`mt-2 ${
                            darkMode ? "text-gray-300" : "text-gray-600"
                          }`}
                        >
                          {item.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default Faq;