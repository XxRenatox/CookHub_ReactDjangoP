import React, { useState, useEffect } from "react";
import {
  CogIcon,
  BellIcon,
  ArrowRightEndOnRectangleIcon,
} from "@heroicons/react/24/solid";

import { getProducts } from "../../../controllers/panel/panelService";

function PerfilSection({ darkMode }) {
  const [products, setProducts] = useState({
    product1: "",
    product2: "",
    product3: "",
  });
  const [preference, setPreference] = useState("");
  const [allOptions, setAllOptions] = useState([]);
  const [allPreferences, setAllPreferences] = useState([]);

  useEffect(() => {
    const cargarOpciones = async () => {
      const opciones = await getProducts();
      setAllOptions(opciones);
    };

    const cargarPreferencias = () => {
      const preferencias = [
        "Lamb",
        "Miscellaneous",
        "Pasta",
        "Pork",
        "Side",
        "Seafood",
        "Starter",
        "Vegan",
        "Vegetarian",
        "Breakfast",
        "Chicken",
        "Dessert",
        "Goat",
      ];
      setAllPreferences(preferencias);
    };

    cargarOpciones();
    cargarPreferencias();

    // Cargar datos del localStorage
    const storedProducts = JSON.parse(localStorage.getItem("products"));
    const storedPreference = localStorage.getItem("preference");

    if (storedProducts) setProducts(storedProducts);
    if (storedPreference) setPreference(storedPreference);
  }, []);

  useEffect(() => {
    // Guardar en localStorage cuando los productos cambien
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    // Guardar en localStorage cuando la preferencia cambie
    localStorage.setItem("preference", preference);
  }, [preference]);

  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setProducts((prev) => ({ ...prev, [name]: value }));
  };

  const handlePreferenceChange = (e) => {
    setPreference(e.target.value);
  };

  const containerStyle = darkMode
    ? "bg-gray-900 text-white"
    : "bg-gray-100 text-gray-800";

  return (
    <main
      className={`p-6 min-h-screen transition-colors duration-300 ${containerStyle}`}
    >
      <header className="text-center mb-8">
        <h1 className="font-extrabold text-4xl">Sección de Perfil</h1>
        <p className={`mt-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
          Administra la información de tu perfil y configuración personal
        </p>
      </header>

      <section className="flex flex-col lg:flex-row lg:justify-center items-center lg:gap-6 gap-8">
        <ProfileCard darkMode={darkMode} />
        <div className="space-y-12">
          <h2
            className={`text-2xl font-extrabold pb-5 ${
              darkMode ? "text-white" : "text-black"
            }`}
          >
            Selecciona Producto
          </h2>
          <div className="md:grid md:grid-cols-1 md:gap-6 space-y-5 md:space-y-8">
            <OptionsCard
              darkMode={darkMode}
              options={allOptions}
              productName="product1"
              productValue={products.product1}
              handleProductChange={handleProductChange}
            />
            <OptionsCard
              darkMode={darkMode}
              options={allOptions}
              productName="product2"
              productValue={products.product2}
              handleProductChange={handleProductChange}
            />
            <OptionsCard
              darkMode={darkMode}
              options={allOptions}
              productName="product3"
              productValue={products.product3}
              handleProductChange={handleProductChange}
            />
          </div>

          <div>
            <h2
              className={`text-2xl font-extrabold pb-5 ${
                darkMode ? "text-white" : "text-black"
              }`}
            >
              Selecciona Preferencia
            </h2>
            <div className="lg:grid md:grid-cols-1 lg:gap-6 space-y-5 lg:space-y-0">
              <select
                className={`bg-gray-50 border ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "border-gray-300 text-gray-900"
                } text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                name="preference"
                onChange={handlePreferenceChange}
                value={preference}
              >
                <option value="" disabled>
                  Selecciona una Preferencia
                </option>
                {allPreferences.map((pref, index) => (
                  <option key={index} value={pref}>
                    {pref}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

const ProfileCard = ({ darkMode }) => {
  const productos = JSON.parse(localStorage.getItem("products")) || {};
  const preferencias = localStorage.getItem("preferences");

  // Filtra productos vacíos o duplicados
  const productosFiltrados = Object.values(productos).filter(
    (item, index, self) => item && self.indexOf(item) === index
  );

  return (
    <div
      className={`shadow-lg rounded-lg p-8 w-full max-w-md ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
      }`}
    >
      <img
        src="https://avatar.iran.liara.run/public/1"
        alt="Foto de perfil"
        className="mb-4 rounded-full w-32 h-32 object-cover mx-auto border-4 border-blue-500"
      />
      <p className="mb-4">
        <strong>Nombre:</strong> 123456
      </p>
      <p className="mb-4">
        <strong>Correo electrónico:</strong> juan.perez@email.com
      </p>
      <p className="mb-4">
        <strong>Miembro desde:</strong> Enero 2023
      </p>

      <h2 className="text-lg font-bold mt-6 mb-2">Productos Seleccionados</h2>
      <div>
        {productosFiltrados.length > 0 ? (
          productosFiltrados.map((item, index) => (
            <p key={index}>{item}</p>
          ))
        ) : (
          <p>No hay productos seleccionados</p>
        )}
      </div>

      <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 flex items-center gap-2">
        <ArrowRightEndOnRectangleIcon className="h-6 w-6" />
        Cerrar Sesión
      </button>
    </div>
  );
};

const OptionsCard = ({
  darkMode,
  options,
  productName,
  productValue,
  handleProductChange,
}) => (
  <div className="flex flex-col gap-3">
    <select
      className={`bg-gray-50 border ${
        darkMode
          ? "bg-gray-700 border-gray-600 text-white"
          : "border-gray-300 text-gray-900"
      } text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
      name={productName}
      onChange={handleProductChange}
      value={productValue}
    >
      <option value="" disabled>
        Selecciona un Producto
      </option>
      {options.map((opt, index) => (
        <option key={index} value={opt.value}>
          {opt.nombre}
        </option>
      ))}
    </select>
  </div>
);

export default PerfilSection;
