import React, { useState } from "react";
import NavBar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import Recipes from "../../components/recipes/Recipes";
import AboutUs from "./components/AboutUs";
import Subscriptions from "./components/SubsSection";
import ButtonCategories from "./components/ButtonCategories";

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
          { title: "Sobre Nosotros", href: "#aboutus" },
          { title: "Subscripciones", href: "#subs" },
          { title: "Contacto", href: "#info" },
        ]}
      />
      <main
        className={`${
          darkMode ? "bg-gray-900 text-white" : "bg-slate-200 text-gray-900"
        } transition-colors duration-300`}
      >
        <section id="home" className="pt-24 p-6 md:flex items-center gap-8 max-w-7xl mx-auto">
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
          </div>
        </section>

        <section id="categorias" className="mt-12">
          <ButtonCategories darkMode={darkMode} />
        </section>

        <section id="recetas" className="mt-12 max-w-6xl mx-auto p-5">
          <h2 className="text-3xl font-bold text-left mb-8">
            Recetas más populares
          </h2>
          <Recipes popular darkMode={darkMode} cantidad={3} />
        </section>

        <section id="aboutus" className="mt-12">
          <AboutUs />
        </section>

        <section id="subs" className="mt-12 py-12">
          <Subscriptions />
        </section>
      </main>

      <footer id="info">
        <Footer darkMode={darkMode} />
      </footer>
    </>
  );
}

export default Home;