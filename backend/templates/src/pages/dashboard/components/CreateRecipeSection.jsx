import React, { useState } from 'react';

function CreateRecipeSection({ darkMode }) {
    const [formData, setFormData] = useState({
        titulo: '',
        imagen: null,
        instrucciones: '',
        ingredientes: '',
        categoria: '',
        area: '',
        dificultad: '',
        usuario: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            imagen: e.target.files[0]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Crear una instancia de FormData y agregar todos los campos
        const data = new FormData();
        data.append('titulo', formData.titulo);
        data.append('imagen', formData.imagen);
        data.append('instrucciones', formData.instrucciones);
        data.append('ingredientes', formData.ingredientes);
        data.append('categoria', formData.categoria);
        data.append('area', formData.area);
        data.append('dificultad', formData.dificultad);
        data.append('usuario', formData.usuario);

        // Realizar la solicitud de envío
        try {
            const response = await fetch("http://localhost:8000/api/recetas/create/", {
                method: "POST",
                body: data
            });

            if (response.ok) {
                console.log("Receta creada con éxito");
            } else {
                console.error("Error al crear la receta");
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
        }
    };

    return ( 
        <main className={`p-6 min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-200 text-gray-800"}`}>
            <section>
                <header className="text-center mb-8">
                    <h1 className="font-extrabold text-4xl">Crea tu propia receta</h1>
                </header>
                <div className="mt-12 max-w-7xl mx-auto p-5">
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
                                className="w-full p-2 border border-gray-300 rounded"
                                required
                            />
                        </div>
                        
                        <div>
                            <label className="block font-semibold mb-1">Instrucciones</label>
                            <textarea 
                                name="instrucciones" 
                                value={formData.instrucciones}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded"
                                required
                            ></textarea>
                        </div>

                        <div>
                            <label className="block font-semibold mb-1">Ingredientes</label>
                            <textarea 
                                name="ingredientes" 
                                value={formData.ingredientes}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded"
                                required
                            ></textarea>
                        </div>

                        <div>
                            <label className="block font-semibold mb-1">Categoría</label>
                            <input 
                                type="text" 
                                name="categoria" 
                                value={formData.categoria}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded"
                                required
                            />
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
                            <input 
                                type="text" 
                                name="dificultad" 
                                value={formData.dificultad}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded"
                                required
                            />
                        </div>

                        <div>
                            <label className="block font-semibold mb-1">Usuario</label>
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
                            className="w-full bg-blue-600 text-white p-3 rounded font-semibold hover:bg-blue-700 transition"
                        >
                            Crear Receta
                        </button>
                    </form>
                </div>
            </section>
        </main>
    );
}

export default CreateRecipeSection;
