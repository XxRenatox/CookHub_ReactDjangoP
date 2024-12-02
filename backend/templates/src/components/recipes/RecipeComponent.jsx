import React, { useState } from "react";
import { FacebookIcon, InstagramIcon, TwitterIcon } from "../common/Icons";
import { BookmarkIcon, BookOpenIcon } from "@heroicons/react/24/outline";
import ButtonFav from "./common/ButtonFav";
import RatingStars from "./common/ratingStars";
import { removeFromFavorites } from "../../controllers/panel/dashboard";

const Recipe = ({
  receta,
  darkMode,
  searchPage,
  userinfo,
  showFavoriteOption,
}) => {
  const [isIngredientesOpen, setIngredientesOpen] = useState(false);
  const [isInstruccionesOpen, setInstruccionesOpen] = useState(false);

  const getIngredients = () => {
    return receta.ingredientes.map(
      (item) => `${item.medida} ${item.ingrediente}`
    );
  };

  const getInstructions = () => {
    return receta.instrucciones ? receta.instrucciones.split("\n") : [];
  };

  const encodeURI = (text) => encodeURIComponent(text);

  const shareText = `${receta.strMeal} - ${receta.instrucciones}`;

  const facebookShareURL = `https://www.facebook.com/sharer/sharer.php?u=${encodeURI(
    window.location.href
  )}`;
  const twitterShareURL = `https://twitter.com/intent/tweet?text=${encodeURI(
    shareText
  )}`;

  return (
    <section
      className={`rounded-2xl shadow-md mb-4 p-4 w-full flex flex-col justify-between transition-colors duration-300 ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
    >
      {/* Imagen */}
      <img
        src={receta.imagen}
        className="mx-auto w-full sm:h-60 h-96 object-cover"
        alt={receta.titulo}
      />

      {/* Título */}
      <h5 className="text-xl font-bold mb-5 mt-5">{receta.titulo}</h5>

      <div>
        {searchPage && (
          <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-2 md:space-y-0 md:space-x-1">
            <ButtonFav recipeId={receta.id} userId={userinfo} />
            <RatingStars recipeId={receta.id} />
          </div>
        )}
      </div>

      {/* Ingredientes e Instrucciones */}
      <div>
        <div
          className={`border-t ${
            darkMode ? "border-gray-600" : "border-gray-200"
          }`}
        >
          {/* Ingredientes */}
          <h2
            className={`text-lg font-semibold cursor-pointer flex items-center py-2 border-b ${
              darkMode ? "border-gray-600" : "border-gray-200"
            }`}
            onClick={() => setIngredientesOpen(!isIngredientesOpen)}
          >
            <BookmarkIcon className="w-6 h-6 mr-2" />
            Ingredientes
          </h2>
          {isIngredientesOpen && (
            <ul className="list-disc pl-5">
              {getIngredients().map((ingrediente, i) => (
                <li key={i} className="py-1">
                  {ingrediente}
                </li>
              ))}
            </ul>
          )}

          {/* Instrucciones */}
          <h2
            className={`text-lg font-semibold cursor-pointer flex items-center py-2 border-b ${
              darkMode ? "border-gray-600" : "border-gray-200"
            }`}
            onClick={() => setInstruccionesOpen(!isInstruccionesOpen)}
          >
            <BookOpenIcon className="w-6 h-6 mr-2" />
            Instrucciones
          </h2>
          {isInstruccionesOpen && (
            <ul className="list-disc pl-5">
              {getInstructions().map((instruccion, i) => (
                <li key={i} className="py-1 list-item">
                  {instruccion}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Compartir y Autor */}
      <div>
        <div className="flex space-x-4 mt-4 justify-center">
          <a href={facebookShareURL} target="_blank" rel="noopener noreferrer">
            <img src={FacebookIcon} alt="Facebook Icon" className="w-8 h-8" />
          </a>
          <a href={twitterShareURL} target="_blank" rel="noopener noreferrer">
            <img src={TwitterIcon} alt="Twitter Icon" className="w-8 h-8" />
          </a>
          <a
            href={`https://www.instagram.com`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={InstagramIcon} alt="Instagram Icon" className="w-8 h-8" />
          </a>
        </div>
        <p className="text-sm font-bold text-center mt-4">
          Creada por: {receta.creador_nombre}
        </p>
      </div>

      {/* Botón "Eliminar de Favoritos" */}
      {showFavoriteOption && (
        <div className="mt-4 flex justify-center">
          <button
            onClick={() => removeFromFavorites(receta.id, userinfo)}
            className={`px-4 py-2 rounded-lg text-white ${
              darkMode
                ? "bg-red-600 hover:bg-red-700"
                : "bg-red-500 hover:bg-red-600"
            }`}
          >
            Eliminar de Favoritos
          </button>
        </div>
      )}
    </section>
  );
};

export default Recipe;
