import React, { useState } from "react";
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

const options = [
  { text: "Home", icon: HomeIcon },
  { text: "Buscar", icon: MagnifyingGlassIcon },
  { text: "Favoritas", icon: BookmarkIcon },
  { text: "Tutoriales", icon: PlayIcon },
  { text: "Técnicas", icon: LightBulbIcon },
  { text: "Crear Receta", icon: PlusCircleIcon },
  { text: "Mis Recetas", icon: BookOpenIcon },
];

function Sidebar({ setActiveSection, darkMode, setDarkMode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex md:h-min-screen">
      {/* Sidebar for large screens */}
      <div className="hidden md:flex md:w-64 md:flex-shrink-0">
        <div
          className={`flex flex-col justify-between w-full h-full ${
            darkMode ? "bg-slate-700" : "bg-gray-900"
          }`}
        >
          <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
            <nav className="flex-1 px-2 space-y-1">
              <Link to="/">
                <h1 className="text-2xl font-extrabold text-white py-5 px-2">
                  CookHub
                </h1>
              </Link>
              <hr className="me-8 py-6" />
              <div className="space-y-6">
                {options.map((item, index) => (
                  <a
                    key={index}
                    onClick={() => setActiveSection(item.text)}
                    className="text-white hover:bg-[#c5b9a2] group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                    role="button"
                    aria-label={item.text}
                  >
                    {<item.icon className="mr-3 h-6 w-6" aria-hidden="true" />}
                    {item.text}
                  </a>
                ))}
                <DarkModeButton darkMode={darkMode} setDarkMode={setDarkMode} />
              </div>
            </nav>
          </div>
          {/* Settings and Log out buttons at the bottom */}
          <div className="space-y-2 pb-4 px-2">
            <a
              onClick={() => setActiveSection("Settings")}
              className="text-white hover:bg-[#019863] group flex items-center px-2 py-2 text-sm font-medium rounded-md"
              role="button"
              aria-label="Settings"
            >
              <CogIcon className="mr-3 h-6 w-6" aria-hidden="true" />
              Opciones
            </a>
            <a
              onClick={() => setActiveSection("Log out")}
              className="text-white hover:bg-[#980101] group flex items-center px-2 py-2 text-sm font-medium rounded-md"
              role="button"
              aria-label="Log out"
            >
              <ArrowLeftOnRectangleIcon className="mr-3 h-6 w-6" aria-hidden="true" />
              Cerrar Sesión
            </a>
          </div>
        </div>
      </div>

      {/* Mobile menu button */}
      <div className="md:hidden z-40 fixed w-full">
        <div className="flex py-6 px-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white p-2"
            aria-label="Open or close menu"
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
          <nav className="space-y-1 z-40">
            <Link to="/">
              <h1 className="text-2xl font-extrabold text-white pb-12 px-2">
                CookHub
              </h1>
            </Link>
            <hr className="my-5" />
            <div className="space-y-8">
              {options.map((item, index) => (
                <a
                  key={index}
                  onClick={() => setActiveSection(item.text)}
                  className="text-white hover:bg-gray-700 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                  role="button"
                  aria-label={item.text}
                >
                  {<item.icon className="mr-3 h-6 w-6" aria-hidden="true" />}
                  {item.text}
                </a>
              ))}
              <DarkModeButton darkMode={darkMode} setDarkMode={setDarkMode} />
            </div>
          </nav>
          {/* Settings and Log out buttons at the bottom of mobile sidebar */}
          <div className="space-y-2 pb-4 px-2">
            <a
              onClick={() => setActiveSection("Settings")}
              className="text-white hover:bg-gray-700 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
              role="button"
              aria-label="Settings"
            >
              <CogIcon className="mr-3 h-6 w-6" aria-hidden="true" />
              Settings
            </a>
            <a
              onClick={() => setActiveSection("Log out")}
              className="text-white hover:bg-gray-700 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
              role="button"
              aria-label="Log out"
            >
              <ArrowLeftOnRectangleIcon className="mr-3 h-6 w-6" aria-hidden="true" />
              Log out
            </a>
          </div>
        </div>
      </Disclosure>
    </div>
  );
}

export default Sidebar;
