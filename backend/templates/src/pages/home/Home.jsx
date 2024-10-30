import React, { useState } from "react";
import NavBar from "../common/Navbar";
import Recipes from "../common/Recipes";
import Footer from "../common/Footer";
import AboutUs from "./components/AboutUs";
import Subscriptions from "./components/SubsSection";

function Home() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <>
      <NavBar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        options={[
          { title: "Inicio", href: "#home" },
          { title: "Recetario", href: "#recetas" },
          { title: "Técnicas de Cocina", href: "#tecnicas" },
          { title: "Contacto", href: "#info" },
        ]}
      />
      <main
        className={`${
          darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
        } transition-colors duration-300`}
      >
        {/* Hero Section */}
        <section
          className="pt-24 p-6 md:flex items-center gap-8 max-w-7xl mx-auto"
          id="home"
        >
          <div className="flex-1 mb-6 md:mb-0">
            <img
              src="https://www.themealdb.com/images/media/meals/oe8rg51699014028.jpg"
              alt="Chefs cooking"
              className="rounded-3xl w-full h-64 md:h-full object-cover"
            />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl font-extrabold mb-4">
              Bienvenido a CookHub, tu portal de recetas y técnicas de cocina
            </h1>
            <p className="text-lg mb-6">
              Explora recetas personalizadas, aprende técnicas y lleva tus
              habilidades culinarias al siguiente nivel.
            </p>
            <div className="relative max-w-md mx-auto md:mx-0">
              <input
                type="text"
                placeholder="Buscar recetas..."
                className="w-full p-4 pl-12 rounded-full border border-gray-300 text-gray-900 focus:outline-none"
              />
              <button className="absolute right-2 top-2 bg-green-500 text-white font-semibold py-2 px-4 rounded-full hover:bg-green-600 transition duration-300">
                Buscar
              </button>
            </div>
          </div>
        </section>

        {/* Sobre Nosotros */}
        <section className="mt-12 py-12">
            <AboutUs /> 
        </section>

        {/* Recetas Populares */}
        <section id="recetas" className="mt-12 max-w-6xl mx-auto p-5">
          <h2 className="text-2xl font-bold text-left mb-8">
            Recetas más populares
          </h2>
          <Recipes homeSection darkMode={darkMode} />
        </section>

        {/* Suscripciones Premium */}
        <section
          className={`${
            darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
          } transition-colors duration-300 mt-12 py-12`}
        >
          <Subscriptions />
        </section>
      </main>

      <Footer darkMode={darkMode} />
    </>
  );
}

export default Home;
