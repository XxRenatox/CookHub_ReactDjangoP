
import React, { useEffect, useState } from "react";
import { supabase } from "../../../code/supabase";

function VideosSection({ darkMode, userinfo }) {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const limit = 6;

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("recetas")
          .select("youtube_link, titulo")
          .eq("categoria", userinfo && userinfo.preferencia ? userinfo.preferencia : '')
          .limit(limit);

        if (error) {
          setError(error);
        } else {
          const filteredVideos = data.filter(item => item.youtube_link && item.youtube_link.trim() !== '');
          setVideos(filteredVideos);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, [userinfo]);

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
      {loading ? (
        <div className="text-center">
          <p>Cargando...</p>
        </div>
      ) : error ? (
        <div className="text-center">
          <p>Error: {error.message}</p>
        </div>
      ) : (
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
      )}
    </main>
  );
}

export default VideosSection;
