import React from "react";
import { jwtDecode } from "jwt-decode";

const userinfo = jwtDecode(localStorage.getItem("token"));

function SettingsSection({ darkMode }) {
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
              {userinfo.nombre}
            </li>
            <li>
              <span className="font-semibold">Correo Electrónico:</span>{" "}
              {userinfo.correo_electronico}
            </li>
            <li>
              <span className="font-semibold">Premium:</span>{" "}
              {userinfo.premium ? "Sí" : "No"}
              {console.log(userinfo)}
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
              <button className="bg-indigo-600 text-white w-64 py-2 rounded-lg hover:bg-indigo-700 focus:outline-none">
                Cambiar nombre de usuario
              </button>
            </li>
            <li>
              <button className="bg-[#019863] text-white w-64 py-2 rounded-lg hover:bg-[#019833d8] focus:outline-none">
                Hacerse premium
              </button>
            </li>
            <li>
              <button className="bg-yellow-600 text-white w-64 py-2 rounded-lg hover:bg-yellow-700 focus:outline-none">
                Cambiar contraseña
              </button>
            </li>
            <li>
              <button className="bg-red-600 text-white w-64 py-2 rounded-lg hover:bg-red-700 focus:outline-none">
                Eliminar cuenta
              </button>
            </li>
          </ul>
        </div>

        {/* Tarjeta de personalización */}
        <div className="bg-gray-100 dark:bg-gray-700 p-5 rounded-lg shadow-md">
          <h2 className="font-bold text-xl mb-4 dark:text-white">
            Personalización
          </h2>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li>
              <label className="flex items-center space-x-3">
                <span>Modo oscuro</span>
                <input
                  type="checkbox"
                  checked={darkMode}
                  onChange={() => {
                    console.log("Modo oscuro cambiado");
                  }}
                  className="form-checkbox h-5 w-5 text-indigo-600 dark:text-indigo-400"
                />
              </label>
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}

export default SettingsSection;
