export const fetchRecetasFromSupabase = async ({ categoria, popular, cantidad, filtro }) => {
  try {
    let url = `http://localhost:8000/api/recetas?`;
    
    // Construir URL con todos los parámetros posibles
    const params = new URLSearchParams();
    
    if (popular) {
      params.append('calificacion', 'true');
    }
    if (categoria) {
      params.append('categoria', categoria);
    }
    if (cantidad) {
      params.append('cantidad', cantidad);
    }
    if (filtro) {
      params.append('filtro', filtro);
    }

    url += params.toString();

    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status}`);
    }

    const data = await response.json();
    return data.recipes;
  } catch (error) {
    console.error("Error obteniendo las recetas:", error);
    throw error;
  }
};

export const createRecipe = async (formData) => {
  try {
    console.log(formData)
    const response = await fetch("http://localhost:8000/api/recetas/create/", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      const errorMessage =
        errorData && errorData.error
          ? errorData.error
          : `Error desconocido (${response.status})`;

      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creando la receta:", error.message);
    throw error;
  }
};


export const submitRating = async (recipeId, calificacion) => {
  try {
    const response = await fetch(`http://localhost:8000/api/recetas/${recipeId}/rating/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ calificacion })
    });

    if (!response.ok) {
      throw new Error(`Error al calificar la receta: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error enviando calificación:", error);
    throw error;
  }
};
