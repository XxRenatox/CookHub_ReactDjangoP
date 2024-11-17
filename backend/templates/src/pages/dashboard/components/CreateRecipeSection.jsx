import React, { useState } from "react";
import { createRecipe } from "../../../controllers/panel/recipeService";

// Categorias de recetas
const categorias = [
  { es: "Cordero", en: "Lamb" },           // Lamb
  { es: "Misceláneo", en: "Miscellaneous" },        // Miscellaneous
  { es: "Pasta", en: "Pasta" },             // Pasta
  { es: "Cerdo", en: "Pork" },             // Pork
  { es: "Acompañamiento", en: "Side" },    // Side
  { es: "Mariscos", en: "Seafood" },          // Seafood
  { es: "Entrante", en: "Starter" },          // Starter
  { es: "Vegano", en: "Vegan" },            // Vegan
  { es: "Vegetariano", en: "Vegetarian" },       // Vegetarian
  { es: "Res", en: "Beef" },               // Beef
  { es: "Desayuno", en: "Breakfast" },          // Breakfast
  { es: "Pollo", en: "Chicken" },             // Chicken
  { es: "Postre", en: "Dessert" },            // Dessert
  { es: "Cabra", en: "Goat" }              // Goat
];

// Estado inicial del formulario
const initialState = {
  titulo: "",
  imagen: null,
  instrucciones: "",
  ingredientes: null,
  categoria: "",
  area: "",
  dificultad: "",
  usuario: "",
};

const parseIngredients = (ingredientsText) => {
  const ingredients = [];
  
  // Dividir el texto en líneas
  const lines = ingredientsText.split('\n');
  
  lines.forEach(line => {
    // Dividir cada línea por espacio (en caso de que los ingredientes y las medidas estén separados por un espacio)
    const [ingrediente, medida] = line.trim().split(' ');

    if (ingrediente && medida) {
      ingredients.push({ ingrediente, medida });
    }
  });

  console.log(ingredients)
  return ingredients;
};

function CreateRecipeSection({ darkMode }) {
  // Estado del formulario
  const [formData, setFormData] = useState(initialState);
  // Estado de carga
  const [loading, setLoading] = useState(false);
  // Estado de error
  const [error, setError] = useState(null);
  // Estado de éxito
  const [success, setSuccess] = useState(false);

  // Manejador de cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Manejador de cambios en la imagen
  const handleImageChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      imagen: e.target.files[0],
    }));
  };

  // Manejador de envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const data = new FormData();
      
      // Convertir los ingredientes usando la nueva función
      const ingredientesParsed = parseIngredients(formData.ingredientes);
      
      // Enviar los ingredientes como una cadena JSON válida (sin caracteres extra)
      data.append('ingredientes', JSON.stringify(ingredientesParsed));

      // Agregar el resto de los campos al FormData
      Object.keys(formData).forEach((key) => {
        if (key !== 'ingredientes') {
          data.append(key, formData[key]);
        }
      });

      await createRecipe(data);
      setSuccess(true);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className={`p-6 min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-200 text-gray-800"
      }`}
    >
      <section>
        <header className="text-center mb-8">
          <h1 className="font-extrabold text-4xl">Crea tu propia receta</h1>
        </header>
        <div className="mt-12 max-w-7xl mx-auto p-5">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
              ¡Receta creada con éxito!
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block font-semibold mb-1">Título</label>
              <input
                type="text"
                name="titulo"
                value={formData.titulo}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Imagen</label>
              <input
                type="file"
                name="imagen"
                onChange={handleImageChange}
                className="p-2 border border-gray-300 rounded"
                accept="image/*"
                required
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Instrucciones</label>
              <textarea
                name="instrucciones"
                className="w-full p-2 border border-gray-300 rounded"
                value={formData.instrucciones}
                onChange={handleChange}
                rows="4"
                required
              ></textarea>
            </div>

            <div>
              <label className="block font-semibold mb-1">Ingredientes</label>
              <textarea
                name="ingredientes"
                placeholder="Ingresa en el siguiente formato: Ingrediente Medida (separados por un espacio)"
                value={formData.ingredientes}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                rows="4"
                required
              ></textarea>
            </div>

            <div>
              <label className="block font-semibold mb-1">Categoría</label>
              <select
                name="categoria"
                value={formData.categoria}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              >
                <option value="" selected>
                  Seleccione una categoría
                </option>
                {categorias.map((item) => (
                  <option key={item.en} value={item.en}>{item.es}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-1">Área</label>
              <input
                type="text"
                name="area"
                value={formData.area}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Dificultad</label>
              <select
                name="dificultad"
                value={formData.dificultad}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              >
                <option value="">Selecciona la dificultad</option>
                <option value="Fácil">Fácil</option>
                <option value="Intermedio">Medio</option>
                <option value="Difícil">Difícil</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold mb-1">Nombre de Usuario</label>
              <input
                type="text"
                name="usuario"
                value={formData.usuario}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>

            <button
              type="submit"
              className={`w-full ${loading ? "bg-[#019863b0]" : "bg-[#019863]"} text-white p-3 rounded font-semibold hover:bg-[#019833d8] transition`}
              disabled={loading}
            >
              {loading ? "Creando..." : "Crear Receta"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

export default CreateRecipeSection;
