import React, { useState } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Link } from "react-router-dom";
import {
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import DarkModeButton from "./ThemeSwitcher";

function NavLogin({ img, isLogin = false }) {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  return (
    <div className="relative">
      <Link to={isLogin ? "/Registro" : "/Dashboard"}>
        <img
          src={img}
          alt="User Avatar"
          className="rounded-circle cursor-pointer w-12 h-12 ms-4"
          onClick={toggleDropdown}
        />
        <h1 className="font-extrabold">Mi Cuenta</h1>
      </Link>
    </div>
  );
}

function Navbar({ options, darkMode, setDarkMode }) {
  const scrollToSection = (id) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <Disclosure
      as="nav"
      className="fixed w-full z-50 top-0 bg-slate-900 text-white p-3 glass-effect"
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Agrega un margen superior aquí si es necesario */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button */}
            <DisclosureButton className="group inline-flex items-center justify-center p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block h-6 w-6 group-data-[open]:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden h-6 w-6 group-data-[open]:block"
              />
            </DisclosureButton>
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-between">
            <a
              className="font-extrabold text-4xl hover:text-gray-300 transition-colors md:mt-5"
              href="/"
            >
              CookHub
            </a>
            <div className="hidden sm:flex sm:items-center sm:space-x-4">
              <ul className="flex space-x-2">
                {options.map((item, index) => (
                  <li key={index} className="py-2">
                    <button
                      onClick={() => scrollToSection(item.href)}
                      className="text-md font-medium hover:text-green-600 transition-colors p-2 block"
                    >
                      {item.title}
                    </button>
                  </li>
                ))}
              </ul>
              <DarkModeButton darkMode={darkMode} setDarkMode={setDarkMode} />
              <div className="flex items-center border rounded border-white bg-gray-800 p-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6 text-gray-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
                <input
                  className="block flex-1 border-none bg-transparent text-white placeholder:text-gray-400 py-1.5 pl-2 focus:outline-none sm:text-sm"
                  placeholder="Buscar"
                />
              </div>
              <NavLogin
                img={"https://avatar.iran.liara.run/public/1"}
                isLogin
              />
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:hidden">
            <DisclosureButton className="inline-flex items-center justify-center p-2 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="sr-only">Open user menu</span>
              <NavLogin
                img={"https://avatar.iran.liara.run/public/1"}
                isLogin
              />
            </DisclosureButton>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <DisclosurePanel className="sm:hidden">
        <div className="space-y-4 px-2 pb-3 pt-2">
          <ul>
            {options.map((item, index) => (
              <li key={index} className="py-2">
                <button
                  onClick={() => scrollToSection(item.href)}
                  className="text-md font-medium hover:text-gray-300 transition-colors block"
                >
                  {item.title}
                </button>
              </li>
            ))}
          </ul>
          <DarkModeButton darkMode={darkMode} setDarkMode={setDarkMode} />
          <div className="flex items-center border rounded border-white bg-gray-800 p-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6 text-gray-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
            <input
              className="block flex-1 border-none bg-transparent text-white placeholder:text-gray-400 py-1.5 pl-2 focus:outline-none sm:text-sm"
              placeholder="Buscar"
            />
          </div>
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}

export default Navbar;
