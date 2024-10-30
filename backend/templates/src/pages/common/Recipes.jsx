import React, { useState, useEffect } from "react";
import { fetchRecetasFromSupabase } from "../../controllers/panel/recipeService";
import RecipeList from "./RecipeList";

export const Recipes = ({
  categoria,
  darkMode,
  showFavoriteOption,
  homeSection,
  isRecetasPage,
}) => {
  const [recetas, setRecetas] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [loading, setLoading] = useState(true); // Estado para manejar la carga

  useEffect(() => {
    const fetchRecetas = async () => {
      setLoading(true); // Comienza la carga
      const recetasFromSupabase = await fetchRecetasFromSupabase(
        categoria,
        filtro,
        homeSection
      );
      setRecetas(recetasFromSupabase);
      setLoading(false); // Termina la carga
    };

    if (categoria || homeSection) {
      fetchRecetas();
    } else {
      setLoading(false); // Asegúrate de desactivar la carga si no hay categoria o homeSection
    }
  }, [categoria, filtro, homeSection]);

  return (
    <>
      {isRecetasPage && (
        <div className="w-full h-20">
          <div className={`flex justify-center items-center space-x-5`}>
            <p>Filtros: </p>
            <select
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              className="p-2 rounded text-black"
            >
              <option value="" disabled>
                Dificultad
              </option>
              <option value="Difícil">Difícil</option>
              <option value="Medio">Medio</option>
              <option value="Fácil">Fácil</option>
            </select>
          </div>
        </div>
      )}
      {loading ? ( // Muestra el spinner si loading es true
        <div className="flex justify-center items-center h-64">
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
          </div>
        </div>
      ) : (
        <RecipeList
          recetas={recetas}
          darkMode={darkMode}
          showFavoriteOption={showFavoriteOption}
          isRecetasPage={isRecetasPage}
        />
      )}
    </>
  );
};

export default Recipes;
