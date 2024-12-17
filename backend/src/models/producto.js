// src/models/producto.js
const BaseDao = require("../dao/baseDao");
const ImagenProducto = require("../models/imagen_producto");
const fs = require("fs");
const path = require("path");
const db = require("../db");

class Producto {
  constructor() {
    this.dao = new BaseDao("producto"); // Nombre de la tabla
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
      const filePath = path.join(
        __dirname,
        "../uploads/productos-imagenes",
        path.basename(imagen.url_imagen)
      );
      console.log("Eliminando archivo:", filePath);

      try {
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
          console.log("Archivo eliminado:", filePath);
        } else {
          console.warn("Archivo no encontrado:", filePath);
        }
      } catch (error) {
        console.error("Error al eliminar archivo:", filePath, error.message);
      }
    }

    // Eliminar registros de imágenes en la base de datos
    await ImagenProducto.deleteByProductoId(id);

    // Eliminar el producto
    return await this.dao.eliminar(id);
  }
  // Método para obtener productos del usuario
  async getMisProductos(usuarioId) {
    try {
      const userId = Number(usuarioId);

      if (!userId || isNaN(userId)) {
        throw new Error("ID de usuario inválido");
      }

      const query = `
        SELECT 
          p.*,
          COALESCE(
            (
              SELECT json_agg(
                json_build_object(
                  'id', ip.id, 
                  'url_imagen', ip.url_imagen
                )
              )
              FROM imagen_producto ip
              WHERE ip.producto_id = p.id
            ), 
            '[]'::json
          ) AS imagenes
        FROM producto p
        WHERE p.usuario_id = $1 
        ORDER BY p.fecha_creacion DESC
      `;

      const result = await db.query(query, [userId]);
      return result.rows;
    } catch (error) {
      console.error("Error al obtener mis productos:", error);
      throw error;
    }
  }
  async getByName(nombre) {
    const query = `SELECT * FROM producto WHERE es_activo = TRUE AND nombre ILIKE '%' || $1 || '%' ORDER BY fecha_creacion DESC;`;
    const result = await db.query(query, [nombre]);
    return result.rows;
  }
  async getCategorias() {
    try {
      const query = "SELECT * FROM categoria ORDER BY nombre ASC;";
      const result = await db.query(query);
      return result.rows;
    } catch (error) {
      console.error("Error al obtener categorías:", error);
      throw error;
    }
  }

  async getFiltered(categoriaId) {
    let query =
      "SELECT * FROM producto WHERE es_activo = TRUE ORDER BY fecha_creacion DESC";
    let values = [];

    if (categoriaId) {
      query += " AND categoria_id = $1";
      values.push(categoriaId);
    }

    const result = await db.query(query, values);
    return result.rows;
  }
}

module.exports = new Producto();
