import React, { useState } from "react";
import { FacebookIcon, InstagramIcon, TwitterIcon } from "./Icons";
import { BookmarkIcon, BookOpenIcon } from "@heroicons/react/24/outline";
import ButtonFav from "./ButtonFav";
import RatingStars from "./ratingStars";

const Recipe = ({ receta, darkMode, isRecetasPage }) => {
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
      className={`rounded-2xl shadow-md mb-4 p-4 w-full transition-colors duration-300 ${
        darkMode
          ? "bg-gray-800 text-white"
          : "bg-white text-black"
      }`}
    >
        <img
          src={receta.imagen}
          className="mx-auto w-full sm:h-60 h-96 object-cover"
          alt={receta.titulo}
        />
        <h5 className="text-xl font-bold mb-5 mt-5">{receta.titulo}</h5>
        <div>
          {isRecetasPage && (
            <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-2 md:space-y-0 md:space-x-1">
              <ButtonFav />
              <RatingStars recipeId={receta.id} />
            </div>
          )}
        </div>

        <div
          className={`border-t ${
            darkMode ? "border-gray-600" : "border-gray-200"
          }`}
        >
          <div className="accordion-item mt-2">
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
              <div>
                <ul className="list-disc pl-5">
                  {getIngredients().map((ingrediente, i) => (
                    <li key={i} className="py-1">
                      {ingrediente}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="accordion-item mt-2">
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
              <div>
                <ul className="list-disc pl-5">
                  {getInstructions().map((instruccion, i) => (
                    <li key={i} className="py-1 list-item">
                      {instruccion}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
            <div className="flex space-x-4 mt-4 justify-center">
              <a
                href={facebookShareURL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={FacebookIcon}
                  alt="Facebook Icon"
                  className="w-8 h-8"
                />
              </a>
              <a
                href={twitterShareURL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={TwitterIcon} alt="Twitter Icon" className="w-8 h-8" />
              </a>
              <a
                href={`https://www.instagram.com`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={InstagramIcon}
                  alt="Instagram Icon"
                  className="w-8 h-8"
                />
              </a>
            </div>
        </div>
    </section>
  );
};

export default Recipe;
