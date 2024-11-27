import React, { useState, useEffect } from "react";
import Recipes from "../../common/Recipes";
import Swal from "sweetalert2";
import { jwtDecode } from "jwt-decode";

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


function HomeSection({ darkMode, userinfo }) {
useEffect(() => {
  console.log(userinfo);
  if (userinfo && userinfo.preferencia === null ) {
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
              .map((item) => `<option value="${item.en}">${item.es}</option>`)
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
        fetch("/api/api/user/addpreference/" + userinfo.user_id +"/", {
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
            });
            localStorage.removeItem("token");
            window.location.href = "/";
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
}, []);

  return (
    <main
      className={`p-6 min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-200 text-gray-800"
      }`}
    >
      <section>
        <header className="text-center mb-8">
          <h1 className="font-extrabold text-4xl">Recomendado Para Ti</h1>
        </header>
        <div className="mt-12 max-w-7xl mx-auto p-5">
          <Recipes
            darkMode={darkMode}
            categoria={userinfo && userinfo.preferencia ? userinfo.preferencia : ''}
            cantidad={3}
            isRecetasPage
          />
        </div>
      </section>

      <section>
        <header className="text-center mb-8">
          <h1 className="font-extrabold text-4xl">Recetas Mas Populares</h1>
        </header>
        <div className="mt-12 max-w-7xl mx-auto p-5">
          <Recipes darkMode={darkMode} popular cantidad={3} />
        </div>
      </section>
    </main>
  );
}

export default HomeSection;
