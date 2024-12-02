import React, { useState, useEffect } from "react";
import {
  fetchRecetasFromSupabase,
  fetchRecetaById,
} from "../../controllers/panel/recipeService";
import Recipe from "./RecipeComponent";

const FilterDropdown = ({ label, options, value, onChange }) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="p-2 rounded text-black"
  >
    <option value="">{label}</option>
    {options.map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    ))}
  </select>
);

export const Recipes = ({
  categoria,
  userinfo,
  darkMode,
  showFavoriteOption,
  popular,
  searchPage,
  ids,
  cantidad,
}) => {
  const [recetas, setRecetas] = useState([]);
  const [filtroDificultad, setFiltroDificultad] = useState(""); // Solo dificultad
  const [loading, setLoading] = useState(true);

  // Efecto para cargar recetas
  useEffect(() => {
    const fetchRecetas = async () => {
      setLoading(true); // Empezamos con el estado de carga activado

      let recetasData;
      if (ids && ids.length > 0) {
        // Buscar recetas por IDs
        recetasData = await fetchRecetaById(ids);
      } else {
        // Buscar recetas con filtro de dificultad y parámetros adicionales
        recetasData = await fetchRecetasFromSupabase({
          categoria,
          dificultad: filtroDificultad, // Solo pasamos el filtro de dificultad
          popular,
          cantidad,
        });
      }

      setRecetas(recetasData); // Actualizamos las recetas
      setLoading(false); // Desactivamos el estado de carga
    };

    fetchRecetas(); // Ejecutamos la función para obtener las recetas
  }, [categoria, filtroDificultad, popular, cantidad, ids]); // Dependencias del efecto

  return (
    <>
      {searchPage && (
        <div className="w-full h-20">
          <div className="flex justify-center items-center space-x-5">
            <p>Filtros:</p>

            {/* Filtro de Dificultad */}
            <FilterDropdown
              label="Dificultad"
              options={["Difícil", "Medio", "Fácil"]}
              value={filtroDificultad}
              onChange={setFiltroDificultad} // Actualizamos el estado con el valor del filtro
            />
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
              searchPage={searchPage}
              userinfo={userinfo}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default Recipes;
