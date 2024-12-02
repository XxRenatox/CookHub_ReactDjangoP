import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";  // Importamos SweetAlert2

const FavoriteButton = ({ recipeId, userId }) => {
  const [isFavorite, setIsFavorite] = useState(false);  // Estado del favorito
  const [loading, setLoading] = useState(false);  // Estado de carga

  // Llama al backend para agregar o eliminar la receta de favoritos
  const handleFavoriteSubmit = async () => {
    setLoading(true); // Inicia el estado de carga
    try {
      const response = await fetch(
        `http://localhost:8000/api/recetas/setfav/${userId}/${recipeId}/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        // Si el servidor devuelve 400, entonces la receta ya está en favoritos
        if (response.status === 400) {
          Swal.fire({
            icon: 'warning',
            title: 'Ya está en favoritos',
            text: 'Esta receta ya está en tu lista de favoritos.',
          });
        } else {
          throw new Error(`Error en la solicitud: ${response.status}`);
        }
      } else {
        // Si la solicitud es exitosa, actualiza el estado
        const data = await response.json();
        console.log("Favorito actualizado:", data);

        // Actualiza el estado de isFavorite de acuerdo a la respuesta del servidor
        setIsFavorite((prevState) => !prevState);  // Alterna entre true y false

        // Muestra una alerta de éxito
        Swal.fire({
          icon: 'success',
          title: '¡Receta agregada a favoritos!',
          text: 'Ahora tienes esta receta en tu lista de favoritos.',
        });
      }
    } catch (error) {
      console.error("Error guardando el favorito:", error);
      // Si hay error, no cambiamos el estado del corazón
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al guardar la receta en favoritos.',
      });
    } finally {
      setLoading(false); // Detiene el estado de carga
    }
  };

  const handleClick = () => {
    if (!loading) {
      handleFavoriteSubmit(); // Llama la función para actualizar el backend
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
          {isFavorite ? "❤️" : "🤍"} {/* Muestra el corazón rojo o vacío */}
        </span>
      </button>
    </div>
  );
};

export default FavoriteButton;
