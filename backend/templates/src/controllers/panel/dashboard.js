import Swal from "sweetalert2";

export const API_URL = "http://localhost:8000/api/";

const categorias = [
  { es: "Cordero", en: "Lamb" }, // Lamb
  { es: "Misceláneo", en: "Miscellaneous" }, // Miscellaneous
  { es: "Pasta", en: "Pasta" }, // Pasta
  { es: "Cerdo", en: "Pork" }, // Pork
  { es: "Acompañamiento", en: "Side" }, // Side
  { es: "Mariscos", en: "Seafood" }, // Seafood
  { es: "Entrante", en: "Starter" }, // Starter
  { es: "Vegano", en: "Vegan" }, // Vegan
  { es: "Vegetariano", en: "Vegetarian" }, // Vegetarian
  { es: "Res", en: "Beef" }, // Beef
  { es: "Desayuno", en: "Breakfast" }, // Breakfast
  { es: "Pollo", en: "Chicken" }, // Chicken
  { es: "Postre", en: "Dessert" }, // Dessert
  { es: "Cabra", en: "Goat" }, // Goat
];

export const getCategories = (userinfo) => {
  if (userinfo && userinfo.preferencia === null) {
    Swal.fire({
      title: "Ingresa tu preferencia",
      html: `
            <div>
              <label className="block font-semibold mb-1">Categoría</label>
              <select
                id="categoria"
                className="w-full p-2 border border-gray-300 rounded"
                required
              >
                <option value="" selected>
                  Seleccione una categoría
                </option>
                ${categorias
                  .map(
                    (item) => `<option value="${item.en}">${item.es}</option>`
                  )
                  .join("")}
              </select>
            </div>
          `,
      showCancelButton: true,
      confirmButtonText: "Guardar",
      cancelButtonText: "Cancelar",
      preConfirm: () => {
        const categoria = document.getElementById("categoria").value;
        return categoria;
      },
    }).then((result) => {
      if (result.value) {
        fetch(`${API_URL}user/addpreference/${userinfo.user_id}/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ preferencia: result.value }),
        })
          .then((response) => response.json())
          .then((data) => {
            Swal.fire({
              title: "Preferencia guardada correctamente",
              text: "Inicie sesión nuevamente para ver los cambios",
              icon: "success",
            }).then((result) => {
              if (result.isConfirmed) {
                localStorage.removeItem("token");
                window.location.href = "/";
              }
            });
          })
          .catch((error) => {
            Swal.fire({
              title: "Error al guardar preferencia",
              text: "Inténtelo nuevamente",
              icon: "error",
            });
          });
      }
    });
  }
};

export const getVideos = (userinfo) => {
  const url = `${API_URL}recetas/getvideos/${userinfo.preferencia}`;
  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al obtener los videos");
      }
      return response.json();
    })
    .then((data) => {
      const videos = data.videos.filter((video) => video.youtube_link);
      return videos;
    })
    .catch((error) => {
      Swal.fire({
        title: "Error al buscar videos",
        text: "Inténtelo nuevamente",
        icon: "error",
      });
      throw error; // Importante: Propaga el error para que el componente pueda manejarlo.
    });
};

export const getRecetasFav = async (userinfo) => {
  const url = `${API_URL}recetas/getfavs/${userinfo.user_id}/`; // La URL completa con el ID del usuario

  try {
    // Hacer la solicitud GET
    const response = await fetch(url);

    // Verificar si la respuesta es exitosa
    if (!response.ok) {
      throw new Error(
        `Error al obtener las recetas favoritas: ${response.status}`
      );
    }

    // Convertir la respuesta en formato JSON
    const data = await response.json();

    // Retornar las recetas favoritas
    return data.favorites || []; // Asegurarse de que el campo 'recipes' esté presente en la respuesta
  } catch (error) {
    console.error("Error al obtener las recetas favoritas:", error);
    return []; // Retorna un array vacío en caso de error
  }
};

export const getMisRecetas = async (userinfo) => {
  const url = `${API_URL}recetas/myrecipes/${userinfo.user_id}/`; // La URL completa con el ID del usuario

  try {
    // Hacer la solicitud GET
    const response = await fetch(url);

    // Verificar si la respuesta es exitosa
    if (!response.ok) {
      throw new Error(
        `Error al obtener las recetas favoritas: ${response.status}`
      );
    }

    // Convertir la respuesta en formato JSON
    const data = await response.json();

    // Retornar las recetas favoritas
    return data.recipes || []; // Asegurarse de que el campo 'recipes' esté presente en la respuesta
  } catch (error) {
    console.error("Error al obtener las recetas favoritas:", error);
    return []; // Retorna un array vacío en caso de error
  }
};

export const removeFromFavorites = (id_receta, userinfo) => {
  // Hacer una solicitud a la API para eliminar la receta de los favoritos
  fetch(
    `http://localhost:8000/api/recetas/remove_fav/${id_receta}/${userinfo.user_id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => {
      if (response.ok) {
        // Si la respuesta es exitosa (status 200-299), mostrar un mensaje de éxito
        Swal.fire({
          title: "¡Éxito!",
          text: "Receta eliminada de favoritos.",
          icon: "success",
          confirmButtonText: "Ok",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload(); // Recarga la página
          }
        });
      } else {
        // Si la respuesta no es exitosa, mostrar un mensaje de error
        Swal.fire({
          title: "Error",
          text: "No se pudo eliminar la receta de favoritos.",
          icon: "error",
          confirmButtonText: "Intentar nuevamente",
        });
      }
    })
    .catch((error) => {
      console.error("Error al eliminar de favoritos:", error);
      Swal.fire({
        title: "Error",
        text: "Hubo un problema al intentar eliminar la receta de favoritos.",
        icon: "error",
        confirmButtonText: "Cerrar",
      });
    });
};

