import React, { useState, useEffect } from "react";
import Recipes from "../../../components/recipes/Recipes";
import { getRecetasFav } from "../../../controllers/panel/dashboard";

const FavoritasSection = ({ darkMode, userinfo }) => {
  const [ids, setIds] = useState();

  useEffect(() => {
    // Verificamos que 'userinfo' exista antes de hacer la petición
    if (userinfo && userinfo.user_id) {
      const fetchRecetasFav = async () => {
        try {
          const recetaIds = await getRecetasFav(userinfo); // Obtener los IDs de las recetas favoritas
          setIds(recetaIds); // Actualizar el estado con los IDs de las recetas
        } catch (error) {
          console.error("Error obteniendo las recetas favoritas:", error);
        }
      };

      fetchRecetasFav(); // Llamada a la función asincrónica
    }
  }, [userinfo]); // Dependencia para re-ejecutar cuando 'userinfo' cambie

  return (
    <main
      className={`p-6 min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-200 text-gray-800"
      }`}
    >
      <header className="text-center mb-8">
        <h1 className="font-extrabold text-4xl">Sección de Recetas</h1>
        <p className={`mt-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
          Explora nuestras recetas más populares y deliciosas.
        </p>
      </header>
      <section className="flex flex-col flex-grow justify-center items-center">
        {Array.isArray(ids) && ids.length > 0 ? (
          <>
            <Recipes ids={ids} darkMode={darkMode} showFavoriteOption userinfo={userinfo}/>
          </>
        ) : (
          <p
            className={`text-center text-lg ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            No hay recetas disponibles
          </p>
        )}
      </section>
    </main>
  );
};

export default FavoritasSection;
