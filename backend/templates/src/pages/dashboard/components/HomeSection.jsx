import React from "react";
import Recipes from "../../common/Recipes";

function HomeSection({ darkMode }) {
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
            <Recipes darkMode={darkMode} categoria={"Miscellaneous"} cantidad={50}/>
        </div>
      </section>

      <section>
        <header className="text-center mb-8">
          <h1 className="font-extrabold text-4xl">Recetas Mas Populares</h1>
        </header>
        <div className="mt-12 max-w-7xl mx-auto p-5">
            <Recipes darkMode={darkMode} popular cantidad={6}/>
        </div>
      </section>
    </main>
  );
}

export default HomeSection;
