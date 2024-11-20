export const API_URL = "http://localhost:8000/api/";

export const getProducts = async () => {
    try {
        const response = await fetch(`${API_URL}productos`);
        
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
        }

        const data = await response.json();
        return data.products;
    } catch (error) {
        console.error("Error obteniendo los productos:", error);
        throw error;
    }
};