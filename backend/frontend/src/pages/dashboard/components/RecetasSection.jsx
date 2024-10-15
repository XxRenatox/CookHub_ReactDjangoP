import React from "react";
import Recipes from "../../common/Recipes";

function RecetasSection({ darkMode }) {
  return (
    <main className={`p-6 min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"}`}>
      <header className="text-center mb-8">
        <h1 className="font-extrabold text-4xl">
          Sección de Recetas
        </h1>
        <p className={`mt-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
          Explora nuestras recetas más populares y deliciosas.
        </p>
      </header>
      <section className="flex flex-col flex-grow justify-center items-center">
        <Recipes categoria="Lamb" darkMode={darkMode} isRecetasPage />
      </section>
    </main>
  );
}

export default RecetasSection;
