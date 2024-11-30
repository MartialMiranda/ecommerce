// src/models/producto.js
const BaseDao = require('../dao/baseDao');
const ImagenProducto = require('../models/imagen_producto');
const fs = require('fs');
const path = require('path');

class Producto {
  constructor() {
    this.dao = new BaseDao('producto');  // Nombre de la tabla
  }

  async create(producto) {
    const newProducto = await this.dao.crear(producto);
    return newProducto;
  }

  async getAll() {
    return await this.dao.obtenerTodos();
  }

  async getById(id) {
    return await this.dao.obtenerPorId(id);
  }

  async update(id, producto) {
    return await this.dao.actualizar(id, producto);
  }

  async delete(id) {
    // Obtener imágenes asociadas
    const imagenes = await ImagenProducto.findByProductoId(id);
  
    // Eliminar archivos de imágenes
    for (const imagen of imagenes) {
      const filePath = path.join(__dirname, '../uploads/productos-imagenes', path.basename(imagen.url_imagen));
      console.log('Eliminando archivo:', filePath);
  
      try {
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
          console.log('Archivo eliminado:', filePath);
        } else {
          console.warn('Archivo no encontrado:', filePath);
        }
      } catch (error) {
        console.error('Error al eliminar archivo:', filePath, error.message);
      }
    }
  
    // Eliminar registros de imágenes en la base de datos
    await ImagenProducto.deleteByProductoId(id);
  
    // Eliminar el producto
    return await this.dao.eliminar(id);
  }
}

module.exports = new Producto();
