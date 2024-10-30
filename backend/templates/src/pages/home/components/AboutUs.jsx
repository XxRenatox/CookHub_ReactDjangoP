import { BookOpenIcon, UserGroupIcon, UserIcon } from "@heroicons/react/24/outline";
import React from "react";

const options = [
  {
    title: "Recetas Personalizadas",
    desc: "Ofrecemos recetas adaptadas a tus preferencias y habilidades culinarias.",
    icon: BookOpenIcon,
  },
  {
    title: "Comunidad Culinaria",
    desc: "Únete a una comunidad de entusiastas de la cocina, comparte tus creaciones y aprende de los demás.",
    icon: UserGroupIcon,
  },
  {
    title: "Experiencia del Usuario",
    desc: "Nuestra plataforma es fácil de usar, con funciones intuitivas y soporte al cliente excepcional.",
    icon: UserIcon,
  },
];

function AboutUs() {
  return (
    <>
      <div className="flex-1 text-left space-y-2 max-w-6xl mx-auto p-5 ">
        <h1 className="text-3xl font-bold py-3">¿Por qué elegir CookHub?</h1>
        <p className="text-xl pb-5">
          Somos más que un simple recetario en linea. Nuestro engoque en la
          calidad, la comunidad y la experiencia del usuario nos distingue.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-6">
          {options.map((item, index) => (
            <div key={index + 1} className="border-gray-800 space-y-5 p-5 border-2 rounded-xl">
              <div className="text-left">
                {<item.icon className="mr-3 h-10 w-10" aria-hidden="true" />}
                <h3 className="text-xl font-bold">{item.title}</h3>
              </div>
              <p className="text-lg">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default AboutUs;
