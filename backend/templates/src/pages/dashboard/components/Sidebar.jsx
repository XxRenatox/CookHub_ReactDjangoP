import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  XMarkIcon,
  Bars3Icon,
  HomeIcon,
  PlayIcon,
  LightBulbIcon,
  MagnifyingGlassIcon,
  BookmarkIcon,
  PlusCircleIcon,
  BookOpenIcon,
  CogIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { Disclosure } from "@headlessui/react";
import DarkModeButton from "../../common/ThemeSwitcher";
import { UserCircleIcon } from "@heroicons/react/20/solid";

const options = [
  { text: "Home", icon: HomeIcon },
  { text: "Buscar", icon: MagnifyingGlassIcon },
  { text: "Favoritas", icon: BookmarkIcon },
  { text: "Tutoriales", icon: PlayIcon },
];

const premiumOptions = [
  { text: "Técnicas", icon: LightBulbIcon },
  { text: "Crear Receta", icon: PlusCircleIcon },
  { text: "Mis Recetas", icon: BookOpenIcon },
];

const adminOptions = [
  {text: "Panel de Administrador", icon: UserCircleIcon}
]



const closeSession = () => {
  localStorage.removeItem("token");
};

function Sidebar({ setActiveSection, darkMode, setDarkMode, userinfo }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const renderOptions = (optionsList) => (
    <>
      {optionsList.map((item, index) => (
        <button
          key={index}
          onClick={() => setActiveSection(item.text)}
          className="text-white hover:bg-[#c5b9a2] group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full text-left"
        >
          <item.icon className="mr-3 h-6 w-6" aria-hidden="true" />
          {item.text}
        </button>
      ))}
    </>
  );

  return (
    <div className="flex h-min-screen">
      {/* Sidebar for large screens */}
      <div className="hidden md:flex md:w-64 md:flex-shrink-0">
        <div
          className={`flex flex-col justify-between w-full h-full ${
            darkMode ? "bg-gray-900" : "bg-slate-700"
          }`}
        >
          <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
            <Link to="/">
              <h1 className="text-2xl font-extrabold text-white py-5 px-2">
                CookHub
              </h1>
            </Link>
            <hr className="my-4" />
            <nav className="flex-1 px-2 space-y-3">
              {renderOptions(options)}
              {userinfo && (userinfo.premium || userinfo.admin) && renderOptions(premiumOptions)}
              {userinfo && userinfo.admin && renderOptions(adminOptions)}
              <DarkModeButton darkMode={darkMode} setDarkMode={setDarkMode} />
            </nav>
          </div>
          <div className="space-y-2 pb-4 px-2">
            <button
              onClick={() => setActiveSection("Opciones")}
              className="text-white hover:bg-[#019863] group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full text-left"
            >
              <CogIcon className="mr-3 h-6 w-6" aria-hidden="true" />
              Opciones
            </button>
            <Link
              to="/"
              onClick={() => closeSession()}
              className="text-white hover:bg-[#980101] group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full text-left"
            >
              <ArrowLeftOnRectangleIcon
                className="mr-3 h-6 w-6"
                aria-hidden="true"
              />
              Cerrar Sesión
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile menu button */}
      <div className="md:hidden z-40 fixed w-full">
        <div className="flex py-6 px-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white p-2"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <XMarkIcon className="h-10 w-10 text-white" aria-hidden="true" />
            ) : (
              <Bars3Icon
                className={`h-10 w-10 ${
                  darkMode ? "text-white" : "text-black"
                }`}
                aria-hidden="true"
              />
            )}
          </button>
        </div>
      </div>

      {/* Mobile sidebar */}
      <Disclosure
        as="div"
        className={`fixed inset-0 ${
          darkMode ? "bg-gray-900" : "bg-gray-800"
        } p-4 transition-transform transform w-60 ${
          mobileMenuOpen
            ? "translate-x-0 duration-100"
            : "-translate-x-full duration-100"
        } md:hidden`}
      >
        <div className="flex flex-col h-full justify-between">
          <Link to="/">
            <h1 className="text-2xl font-extrabold text-white pb-12 px-2">
              CookHub
            </h1>
          </Link>
          <hr className="my-5" />
          <nav className="space-y-1 z-40">
            {renderOptions(options)}
            {userinfo && (userinfo.premium || userinfo.admin) && renderOptions(premiumOptions)}
            {userinfo && userinfo.admin && renderOptions(adminOptions)}
            <DarkModeButton darkMode={darkMode} setDarkMode={setDarkMode} />
          </nav>
          <div className="space-y-2 pb-4 px-2">
            <button
              onClick={() => setActiveSection("Opciones")}
              className="text-white hover:bg-gray-700 group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full text-left"
            >
              <CogIcon className="mr-3 h-6 w-6" aria-hidden="true" />
              Opciones
            </button>
            <Link
              to="/"
              onClick={() => closeSession()}
              className="text-white hover:bg-[#980101] group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full text-left"
            >
              <ArrowLeftOnRectangleIcon
                className="mr-3 h-6 w-6"
                aria-hidden="true"
              />
              Cerrar Sesión
            </Link>
          </div>
        </div>
      </Disclosure>
    </div>
  );
}

export default Sidebar;
