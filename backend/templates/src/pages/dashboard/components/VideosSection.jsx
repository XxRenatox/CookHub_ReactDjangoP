import React, { useState, useEffect } from "react";
import { getVideos } from "../../../controllers/panel/dashboard";

function VideosSection({ darkMode, userinfo }) {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const limit = 6;

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const videoData = await getVideos(userinfo);
        setVideos(videoData);
      } catch (err) {
        console.error("Error fetching videos:", err);
        setError("Hubo un problema cargando los videos");
      } finally {
        setLoading(false);
      }
    };
  
    fetchVideos();
  }, [userinfo]);

  const getVideoId = (url) => {
    const urlParams = new URLSearchParams(new URL(url).search);
    return urlParams.get("v");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Cargando videos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>{error}</p>
      </div>
    );
  }

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
        {videos.length === limit && (
          <div className="text-center">
            <p>Mostrando {limit} videos de un total de {videos.length}</p>
          </div>
        )}
      </section>
    </main>
  );
}

export default VideosSection;
