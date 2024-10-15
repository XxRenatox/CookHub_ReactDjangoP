export const fetchRecetasFromSupabase = async (categoria, filtro, isHomePage) => {
  try {
    // Construir la URL de la petición
    const url = isHomePage
      ? `http://localhost:8000/api/recetas?calificacion=true`  // Si es la homePage, filtrar por popularidad
      : `http://localhost:8000/api/recetas?categoria=${categoria || null}&filtro=${filtro || null}`;

    const response = await fetch(url);
    
    if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status}`);
    }

    const data = await response.json();  // Parsear los datos a JSON
    return data["recipes"];
  } catch (error) {
    console.error("Error obteniendo las recetas:", error);
    return null;  // Puedes retornar un valor por defecto o manejar el error según sea necesario
  }
};
