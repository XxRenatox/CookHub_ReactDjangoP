CREATE TABLE recetas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),  -- ID único para cada receta
    titulo TEXT NOT NULL,                           -- Título de la receta
    imagen TEXT,                                    -- URL de la imagen de la receta
    instrucciones TEXT,                             -- Instrucciones de preparación
    categoria TEXT,                                 -- Categoría de la receta
    area TEXT,                                      -- Área o región de origen
    youtube_link TEXT,                              -- Enlace al video de YouTube
    ingredientes JSONB,                             -- Ingredientes en formato JSON
    calificacion FLOAT,
    nivel_dificultad TEXT                           -- Nivel de dificultad
);

CREATE TABLE productos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    tipo varchar(100),   
    url_imagen VARCHAR(255)
);

CREATE TABLE usuarios (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nombre TEXT NOT NULL,
    correo_electronico TEXT UNIQUE NOT NULL,
    contrasena TEXT NOT NULL,
    -- Otros campos según sea necesario
);