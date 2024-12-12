import React from "react";
import { Link } from "react-router-dom";

const categorias = [
  { es: "Cordero", en: "Lamb" }, // Lamb
  { es: "Misceláneo", en: "Miscellaneous" }, // Miscellaneous
  { es: "Pasta", en: "Pasta" }, // Pasta
  { es: "Cerdo", en: "Pork" }, // Pork
  { es: "Acompañamiento", en: "Side" }, // Side
  { es: "Mariscos", en: "Seafood" }, // Seafood
  { es: "Entrante", en: "Starter" }, // Starter
  { es: "Vegano", en: "Vegan" }, // Vegan
  { es: "Vegetariano", en: "Vegetarian" }, // Vegetarian
  { es: "Res", en: "Beef" }, // Beef
  { es: "Desayuno", en: "Breakfast" }, // Breakfast
  { es: "Pollo", en: "Chicken" }, // Chicken
  { es: "Postre", en: "Dessert" }, // Dessert
  { es: "Cabra", en: "Goat" }, // Goat
];

function SettingsSection({ darkMode, userinfo }) {
  return (
    <main
      className={`p-6 min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-200 text-gray-800"
      }`}
    >
      <header className="text-center mb-8">
        <h1 className="font-extrabold text-4xl">Configuraciones</h1>
        <p className={`mt-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
          Edita tu información y personaliza tu experiencia.
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tarjeta de información del usuario */}
        <div className="bg-gray-100 dark:bg-gray-700 p-5 rounded-lg shadow-md">
          <h2 className="font-bold text-xl mb-4 dark:text-white">
            Información de la cuenta
          </h2>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li>
              <span className="font-semibold">Nombre de Usuario:</span>{" "}
              {userinfo && userinfo.nombre ? userinfo.nombre : "No disponible"}
            </li>
            <li>
              <span className="font-semibold">Correo Electrónico:</span>{" "}
              {userinfo && userinfo.correo_electronico
                ? userinfo.correo_electronico
                : "No disponible"}
            </li>
            <li>
              <span className="font-semibold">Preferencia Alimenticia:</span>{" "}
              {userinfo && userinfo.preferencia
                ? categorias.find(
                    (categoria) => categoria.en === userinfo.preferencia
                  )?.es
                : "No disponible"}
            </li>
            <li>
              <span className="font-semibold">Premium:</span>{" "}
              {userinfo && userinfo.premium ? "Sí" : "No"}
            </li>
          </ul>
        </div>

        {/* Tarjeta de Edición */}
        <div className="bg-gray-100 dark:bg-gray-700 p-5 rounded-lg shadow-md">
          <h2 className="font-bold text-xl mb-4 dark:text-white">
            Editar información
          </h2>
          <ul className="space-y-3">
            <li>
              {userinfo && userinfo.premium ? null : (
                <button className="bg-[#019863] text-white w-64 py-2 rounded-lg hover:bg-[#019833d8] focus:outline-none">
                  <Link to="/FormularioSubscripcion">Hacerse premium</Link>
                </button>
              )}
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}

export default SettingsSection;
