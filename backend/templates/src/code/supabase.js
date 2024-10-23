import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://owfqkurwrubndhcmsyzb.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im93ZnFrdXJ3cnVibmRoY21zeXpiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjgxOTU0NTMsImV4cCI6MjA0Mzc3MTQ1M30.NbVrg2PMHyaVV9wafWqxGhyjrxPGH9W5dkD8-IWUKzU'
const supabase = createClient(supabaseUrl, supabaseKey)

const categorias = [
    "Lamb",
    "Miscellaneous",
    "Pasta",
    "Pork",
    "Side",
    "Seafood",
    "Starter",
    "Vegan",
    "Vegetarian",
    "Beef",
    "Breakfast",
    "Chicken",
    "Dessert",
    "Goat"
]

const fetchCategoryRecipes = async (categoria) => {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoria}`);
        const data = await response.json();

        console.log(`Buscando Recetas de la Categoria: ${categoria}`)

        for (const element of data.meals) {
            const detailResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${element.idMeal}`);
            const detailData = await detailResponse.json();

            const dificultad = ["Fácil", "Medio", "Difícil"];

            const rDificultad = dificultad[Math.floor(Math.random() * dificultad.length)];

            for (const recipe of detailData.meals) {
                const ingredientes = [];
                // Recolectar ingredientes y medidas
                for (let i = 1; i <= 20; i++) {
                    const ingredient = recipe[`strIngredient${i}`];
                    const measure = recipe[`strMeasure${i}`];

                    if (ingredient && ingredient.trim() !== "") {
                        ingredientes.push({ ingrediente: ingredient, medida: measure });
                    }
                }

                // Inserción en Supabase
                const { data, error } = await supabase
                    .from('recetas')
                    .insert([
                        {
                            titulo: recipe.strMeal,
                            imagen: recipe.strMealThumb,
                            instrucciones: recipe.strInstructions,
                            categoria: recipe.strCategory,
                            area: recipe.strArea,
                            youtube_link: recipe.strYoutube,
                            ingredientes: ingredientes,
                            calificacion: 0, 
                            nivel_dificultad:  rDificultad 
                        }
                    ]);

                if (error) {
                    console.error("Error inserting recipe:", error);
                } else {
                    console.log("Recipe inserted successfully:", recipe.strMeal);
                }
            }
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

const fetchProducts = async () => {
    try {
        // Hacer la solicitud fetch y esperar la respuesta
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
        
        // Asegurarse de que la respuesta sea válida
        if (!response.ok) {
            throw new Error('La respuesta de la red no fue correcta');
        }

        // Convertir la respuesta a JSON
        const data = await response.json();

        // Procesar los datos
        for (const element of data.meals) {
            // Construir la URL de la imagen
            const imagen = `https://www.themealdb.com/images/ingredients/${element.strIngredient}.png`;

            // Insertar los datos en la tabla 'productos' en Supabase
            const { data: insertedData, error } = await supabase
                .from('productos')
                .insert([
                    {
                        nombre: element.strIngredient,
                        tipo: element.strType, 
                        url_imagen: imagen
                    }
                ]);

            // Manejar posibles errores
            if (error) {
                console.error("Error al insertar los datos:", error);
            } else {
                console.log("Datos insertados:", insertedData);
            }
        }

    } catch (error) {
        console.error("Error al obtener los datos:", error);
    }
}
const getData = async (categorias) => {
    for (const categoria of categorias) {
        await fetchCategoryRecipes(categoria);
        console.log(`Finished processing category: ${categoria}`);
    }
};


// T53o7qKIDnBQ8bz7