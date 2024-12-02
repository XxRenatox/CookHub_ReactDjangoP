// src/views/NotFound.js
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/common/Navbar";

const NotFound = () => {
  return (
    <>
      <Navbar options={[{}]} />
      <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-b from-blue-100 to-blue-400">
        <h1 className="text-6xl font-bold text-blue-800 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">
          Oops, página no encontrada
        </h2>
        <p className="text-gray-600 text-lg mb-8 text-center">
          Parece que la página que estás buscando no existe o fue movida.
        </p>
        <Link
          to="/"
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        >
          Volver al inicio
        </Link>
      </div>
    </>
  );
};

export default NotFound;