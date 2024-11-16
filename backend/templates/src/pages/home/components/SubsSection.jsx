import React from "react";
import { Link } from "react-router-dom";

function Subscriptions() {
  return (
    <>
      <div className="max-w-6xl mx-auto">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">
            ¡Únete a nuestras Suscripciones Premium!
          </h2>
          <p className="text-xl mb-6">
            Obtén acceso a recetas exclusivas, herramientas avanzadas y mucho
            más. ¡Tu primer mes es gratis por tiempo limitado!
          </p>
        </div>
        <div className="flex justify-center">
          <Link
            to="/subs#"
            className="inline-block bg-green-500 text-white font-semibold py-3 px-8 rounded-full hover:bg-green-600 transition-colors duration-300"
          >
            Ver las suscripciones
          </Link>
        </div>
      </div>
    </>
  );
}

export default Subscriptions;
