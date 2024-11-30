// src/controllers/producto.js
const Producto = require('../models/producto');
const ImagenProducto = require('../models/imagen_producto');
const fs = require('fs');

const crearProducto = async (req, res) => {
  try {
    const { titulo, descripcion, precio, stock, categoria_id, usuario_id } = req.body;
    const imagenes = req.files.map((file) => `/uploads/productos-imagenes/${file.filename}`);

    const nuevoProducto = await Producto.create({
      titulo,
      descripcion,
      precio,
      stock,
      categoria_id,
      usuario_id,
      imagenes
    });

    for (const url of imagenes) {
      await ImagenProducto.create(nuevoProducto.id, url);
    }

    res.status(201).json({ message: 'Producto creado con éxito', producto: nuevoProducto });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el producto', error: error.message });
  }
};

const obtenerProductos = async (req, res) => {
  try {
    const productos = await Producto.getAll();
    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener productos', error: error.message });
  }
};

const obtenerProductoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await Producto.getById(id);

    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    res.status(200).json(producto);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el producto', error: error.message });
  }
};

const actualizarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, descripcion, precio, stock, categoria_id, es_activo } = req.body;

    // Verificar que los campos obligatorios no sean nulos
    if (!titulo || !descripcion || !precio || !stock || !categoria_id) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    const productoActualizado = await Producto.update(id, {
      titulo,
      descripcion,
      precio,
      stock,
      categoria_id,
      es_activo
    });

    res.status(200).json({ message: 'Producto actualizado con éxito', producto: productoActualizado });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el producto', error: error.message });
  }
};


const eliminarProducto = async (req, res) => {
  try {
    const { id } = req.params;

    // Verifica que el producto exista antes de intentar eliminarlo
    const producto = await Producto.getById(id);
    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    // Elimina el producto y sus imágenes
    await Producto.delete(id);

    res.status(200).json({ message: 'Producto eliminado con éxito' });
  } catch (error) {
    console.error('Error al eliminar el producto:', error.message);
    res.status(500).json({ message: 'Error al eliminar el producto', error: error.message });
  }
};


module.exports = {
  crearProducto,
  obtenerProductos,
  obtenerProductoPorId,
  actualizarProducto,
  eliminarProducto
};
