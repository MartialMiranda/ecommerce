CREATE DATABASE ecommerce

\C

CREATE TABLE usuario (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    contraseña VARCHAR(255) NOT NULL,
    direccion TEXT,
    telefono VARCHAR(15),
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE categoria (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    categoria_padre_id INT REFERENCES categoria(id),
    CHECK (categoria_padre_id IS NULL OR categoria_padre_id <> id)
);
CREATE TABLE producto (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10, 2) NOT NULL CHECK (precio >= 0), 
    stock INT NOT NULL DEFAULT 0 CHECK (stock >= 0),
    categoria_id INT REFERENCES categoria(id),
    usuario_id INT NOT NULL REFERENCES usuario(id),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    es_activo BOOLEAN DEFAULT TRUE,
    imagenes VARCHAR[]
);

CREATE TABLE imagen_producto (
    id SERIAL PRIMARY KEY,
    producto_id INT REFERENCES producto(id),
    url_imagen VARCHAR(255) NOT NULL
);

CREATE TABLE direccion_envio (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES usuario(id),
    direccion TEXT NOT NULL,
    ciudad VARCHAR(100) NOT NULL,
    estado VARCHAR(100) NOT NULL,
    pais VARCHAR(100) NOT NULL
);
CREATE TABLE pedido (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES usuario(id),
    direccion_envio_id INT REFERENCES direccion_envio(id),
    fecha_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total DECIMAL(10, 2) NOT NULL CHECK (total >= 0), -- Asegura que el total no sea negativo
    estado VARCHAR(50) DEFAULT 'pendiente' CHECK (estado IN ('pendiente', 'procesando', 'enviando', 'completado', 'cancelado')),
    metodo_envio VARCHAR(50),
    costo_envio DECIMAL(10, 2)
);
CREATE TABLE detalle_pedido (
    id SERIAL PRIMARY KEY,
    pedido_id INT REFERENCES pedido(id),
    producto_id INT REFERENCES producto(id),
    cantidad INT NOT NULL CHECK (cantidad > 0), -- Asegura que la cantidad sea positiva
    precio_unitario DECIMAL(10, 2) NOT NULL CHECK (precio_unitario >= 0) -- Asegura que el precio no sea negativo
);

CREATE TABLE pago (
    id SERIAL PRIMARY KEY,
    pedido_id INT REFERENCES pedido(id),
    fecha_pago TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    monto DECIMAL(10, 2) NOT NULL CHECK (monto >= 0), -- Asegura que el monto no sea negativo
    metodo_pago VARCHAR(50),
    estado_pago VARCHAR(50) DEFAULT 'completado' CHECK (estado_pago IN ('pendiente', 'procesando', 'completado', 'fallido'))
);
CREATE TABLE reseña (
    id SERIAL PRIMARY KEY,
    producto_id INT REFERENCES producto(id),
    usuario_id INT REFERENCES usuario(id),
    calificacion INT CHECK (calificacion >= 1 AND calificacion <= 5),
    comentario TEXT,
    fecha_reseña TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (producto_id, usuario_id) 
);
CREATE TABLE carrito (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES usuario(id),
    producto_id INT REFERENCES producto(id),
    cantidad INT NOT NULL CHECK (cantidad > 0), -- Asegura que la cantidad sea positiva
    fecha_agregado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (usuario_id, producto_id) -- Evitar duplicados en el carrito
);
CREATE TABLE historial_navegacion (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES usuario(id),
    producto_id INT REFERENCES producto(id),
    fecha_vista TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE favorito (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES usuario(id),
    producto_id INT REFERENCES producto(id),
    fecha_agregado TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE reporte (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER REFERENCES usuario(id),
    producto_id INTEGER REFERENCES producto(id),
    razon TEXT NOT NULL,
    estado VARCHAR(20) CHECK (estado IN ('pendiente', 'investigando', 'resuelto')),
    fecha_agregado TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


usuario: No depende de ninguna otra tabla.
categoria: Solo hace referencia a sí misma, por lo que puede crearse en cualquier momento.
producto: Depende de las tablas usuario y categoria.
imagen_producto: Depende de la tabla producto.
direccion_envio: Depende de la tabla usuario.
pedido: Depende de las tablas usuario y direccion_envio.
detalle_pedido: Depende de la tabla pedido y producto.
pago: Depende de la tabla pedido.
reseña: Depende de las tablas producto y usuario.
carrito: Depende de las tablas usuario y producto.
historial_navegacion: Depende de las tablas usuario y producto.
favorito: Depende de las tablas usuario y producto.
reporte: Depende de las tablas usuario y producto.