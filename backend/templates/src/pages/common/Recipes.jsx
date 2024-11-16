import React, { useState, useEffect } from "react";
import { fetchRecetasFromSupabase } from "../../controllers/panel/recipeService";
import Recipe from "./RecipeComponent";

export const Recipes = ({
  categoria,
  darkMode,
  showFavoriteOption,
  popular,
  searchPage,
  cantidad = 10, // Cantidad de recetas a obtener
}) => {
  const [recetas, setRecetas] = useState([]);
  const [filtroDificultad, setFiltroDificultad] = useState("");
  const [filtroCocina, setFiltroCocina] = useState("");
  const [filtroTiempo, setFiltroTiempo] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecetas = async () => {
      setLoading(true);

      const recetasFromSupabase = await fetchRecetasFromSupabase({
        categoria,
        dificultad: filtroDificultad,
        tipoCocina: filtroCocina,
        tiempo: filtroTiempo,
        popular,
        cantidad,
      });
      
      setRecetas(recetasFromSupabase);
      setLoading(false);
    };

    if (categoria || popular) {
      fetchRecetas();
    } else {
      setLoading(false);
    }
  }, [categoria, filtroDificultad, filtroCocina, filtroTiempo, popular, cantidad]);

  return (
    <>
      {searchPage && (
        <div className="w-full h-20">
          <div className="flex justify-center items-center space-x-5">
            <p>Filtros:</p>

            {/* Filtro de Dificultad */}
            <select
              value={filtroDificultad}
              onChange={(e) => setFiltroDificultad(e.target.value)}
              className="p-2 rounded text-black"
            >
              <option value="">Dificultad</option>
              <option value="Difícil">Difícil</option>
              <option value="Medio">Medio</option>
              <option value="Fácil">Fácil</option>
            </select>

            {/* Filtro de Tipo de Cocina */}
            <select
              value={filtroCocina}
              onChange={(e) => setFiltroCocina(e.target.value)}
              className="p-2 rounded text-black"
            >
              <option value="">Tipo de Cocina</option>
              <option value="Italiana">Italiana</option>
              <option value="Mexicana">Mexicana</option>
              <option value="China">China</option>
              <option value="Japonesa">Japonesa</option>
              <option value="Francesa">Francesa</option>
            </select>

            {/* Filtro de Tiempo de Preparación */}
            <select
              value={filtroTiempo}
              onChange={(e) => setFiltroTiempo(e.target.value)}
              className="p-2 rounded text-black"
            >
              <option value="">Tiempo de Preparación</option>
              <option value="Menos de 30 min">Menos de 30 min</option>
              <option value="30-60 min">30-60 min</option>
              <option value="Más de 1 hora">Más de 1 hora</option>
            </select>
          </div>
        </div>
      )}
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
        </div>
      ) : (
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-colors duration-300 ${
            darkMode ? "bg-gray-900" : "bg-slate-200"
          }`}
        >
          {recetas.map((receta) => (
            <Recipe
              key={receta.id}
              receta={receta}
              darkMode={darkMode}
              showFavoriteOption={showFavoriteOption}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default Recipes;
