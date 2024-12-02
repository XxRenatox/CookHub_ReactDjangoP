import React, { useState, useEffect } from "react";
import { getMisRecetas } from "../../../../controllers/panel/dashboard";
import Recipes from "../../../../components/recipes/Recipes";

function MyRecipesSection({ darkMode, userinfo }) {
  const [ids, setIds] = useState();

  useEffect(() => {
    // Verificamos que 'userinfo' exista antes de hacer la petición
    if (userinfo && userinfo.user_id) {
      const fetchRecetasFav = async () => {
        try {
          const recetaIds = await getMisRecetas(userinfo); // Obtener los IDs de las recetas favoritas
          setIds(recetaIds); // Actualizar el estado con los IDs de las recetas
        } catch (error) {
          console.error("Error obteniendo las recetas:", error);
        }
      };

      fetchRecetasFav();
    }
  }, [userinfo]);

  return (
    <main
      className={`p-6 min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-slate-200 text-gray-800"
      }`}
    >
      <header className="text-center mb-8">
        <h1 className="font-extrabold text-4xl">Sección de Recetas</h1>
        <p className={`mt-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
          Explora nuestras recetas más populares y deliciosas.
        </p>
      </header>
      <section className="flex flex-col flex-grow justify-center items-center">
      <div className="mt-12 max-w-7xl mx-auto p-5">
        {Array.isArray(ids) && ids.length > 0 ? (
          <>
            <Recipes ids={ids} darkMode={darkMode} />
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
        </div>
      </section>
    </main>
  );
}

export default MyRecipesSection;
