import React, { useState } from "react";
import tecnicasData from "../../../assets/tecnicas_cocina.json";

function TecnicasSection({ darkMode }) {
  const [visibleCount, setVisibleCount] = useState(6);
  const hasMore = visibleCount < tecnicasData.length;

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => Math.min(prevCount + 6, tecnicasData.length));
  };

  return (
    <main
      className={`p-6 min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"
      }`}
    >
      <header className="text-center mb-8">
        <h1 className="font-extrabold text-4xl">Técnicas de Cocina</h1>
        <p className={`mt-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
          Aprende y mejora tus habilidades en la cocina con nuestras técnicas.
        </p>
      </header>
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tecnicasData.slice(0, visibleCount).map((tecnica) => (
            <div
              key={tecnica.id}
              className={`rounded-2xl border-4 shadow-md p-4 ${
                darkMode
                  ? "bg-gray-800 border-gray-700 text-white"
                  : "bg-white border-slate-300 text-black"
              }`}
            >
              <h2 className="text-xl font-semibold mb-2">{tecnica.nombre}</h2>
              <p className="mb-4">{tecnica.descripcion}</p>
              <p>
                <strong>Ejemplo:</strong> {tecnica.ejemplo}
              </p>
            </div>
          ))}
        </div>
        {hasMore && (
          <div className="text-center mt-8">
            <button
              onClick={handleLoadMore}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-colors"
            >
              Ver Más
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

export default TecnicasSection;
