import React, { useState } from "react";
import Footer from "../common/Footer";
import Sidebar from "./components/Sidebar";
import RecetasSection from "./components/RecetasSection";
import PerfilSection from "./components/PerfilSection";
import FavoritasSection from "./components/FavoritasSection";
import VideosSection from "./components/VideosSection";
import TecnicasSection from "./components/TecnicasSection";

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("Perfil");
  const [darkMode, setDarkMode] = useState(false); 

  const renderContent = () => {
    switch (activeSection) {
      case "Perfil":
        return <PerfilSection darkMode={darkMode} />;
      case "Recetas":
        return <RecetasSection darkMode={darkMode} />;
      case "Favoritas":
        return <FavoritasSection darkMode={darkMode} />;
      case "Técnicas":
        return <TecnicasSection darkMode={darkMode} />
      case "Tutoriales":
        return <VideosSection darkMode={darkMode} />
      default:
        return <p>Selecciona una sección</p>;
    }
  };

  return (
    <>
      <main
        className={`flex w-full h-min-screen transition-colors duration-300 ${
          darkMode ? "bg-gray-900" : "bg-white"
        }`}
      >
        <Sidebar
          setActiveSection={setActiveSection}
          darkMode={darkMode}
          setDarkMode={setDarkMode} // Pasar el estado y la función
        />
        <section className="w-full">{renderContent()}</section>
      </main>
      <Footer darkMode={darkMode} />
    </>
  );
};

export default Dashboard;
