import React, { useState } from "react";
import Footer from "../../components/common/Footer";
import Sidebar from "./components/Sidebar";
import RecetasSection from "./components/RecetasSection";
import FavoritasSection from "./components/FavoritasSection";
import VideosSection from "./components/VideosSection";
import TecnicasSection from "./components/premium/TecnicasSection";
import HomeSection from "./components/HomeSection";
import SettingsSection from "./components/SettingsSection";
import CreateRecipeSection from "./components/premium/CreateRecipeSection";
import { jwtDecode } from "jwt-decode";
import PanelAdmin from "./components/admin/PanelAdmin";
import MyRecipesSection from "./components/premium/MyRecipesSection";

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("Home");
  const [darkMode, setDarkMode] = useState(false); 

  let userinfo = localStorage.getItem("token");

  if (userinfo) {
    try {
      userinfo = jwtDecode(userinfo);
    } catch (error) {
      console.error("Error decoding token:", error.message);
      userinfo = null;
    }
  } else {
    console.warn("No token found in localStorage.");
    userinfo = null;
  }

  const renderContent = () => {
    switch (activeSection) {
      case "Home":
        return <HomeSection darkMode={darkMode} userinfo={userinfo}/>
      case "Buscar":
        return <RecetasSection darkMode={darkMode} userinfo={userinfo}/>
      case "Favoritas":
        return <FavoritasSection darkMode={darkMode} userinfo={userinfo}/>
      case "Técnicas":
        return <TecnicasSection darkMode={darkMode} userinfo={userinfo}/>
      case "Tutoriales":
        return <VideosSection darkMode={darkMode} userinfo={userinfo}/>
      case "Mis Recetas":
          return <MyRecipesSection darkMode={darkMode} userinfo={userinfo}/>
      case "Crear Receta":
        return <CreateRecipeSection darkMode={darkMode} userinfo={userinfo}/>
      case "Opciones":
        return <SettingsSection darkMode={darkMode} userinfo={userinfo}/>
      case "Panel de Administrador":
        return <PanelAdmin darkMode={darkMode} />
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
          userinfo={userinfo}
        />
        <section className="w-full">{renderContent()}</section>
      </main>
      <Footer darkMode={darkMode} />
    </>
  );
};

export default Dashboard;
