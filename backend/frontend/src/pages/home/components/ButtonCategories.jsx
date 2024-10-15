import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const traducciones = {
  Lamb: "Cordero",
  Miscellaneous: "Varios",
  Pasta: "Pasta",
  Pork: "Cerdo",
  Side: "Acompañamiento",
  Seafood: "Mariscos",
  Starter: "Entrante",
  Vegan: "Vegano",
  Vegetarian: "Vegetariano",
  Beef: "Res",
  Breakfast: "Desayuno",
  Chicken: "Pollo",
  Dessert: "Postre",
  Goat: "Cabra",
};

const ingredientes = [
  { id: 1, strCategory: "Beef", imgSrc: "https://www.themealdb.com/images/category/beef.png" },
  { id: 2, strCategory: "Chicken", imgSrc: "https://www.themealdb.com/images/category/chicken.png" },
  { id: 3, strCategory: "Vegetarian", imgSrc: "https://www.themealdb.com/images/category/vegetarian.png" },
  { id: 4, strCategory: "Pasta", imgSrc: "https://www.themealdb.com/images/category/pasta.png" },
  { id: 5, strCategory: "Seafood", imgSrc: "https://www.themealdb.com/images/category/seafood.png" },
  { id: 6, strCategory: "Dessert", imgSrc: "https://www.themealdb.com/images/category/dessert.png" },
  { id: 7, strCategory: "Miscellaneous", imgSrc: "https://www.themealdb.com/images/category/miscellaneous.png" },
  { id: 8, strCategory: "Side", imgSrc: "https://www.themealdb.com/images/category/side.png" },
  { id: 9, strCategory: "Lamb", imgSrc: "https://www.themealdb.com/images/category/lamb.png" },
  { id: 10, strCategory: "Pork", imgSrc: "https://www.themealdb.com/images/category/pork.png" },
  { id: 11, strCategory: "Goat", imgSrc: "https://www.themealdb.com/images/category/goat.png" },
  { id: 12, strCategory: "Starter", imgSrc: "https://www.themealdb.com/images/category/starter.png" },
  { id: 13, strCategory: "Breakfast", imgSrc: "https://www.themealdb.com/images/category/breakfast.png" },
  { id: 14, strCategory: "Vegan", imgSrc: "https://www.themealdb.com/images/category/vegan.png" },
];

const ButtonCategories = ({ darkMode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex">
      <div
        className={`fixed top-0 left-0 z-40 h-full transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } w-80 md:flex-shrink-0 bg-opacity-80 duration-300 ${
          darkMode ? "bg-gray-900" : "bg-gray-100"
        }`}
      >
        <div className="flex flex-col h-full pt-5 pb-4 overflow-auto scrollbar-none">
          <nav className="flex-1 px-2 space-y-1">
            <h1 className="text-2xl font-extrabold px-2 mt-24">Categorías</h1>
            <hr className="me-8 py-6" />
            <div className="space-y-8">
              <div className="grid grid-cols-2 md:grid-cols-2 gap-4 p-4 rounded-lg transition-colors duration-300">
                {ingredientes.map((item) => (
                  <Link
                    to={`/category/${item.strCategory}`}
                    key={item.id}
                    className={`flex flex-col items-center p-2 rounded-lg shadow-md hover:bg-gray-300 focus:outline-none ${
                      darkMode
                        ? "bg-gray-700 text-white hover:bg-gray-600"
                        : "bg-gray-200 text-gray-900 hover:bg-gray-300"
                    } transition-colors duration-300`}
                  >
                    <img
                      src={item.imgSrc}
                      alt={item.strCategory}
                      className="rounded-full w-24 h-24 object-cover mb-2"
                    />
                    <h1 className="text-center text-sm font-medium">
                      {traducciones[item.strCategory] || item.strCategory}
                    </h1>
                  </Link>
                ))}
              </div>
            </div>
          </nav>
        </div>
      </div>
      <div
        className={`fixed top-1/2 left-0 transform -translate-y-1/2 z-40 ${
          isOpen ? "translate-x-80" : ""
        } duration-300`}
      >
        <button
          onClick={togglePanel}
          className={`p-2 w-10 h-24 bg-gray-200 rounded-r-lg shadow-lg focus:outline-none hover:bg-gray-300 ${
            darkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-black"
          }`}
        >
          {isOpen ? <ChevronDoubleLeftIcon /> : <ChevronDoubleRightIcon />}
        </button>
      </div>
    </div>
  );
};

export default ButtonCategories;
