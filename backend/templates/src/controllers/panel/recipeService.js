import Swal from "sweetalert2";

export const fetchRecetaById = async (ids) => {
  try {
    const url = `http://localhost:8000/api/recetas/recetas_ids/`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ids }),
    });

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error obteniendo las recetas por ID:", error);
    throw error;
  }
};

export const fetchRecetasFromSupabase = async ({ popular, categoria, cantidad, dificultad }) => {
  try {
    let url = `http://localhost:8000/api/recetas?`;

    // Construir la URL con los filtros fijos
    const params = new URLSearchParams();

    // Filtros fijos
    if (popular) {
      params.append('calificacion', 'true');
    }
    if (categoria) {
      params.append('categoria', categoria);
    }
    if (cantidad) {
      params.append('cantidad', cantidad);
    }

    // Filtro de dificultad (dinámico)
    if (dificultad) {
      params.append('nivel_dificultad', dificultad);
    }

    // Mostrar la URL para depurar
    console.log('URL de solicitud:', url + params.toString());

    // Concatenar los parámetros de filtro a la URL
    url += params.toString();

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status}`);
    }

    const data = await response.json();
    return data.recipes; // Devuelve las recetas obtenidas
  } catch (error) {
    console.error('Error obteniendo las recetas:', error);
    throw error; // Lanzamos el error para manejarlo en el componente que llama a esta función
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
