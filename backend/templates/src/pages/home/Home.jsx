import Carousel from "./components/Carousel";
import ButtonCategories from "./components/ButtonCategories";
import NavBar from "../common/Navbar";
import MobileMenuButton from "../common/MobileMenuButton";
import Recipes from "../common/Recipes";
import Footer from "../common/Footer";
import CardInfo from "../common/Cardinfo";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const images = [
  "https://www.themealdb.com/images/media/meals/oe8rg51699014028.jpg",
  "https://www.themealdb.com/images/media/meals/hqaejl1695738653.jpg",
  "https://www.themealdb.com/images/media/meals/sqrtwu1511721265.jpg",
  "https://www.themealdb.com/images/media/meals/0206h11699013358.jpg",
  "https://www.themealdb.com/images/media/meals/atd5sh1583188467.jpg",
  "https://www.themealdb.com/images/media/meals/n7qnkb1630444129.jpg",
  "https://www.themealdb.com/images/media/meals/qtqwwu1511792650.jpg",
];

function Home() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <>
      <NavBar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        options={[
          { title: "Inicio", href: "#home" },
          { title: "Recetas", href: "#recetas" },
          { title: "Técnicas de Cocina", href: "#tecnicas" },
          { title: "Contacto", href: "#info" },
        ]}
      />
      <main
        className={`${
          darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
        } transition-colors duration-300`}
      >
        <aside className="flex flex-col md:flex-row justify-between h-full">
          <main className="grid">
            <ButtonCategories darkMode={darkMode} />
            <section className="pt-24 md:mx-auto" id="home">
              <Carousel images={images} darkMode={darkMode} />
            </section>
            <section>
              <div className="mt-8 mb-4" id="recetas">
                <div className="flex items-center px-64">
                  <hr className="flex-grow border-gray-400" />
                  <span className="mx-4 text-2xl font-bold text-center">
                    RECETAS MAS POPULARES
                  </span>
                  <hr className="flex-grow border-t border-gray-400" />
                </div>
              </div>
              <div className="container mx-auto">
                <Recipes homeSection darkMode={darkMode} />
              </div>
            </section>

            <section className="grid grid-cols-1">
              {/* Sección de Suscripciones */}
              <div className="mx-auto my-8 p-6 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold mb-4">
                  ¡Únete a nuestras Suscripciones Premium!
                </h2>
                <p className="mb-6">
                  Obtén acceso a recetas exclusivas, técnicas avanzadas y mucho
                  más. ¡No te pierdas la oportunidad de llevar tu cocina al
                  siguiente nivel!
                </p>
                <Link
                  to={"/Subs"}
                  className="inline-block bg-white text-purple-700 font-semibold py-2 px-4 rounded-full hover:bg-gray-200 transition-colors duration-300"
                >
                  Ir a ver las suscripciones
                </Link>
              </div>
              <div
                className={` ${
                  darkMode
                    ? "bg-gradient-to-t from-gray-800 to-slate-500"
                    : "bg-gradient-to-t from-gray-300 to-gray-100"
                } rounded-t-3xl p-5`}
                id="tecnicas"
              >
                <div className="text-center mt-8 mb-4">
                  <h1 className="text-3xl font-bold">Técnicas de Cocina</h1>
                </div>
                <div className="justify-center mx-auto grid md:grid-cols-4 gap-4 ">
                  <CardInfo cantidad={4} />
                </div>
              </div>
            </section>
          </main>
        </aside>
      </main>

      <div id="info">
        <Footer darkMode={darkMode} />
      </div>
    </>
  );
}

export default Home;
