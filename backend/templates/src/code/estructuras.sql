CREATE TABLE categorias (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE areas (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE niveles_dificultad (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE productos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    tipo VARCHAR(100),
    url_imagen VARCHAR(255)
);

CREATE TABLE recetas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    titulo TEXT NOT NULL,
    imagen TEXT,
    instrucciones TEXT,
    categoria_id INTEGER NOT NULL REFERENCES categorias(id),
    area_id INTEGER NOT NULL REFERENCES areas(id),
    youtube_link TEXT,
    ingredientes JSONB,
    calificacion FLOAT,
    nivel_dificultad_id INTEGER NOT NULL REFERENCES niveles_dificultad(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE usuarios (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nombre TEXT NOT NULL,
    correo_electronico TEXT UNIQUE NOT NULL,
    contrasena TEXT NOT NULL,
    preferencia TEXT,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE recetas_usuarios (
    receta_id UUID NOT NULL REFERENCES recetas(id),
    usuario_id UUID NOT NULL REFERENCES usuarios(id),
    PRIMARY KEY (receta_id, usuario_id)
);

CREATE TABLE recetas_productos (
    receta_id UUID NOT NULL REFERENCES recetas(id),
    producto_id INTEGER NOT NULL REFERENCES productos(id),
    PRIMARY KEY (receta_id, producto_id)
);

CREATE TABLE usuario_productos (
    usuario_id UUID NOT NULL REFERENCES usuarios(id),
    producto_id INTEGER NOT NULL REFERENCES productos(id),
    PRIMARY KEY (usuario_id, producto_id)
);
