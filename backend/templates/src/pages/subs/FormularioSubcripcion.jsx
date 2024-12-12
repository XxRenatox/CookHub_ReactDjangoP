import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";

const initialFormData = {
  direccion: "",
  ciudad: "",
  estado: "",
  codigoPostal: "",
  pais: "",
  metodoPago: "",
  numeroTarjeta: "",
  fechaVencimiento: "",
  cvv: "",
};

function FormularioSuscripcion() {
  const [darkMode, setDarkMode] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [success, setSuccess] = useState(false);
  const [userData, setUserData] = useState({
    nombre: "",
    correo: "",
    id_usuario: "",
  });

  // Obtener los datos del usuario del token JWT al cargar el componente
  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const decoded = jwtDecode(token);
        setUserData({
          nombre: decoded.nombre,
          correo: decoded.correo_electronico,
          id_usuario: decoded.user_id, // Asegúrate de que el token tiene estos campos
        });
      } else {
        setError({
          token:
            "No se encontró el token de usuario. Inicia sesión nuevamente.",
        });
      }
    } catch (err) {
      setError({
        token: "Token inválido o expirado. Inicia sesión nuevamente.",
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.direccion.trim())
      newErrors.direccion = "La dirección es obligatoria.";
    if (!formData.ciudad.trim()) newErrors.ciudad = "La ciudad es obligatoria.";
    if (!formData.estado.trim()) newErrors.estado = "El estado es obligatorio.";
    if (!formData.codigoPostal.trim())
      newErrors.codigoPostal = "El código postal es obligatorio.";
    if (!formData.pais.trim()) newErrors.pais = "El país es obligatorio.";
    if (!formData.metodoPago)
      newErrors.metodoPago = "Seleccione un método de pago.";

    if (formData.metodoPago === "Tarjeta de Crédito") {
      if (!/^\d{16}$/.test(formData.numeroTarjeta)) {
        newErrors.numeroTarjeta =
          "Ingrese un número de tarjeta válido (16 dígitos).";
      }
      if (!formData.fechaVencimiento.trim()) {
        newErrors.fechaVencimiento = "La fecha de vencimiento es obligatoria.";
      } else {
        const [month, year] = formData.fechaVencimiento.split("/");
        const now = new Date();
        const inputDate = new Date(`20${year}`, month - 1);
        if (isNaN(inputDate) || inputDate < now) {
          newErrors.fechaVencimiento =
            "La fecha de vencimiento no es válida o está vencida.";
        }
      }
      if (!/^\d{3,4}$/.test(formData.cvv)) {
        newErrors.cvv = "El CVV debe tener 3 o 4 dígitos.";
      }
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({});
    setSuccess(false);
    setLoading(true);

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8000/api/subs/subscribe/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...formData, ...userData }),
        }
      );

      if (response.ok) {
        setSuccess(true);
        setFormData(initialFormData); // Resetear formulario tras éxito.
      } else {
        const data = await response.json();
        setError({ api: data.message || "Hubo un error en la suscripción." });
      }
    } catch (err) {
      setError({
        api: "Error al conectar con el servidor. Inténtelo de nuevo más tarde.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} options={[{}]} />
      <main
        className={`pt-24 p-6 min-h-screen transition-colors duration-300 ${
          darkMode ? "bg-gray-900 text-white" : "bg-gray-200 text-gray-800"
        }`}
      >
        <section>
          <header className="text-center mb-8">
            <h1 className="font-extrabold text-4xl">
              Formulario de Suscripción
            </h1>
          </header>
          <div className="mt-12 max-w-4xl mx-auto p-5">
            {Object.keys(error).length > 0 && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
                aria-live="polite"
              >
                <ul>
                  {Object.values(error).map((errMsg, index) => (
                    <li key={index}>{errMsg}</li>
                  ))}
                </ul>
              </div>
            )}
            {success && (
              <div
                className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
                aria-live="polite"
              >
                ¡Suscripción realizada con éxito!
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nombre (deshabilitado, viene del token) */}
              <div>
                <label className="block font-semibold mb-1">Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  value={userData.nombre}
                  disabled
                  className="w-full p-2 border rounded bg-gray-100 text-gray-500 cursor-not-allowed"
                />
              </div>

              {/* Correo (deshabilitado, viene del token) */}
              <div>
                <label className="block font-semibold mb-1">Correo</label>
                <input
                  type="email"
                  name="correo"
                  value={userData.correo}
                  disabled
                  className="w-full p-2 border rounded bg-gray-100 text-gray-500 cursor-not-allowed"
                />
              </div>

              {/* Campo Dirección */}
              <div>
                <label className="block font-semibold mb-1">Dirección</label>
                <input
                  type="text"
                  name="direccion"
                  value={formData.direccion}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded ${
                    error.direccion ? "border-red-500" : "border-gray-300"
                  } ${
                    darkMode
                      ? "bg-gray-700 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                />
              </div>

              {/* Campo Ciudad */}
              <div>
                <label className="block font-semibold mb-1">Ciudad</label>
                <input
                  type="text"
                  name="ciudad"
                  value={formData.ciudad}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded ${
                    error.ciudad ? "border-red-500" : "border-gray-300"
                  } ${
                    darkMode
                      ? "bg-gray-700 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                />
              </div>

              {/* Campo Estado */}
              <div>
                <label className="block font-semibold mb-1">Estado</label>
                <input
                  type="text"
                  name="estado"
                  value={formData.estado}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded ${
                    error.estado ? "border-red-500" : "border-gray-300"
                  } ${
                    darkMode
                      ? "bg-gray-700 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                />
              </div>

              {/* Campo Código Postal */}
              <div>
                <label className="block font-semibold mb-1">
                  Código Postal
                </label>
                <input
                  type="text"
                  name="codigoPostal"
                  value={formData.codigoPostal}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded ${
                    error.codigoPostal ? "border-red-500" : "border-gray-300"
                  } ${
                    darkMode
                      ? "bg-gray-700 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                />
              </div>

              {/* Campo País */}
              <div>
                <label className="block font-semibold mb-1">País</label>
                <input
                  type="text"
                  name="pais"
                  value={formData.pais}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded ${
                    error.pais ? "border-red-500" : "border-gray-300"
                  } ${
                    darkMode
                      ? "bg-gray-700 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                />
              </div>

              {/* Campo Método de Pago */}
              <div>
                <label className="block font-semibold mb-1">
                  Método de Pago
                </label>
                <select
                  name="metodoPago"
                  value={formData.metodoPago}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded ${
                    error.metodoPago ? "border-red-500" : "border-gray-300"
                  } ${
                    darkMode
                      ? "bg-gray-700 text-white"
                      : "bg-white text-gray-800"
                  }`}
                >
                  <option value="" disabled>
                    Selecciona un método de pago
                  </option>
                  <option value="Tarjeta de Crédito">Tarjeta de Crédito</option>
                </select>
              </div>

              {/* Campos específicos de Tarjeta de Crédito */}
              {formData.metodoPago === "Tarjeta de Crédito" && (
                <>
                  <div>
                    <label className="block font-semibold mb-1">
                      Número de Tarjeta
                    </label>
                    <input
                      type="text"
                      name="numeroTarjeta"
                      value={formData.numeroTarjeta}
                      onChange={handleChange}
                      className={`w-full p-2 border rounded ${
                        error.numeroTarjeta
                          ? "border-red-500"
                          : "border-gray-300"
                      } ${
                        darkMode
                          ? "bg-gray-700 text-white"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-1">
                      Fecha de Vencimiento (MM/AA)
                    </label>
                    <input
                      type="text"
                      name="fechaVencimiento"
                      value={formData.fechaVencimiento}
                      onChange={handleChange}
                      className={`w-full p-2 border rounded ${
                        error.fechaVencimiento
                          ? "border-red-500"
                          : "border-gray-300"
                      } ${
                        darkMode
                          ? "bg-gray-700 text-white"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-1">CVV</label>
                    <input
                      type="text"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleChange}
                      className={`w-full p-2 border rounded ${
                        error.cvv ? "border-red-500" : "border-gray-300"
                      } ${
                        darkMode
                          ? "bg-gray-700 text-white"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    />
                  </div>
                </>
              )}

              {/* Botón de Enviar */}
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-2 px-4 font-semibold rounded bg-indigo-600 text-white hover:bg-indigo-700 ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {loading ? "Enviando..." : "Suscribirse"}
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
      <Footer darkMode={darkMode} />
    </>
  );
}

export default FormularioSuscripcion;
