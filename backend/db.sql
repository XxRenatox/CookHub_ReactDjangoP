-- Tabla: usuarios
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo_electronico VARCHAR(150) UNIQUE NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    preferencias TEXT,
    productos TEXT,
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    es_premium BOOLEAN DEFAULT FALSE,
    es_admin BOOLEAN DEFAULT FALSE
);

-- Tabla: recetas
CREATE TABLE recetas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    imagen TEXT,
    instrucciones TEXT NOT NULL,
    youtube_link TEXT,
    ingredientes TEXT NOT NULL,
    calificaciones DECIMAL(3, 2),
    usuario_id INT,
    creador_nombre VARCHAR(100),
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    nivel_dificultad VARCHAR(50),
    nacionalidad VARCHAR(50),
    categoria VARCHAR(50),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- Tabla: productos
CREATE TABLE productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    tipo VARCHAR(50),
    url_imagen TEXT
);

-- Tabla: recetas_favoritas
CREATE TABLE recetas_favoritas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    receta_id INT NOT NULL,
    fecha_agregado DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (receta_id) REFERENCES recetas(id)
);

-- Tabla: recetas_usuarios (relación muchos a muchos entre usuarios y recetas)
CREATE TABLE recetas_usuarios (
    receta_id INT NOT NULL,
    usuario_id INT NOT NULL,
    PRIMARY KEY (receta_id, usuario_id),
    FOREIGN KEY (receta_id) REFERENCES recetas(id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- Tabla: suscripciones
CREATE TABLE suscripciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    correo VARCHAR(150),
    direccion TEXT,
    ciudad VARCHAR(100),
    estado VARCHAR(100),
    codigo_postal VARCHAR(20),
    pais VARCHAR(100),
    metodo_pago VARCHAR(50),
    numero_tarjeta VARCHAR(20),
    fecha_vencimiento DATE,
    cvv VARCHAR(4),
    id_usuario INT NOT NULL,
    fecha_inicio DATETIME DEFAULT CURRENT_TIMESTAMP,
    fecha_expiracion DATETIME,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
);