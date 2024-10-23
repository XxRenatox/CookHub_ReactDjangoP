import React from 'react';
import Recipe from './Recipe';

const RecipeList = ({ recetas, darkMode, showFavoriteOption, isRecetasPage }) => (
  <div className={`grid gap-4 md:grid-cols-2 lg:grid-cols-3 p-4 transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
    {recetas.map((receta) => (
      <Recipe
        key={receta.id}
        receta={receta}
        darkMode={darkMode}
        showFavoriteOption={showFavoriteOption}
        isRecetasPage={isRecetasPage}
      />
    ))}
  </div>
);

export default RecipeList;
