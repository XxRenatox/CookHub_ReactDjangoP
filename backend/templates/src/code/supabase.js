import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://uvcmmtlcmgbhowqlqgez.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV2Y21tdGxjbWdiaG93cWxxZ2V6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE4MDQwMjIsImV4cCI6MjA0NzM4MDAyMn0.ehR_UAZyQvIk5H2Xu7K8g59Y007XhnWZHc5toKHy2dc";

export const supabase = createClient(supabaseUrl, supabaseKey);


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

const areas = [
    { español: "Americana", inglés: "American" },
    { español: "Argentina", inglés: "Argentine" },
    { español: "Austriaca", inglés: "Austrian" },
    { español: "Belga", inglés: "Belgian" },
    { español: "Brasileña", inglés: "Brazilian" },
    { español: "Británica", inglés: "British" },
    { español: "Canadiense", inglés: "Canadian" },
    { español: "China", inglés: "Chinese" },
    { español: "Francesa", inglés: "French" },
    { español: "Griega", inglés: "Greek" },
    { español: "India", inglés: "Indian" },
    { español: "Irlandesa", inglés: "Irish" },
    { español: "Italiana", inglés: "Italian" },
    { español: "Japonés", inglés: "Japanese" },
    { español: "Mexicana", inglés: "Mexican" },
    { español: "Marroquí", inglés: "Moroccan" },
    { español: "Polaca", inglés: "Polish" },
    { español: "Portuguesa", inglés: "Portuguese" },
    { español: "Rusa", inglés: "Russian" },
    { español: "Española", inglés: "Spanish" },
    { español: "Sueca", inglés: "Swedish" },
    { español: "Tailandesa", inglés: "Thai" },
    { español: "Turca", inglés: "Turkish" },
    { español: "Coreana", inglés: "Korean" },
    { español: "Vietnamita", inglés: "Vietnamese" },
    { español: "Indonesa", inglés: "Indonesian" },
    { español: "Malaya", inglés: "Malaysian" },
    { español: "Egipcia", inglés: "Egyptian" },
    { español: "Libanesa", inglés: "Lebanese" },
    { español: "Israelí", inglés: "Israeli" },
    { español: "Kuwaití", inglés: "Kuwaiti" },
    { español: "Emiratos Árabes", inglés: "Emirati" },
    { español: "Estadounidense", inglés: "American" },
    { español: "Ecuatoriana", inglés: "Ecuadorian" },
    { español: "Venezolana", inglés: "Venezuelan" },
    { español: "Peruana", inglés: "Peruvian" },
    { español: "Uruguaya", inglés: "Uruguayan" },
    { español: "Colombiana", inglés: "Colombian" },
    { español: "Chilena", inglés: "Chilean" },
    { español: "Panameña", inglés: "Panamanian" },
    { español: "Boliviana", inglés: "Bolivian" },
    { español: "Paraguaya", inglés: "Paraguayan" },
    { español: "Hondureña", inglés: "Honduran" },
    { español: "Salvadoreña", inglés: "Salvadoran" },
    { español: "Nicaragüense", inglés: "Nicaraguan" },
    { español: "Guatemalteca", inglés: "Guatemalan" },
    { español: "Dominicana", inglés: "Dominican" },
    { español: "Caribeña", inglés: "Caribbean" },
    { español: "Surinamesa", inglés: "Surinamese" },
    { español: "Guayanesa", inglés: "Guyanese" },
    { español: "Jamaicana", inglés: "Jamaican" },
    { español: "Barbados", inglés: "Barbadian" },
    { español: "Antigua y Barbuda", inglés: "Antiguan and Barbudan" },
    { español: "Beliceña", inglés: "Belizean" },
    { español: "Saint Luciana", inglés: "Saint Lucian" },
    { español: "Armenia", inglés: "Armenian" },
    { español: "Georgia", inglés: "Georgian" },
    { español: "Turkmenistán", inglés: "Turkmenistan" },
    { español: "Kazajistán", inglés: "Kazakhstan" },
    { español: "Uzbekistán", inglés: "Uzbekistan" },
    { español: "Kirguistán", inglés: "Kyrgyzstan" },
    { español: "Tayikistán", inglés: "Tajikistan" },
    { español: "Sri Lanka", inglés: "Sri Lanka" },
    { español: "Nepalí", inglés: "Nepalese" },
    { español: "Bhután", inglés: "Bhutanese" },
    { español: "Maldivas", inglés: "Maldivian" },
    { español: "Afganistán", inglés: "Afghan" },
    { español: "Pakistán", inglés: "Pakistani" }
];


const dificultad = ["Fácil", "Medio", "Difícil"];

const fetchCategoryRecipes = async (categoria) => {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoria}`);
        const data = await response.json();

        console.log(`Buscando Recetas de la Categoria: ${categoria}`)

        for (const element of data.meals) {
            const detailResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${element.idMeal}`);
            const detailData = await detailResponse.json();

            const rDificultad = dificultad[Math.floor(Math.random() * dificultad.length)];

            for (const recipe of detailData.meals) {
                const ingredientes = [];
                for (let i = 1; i <= 20; i++) {
                    const ingredient = recipe[`strIngredient${i}`];
                    const measure = recipe[`strMeasure${i}`];

                    if (ingredient && ingredient.trim() !== "") {
                        ingredientes.push({ ingrediente: ingredient, medida: measure });
                    }
                }

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
                            usuario_id: "85431928-ad97-41e0-91b5-c60d8feda529",
                            creador_nombre: "Sistema",
                            nivel_dificultad: rDificultad
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
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');

        if (!response.ok) {
            throw new Error('La respuesta de la red no fue correcta');
        }

        const data = await response.json();

        for (const element of data.meals) {
            const imagen = `https://www.themealdb.com/images/ingredients/${element.strIngredient}.png`;

            const { data: insertedData, error } = await supabase
                .from('productos')
                .insert([
                    {
                        nombre: element.strIngredient,
                        tipo: element.strType,
                        url_imagen: imagen
                    }
                ]);

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
}
