import React, { useState, useEffect } from "react";

const FavoriteButton = ({ recipeId, userId }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);

  // Al cargar el componente, verificar si la receta ya es favorita
  useEffect(() => {
    const checkFavoriteStatus = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/recetas/setfav/${recipeId}/${userId}/`
        );
        const data = await response.json();
        setIsFavorite(data.is_favorite); // Asumiendo que 'is_favorite' es el valor en la respuesta
      } catch (error) {
        console.error("Error al verificar el estado del favorito:", error);
      }
    };

    checkFavoriteStatus();
  }, [recipeId, userId]); // Se ejecuta solo cuando el recipeId o userId cambia

  const handleFavoriteSubmit = async () => {
    setLoading(true); // Inicia el estado de carga
    try {
      const response = await fetch(
        `http://localhost:8000/api/recetas/setfav/${recipeId}/${userId}/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status}`);
      }

      const data = await response.json();
      console.log("Favorito actualizado:", data);
      setIsFavorite(data.is_favorite); // Actualiza el estado según la respuesta
    } catch (error) {
      console.error("Error guardando la calificación:", error);
    } finally {
      setLoading(false); // Detiene el estado de carga
    }
  };

  const handleClick = () => {
    if (!loading) {
      setIsFavorite((prevState) => !prevState); // Cambia el estado local antes de la respuesta
      handleFavoriteSubmit();
    }
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className={`p-2 rounded-full fav-btn ${loading ? "opacity-50" : ""}`}
        disabled={loading}
      >
        <span className={`text-2xl transition-transform duration-300`}>
          {isFavorite ? "❤️" : "🤍"}
        </span>
      </button>
    </div>
  );
};

export default FavoriteButton;
