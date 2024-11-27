import React, { useState, useEffect } from "react";

function PanelAdmin({ darkMode, userinfo }) {
  const [data, setData] = useState({ users: [], subscriptions: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/admin/getdata");
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Combinamos los usuarios y las suscripciones
const combinedData = data.users.map((user) => {
  const subscription = data.subscriptions.find((x) => x.id_usuario === user.id);
  return {
    ...user,
    // Asigna las fechas si la suscripción existe, de lo contrario asigna "N/A"
    fecha_inicio_premium: subscription ? subscription.fecha_inicio : "No es Premium",
    fecha_fin_premium: subscription ? subscription.fecha_expiracion : "No es Premium",
  };
});

  return (
    <main
      className={`p-6 min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"
      }`}
    >
      <header className="text-center mb-8">
        <h1 className="font-extrabold text-4xl">Panel de Administrador</h1>
      </header>
      <section className="flex flex-col flex-grow justify-center items-center">
        <table className="w-full text-center">
          <thead>
            <tr>
              <th className="px-4 py-2">Nombre</th>
              <th className="px-4 py-2">Correo</th>
              <th className="px-4 py-2">Premium</th>
              <th className="px-4 py-2">Fecha de inicio premium</th>
              <th className="px-4 py-2">Fecha de fin premium</th>
            </tr>
          </thead>
          <tbody>
            {combinedData.map((user) => (
              <tr key={user.id}>
                <td className="px-4 py-2">{user.nombre}</td>
                <td className="px-4 py-2">{user.correo_electronico}</td>
                <td className="px-4 py-2">{user.es_premium ? "Sí" : "No"}</td>
                <td className="px-4 py-2">{user.fecha_inicio_premium}</td>
                <td className="px-4 py-2">{user.fecha_fin_premium}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}

export default PanelAdmin;
