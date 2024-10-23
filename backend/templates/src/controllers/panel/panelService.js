export const getProducts = async () => {
    try {
        const response = await fetch("http://localhost:8000/api/productos");
        
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
        }

        const data = await response.json();  // Parsear los datos a JSON
        return data["products"];
    } catch (error) {
        console.error("Error obteniendo los productos:", error);
        return null;  // Puedes retornar un valor por defecto o manejar el error según sea necesario
    }
};