import React, { useEffect } from "react";
import Recipes from "../../../components/recipes/Recipes";
import { getCategories } from "../../../controllers/panel/dashboard";

function HomeSection({ darkMode, userinfo }) {
  console.log(userinfo)

  useEffect(() => {
    // Ejecutamos getCategories solo si no existe preferencia en userinfo
    if (userinfo && !userinfo.preferencia) {
      getCategories(userinfo);
    }
  }, [userinfo]);  // Dependencia de userinfo para que se ejecute cuando userinfo cambie

  return (
    <main
      className={`p-6 min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-200 text-gray-800"
      }`}
    >
      <section>
        <header className="text-center mb-8">
          <h1 className="font-extrabold text-4xl">Recomendado Para Ti</h1>
        </header>
        <div className="mt-12 max-w-7xl mx-auto p-5">
          <Recipes
            darkMode={darkMode}
            categoria={userinfo && userinfo.preferencia ? userinfo.preferencia : ''}
            cantidad={3}
            isRecetasPage
          />
        </div>
      </section>

      <section>
        <header className="text-center mb-8">
          <h1 className="font-extrabold text-4xl">Recetas Más Populares</h1>
        </header>
        <div className="mt-12 max-w-7xl mx-auto p-5">
          <Recipes darkMode={darkMode} popular cantidad={3} />
        </div>
      </section>
    </main>
  );
}

export default HomeSection;
