import React, { useState, useEffect } from "react";
import { fetchRecetasFromSupabase } from "../../controllers/panel/recipeService";
import RecipeList from "./recipeList";

export const Recipes = ({ categoria, darkMode, showFavoriteOption, homeSection, isRecetasPage }) => {
  const [recetas, setRecetas] = useState([]);
  const [filtro, setFiltro] = useState("");

  useEffect(() => {
    const fetchRecetas = async () => {
      const recetasFromSupabase = await fetchRecetasFromSupabase(categoria, filtro, homeSection);
      setRecetas(recetasFromSupabase);
    };

    if (categoria || homeSection) {
      fetchRecetas();
    }
  }, [categoria, filtro, homeSection]);

  return (
    <>
      {isRecetasPage && (
        <div className="w-full h-20">
          <div className={`flex justify-center items-center space-x-5 `}>
            <p>Filtros: </p>
            <select value={filtro} onChange={(e) => setFiltro(e.target.value)} className="p-2 rounded text-black">
              <option value="" disabled>Dificultad</option>
              <option value="Difícil">Difícil</option>
              <option value="Medio">Medio</option>
              <option value="Fácil">Fácil</option>
            </select>
          </div>
        </div>
      )}
      <RecipeList recetas={recetas} darkMode={darkMode} showFavoriteOption={showFavoriteOption} isRecetasPage={isRecetasPage} />
    </>
  );
};

export default Recipes;