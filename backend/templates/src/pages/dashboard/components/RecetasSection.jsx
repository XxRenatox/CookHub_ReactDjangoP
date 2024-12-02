import React from "react";
import Recipes from "../../../components/recipes/Recipes";

function RecetasSection({ darkMode, userinfo }) {
  return (
    <main
      className={`p-6 min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-slate-200 text-gray-800"
      }`}
    >
      <header className="text-center">
        <h1 className="font-extrabold text-4xl">Sección de Recetas</h1>
        <p className={`mt-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
          Explora nuestras recetas más populares y deliciosas.
        </p>
      </header>
      <section className="flex flex-col flex-grow justify-center items-center">
        <div className="mt-12 max-w-7xl mx-auto p-5">
          <Recipes
            categoria={
              userinfo && userinfo.preferencia ? userinfo.preferencia : ""
            }
            darkMode={darkMode}
            searchPage
            userinfo={userinfo && userinfo.user_id ? userinfo.user_id : ""}
          />
        </div>
      </section>
    </main>
  );
}

export default RecetasSection;
