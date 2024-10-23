import React, { useEffect, useState } from "react";
import { supabase } from "../../../../code/supabase"; // Asegúrate de que la ruta sea correcta

function VideosSection({ darkMode }) {
  const [videos, setVideos] = useState([])

  // Obtener datos de Supabase
  useEffect(() => {
    const fetchVideos = async () => {
      const { data, error } = await supabase
        .from("recetas") // Reemplaza con el nombre de tu tabla
        .select("youtube_link, titulo")
        .eq("categoria", "Vegan")

      if (error) {
        console.error("Error fetching videos:", error);
      } else {
        const filteredVideos = data.filter(item => item.youtube_link && item.youtube_link.trim() !== '');
        setVideos(filteredVideos);
      }
    };
    fetchVideos();
  }, []);

  const getVideoId = (url) => {
    const urlParams = new URLSearchParams(new URL(url).search);
    return urlParams.get('v');
  };

  return (
    <main
      className={`p-6 min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"
      }`}
    >
      <header className="text-center mb-8">
        <h1 className="font-extrabold text-4xl">Sección de Tutoriales</h1>
        <p className={`mt-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
          ¡Mira Video Tutoriales de tus recetas!
        </p>
      </header>
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {videos.map((item, index) => {
            const videoId = getVideoId(item.youtube_link);
            const embedUrl = `https://www.youtube.com/embed/${videoId}`;

            return (
              <div
                key={index}
                className={`rounded-2xl border-4 shadow-md mb-4 p-4 ${
                  darkMode
                    ? "bg-gray-800 border-gray-700 text-white"
                    : "bg-white border-slate-300 text-black"
                }`}
              >
                <div className="aspect-w-16 aspect-h-9">
                  <iframe
                    src={embedUrl}
                    title={item.titulo}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-64"
                  ></iframe>
                </div>
                <p className="mt-2">Tutorial sobre: {item.titulo}</p>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}

export default VideosSection;