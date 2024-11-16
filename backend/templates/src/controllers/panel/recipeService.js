export const fetchRecetasFromSupabase = async ({ categoria, popular, cantidad }) => {
  try {
    // Construir la URL de la petición
    let url = `http://localhost:8000/api/recetas?`;

    if (popular) {
      url += `calificacion=true`; // Si es la página de inicio, filtrar por popularidad
    } else {
      url += `categoria=${categoria}`;
    }

    // Agregar el parámetro de cantidad si está definido
    if (cantidad) {
      url += `&cantidad=${cantidad}`;
    }

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
