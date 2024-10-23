import React, { useState } from "react";

const RatingStars = ({ recipeId }) => {
  const [rating, setRating] = useState(0);

  const handleRatingSubmit = async (newRating) => {
    try {
      const response = await fetch(`http://localhost:8000/api/recetas/${recipeId}/calificacion`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ calificacion: newRating }),
      });

      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status}`);
      }

      const data = await response.json();
      console.log("Calificación guardada:", data);

      // Opcional: Reiniciar la calificación o mostrar un mensaje
      setRating(newRating); // Actualiza el estado para reflejar la calificación
    } catch (error) {
      console.error("Error guardando la calificación:", error);
    }
  };

  return (
    <div>
      <div className="flex space-x-1">
        {[...Array(5)].map((_, i) => (
          <button
            key={i}
            onClick={() => {
              const newRating = i + 1; // La calificación es de 1 a 5
              if (newRating !== rating) { // Solo envía si hay un cambio
                setRating(newRating);
                handleRatingSubmit(newRating);
              }
            }}
            className={`text-2xl ${rating > i ? "text-yellow-500" : "text-gray-300"}`}
          >
            ★
          </button>
        ))}
      </div>
    </div>
  );
};

export default RatingStars;
