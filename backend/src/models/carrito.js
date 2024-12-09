class Carrito {
  constructor(usuarioId, productos) {
    this.usuarioId = usuarioId;
    this.productos = productos || []; // Lista de productos en el carrito
  }

  // Agregar un producto al carrito
  agregarProducto(producto) {
    this.productos.push(producto);
  }

  // Eliminar un producto del carrito por ID
  eliminarProducto(productoId) {
    this.productos = this.productos.filter(producto => producto.id !== productoId);
  }

  // Calcular el total del carrito
  calcularTotal() {
    return this.productos.reduce((total, producto) => {
      return total + (producto.precio * producto.cantidad);
    }, 0);
  }

  // Verificar si el carrito está vacío
  estaVacio() {
    return this.productos.length === 0;
  }
}

module.exports = Carrito;



/* const BaseDao = require("../dao/baseDao");
const db = require("../db");

class Carrito extends BaseDao {
  constructor() {
    super("carrito"); // Nombre de la tabla
  }

  // Obtener todos los elementos del carrito de un usuario
  async getAll(usuarioId) {
    const query = `
            SELECT c.id, c.producto_id, c.cantidad, p.titulo, p.precio, p.imagenes
            FROM carrito c
            JOIN producto p ON c.producto_id = p.id
            WHERE c.usuario_id = $1;
        `;
    const result = await db.query(query, [usuarioId]);
    return result.rows;
  }

  // Obtener un elemento del carrito por su ID
  async getById(id) {
    const query = `
            SELECT c.id, c.usuario_id, c.producto_id, c.cantidad, p.titulo, p.precio, p.stock
            FROM carrito c
            JOIN producto p ON c.producto_id = p.id
            WHERE c.id = $1;
        `;
    const result = await db.query(query, [id]);
    return result.rows[0];
  }

  // Añadir o actualizar un producto en el carrito
  async addOrUpdate(usuarioId, productoId, cantidad) {
    const stockQuery = `SELECT stock FROM producto WHERE id = $1;`;
    const stockResult = await db.query(stockQuery, [productoId]);

    if (stockResult.rows.length === 0) {
      throw new Error("Producto no encontrado");
    }

    const stockDisponible = stockResult.rows[0].stock;

    // Validar stock disponible
    if (cantidad > stockDisponible) {
      throw new Error("Stock insuficiente para el producto seleccionado");
    }

    const query = `
            INSERT INTO carrito (usuario_id, producto_id, cantidad)
            VALUES ($1, $2, $3)
            ON CONFLICT (usuario_id, producto_id)
            DO UPDATE SET cantidad = EXCLUDED.cantidad
            RETURNING *;
        `;
    const result = await db.query(query, [usuarioId, productoId, cantidad]);
    return result.rows[0];
  }

  // Eliminar un elemento específico del carrito
  async deleteItem(id) {
    const query = `DELETE FROM carrito WHERE id = $1 RETURNING id;`;
    const result = await db.query(query, [id]);
    return result.rows[0];
  }

  // Vaciar el carrito de un usuario
  async clear(usuarioId) {
    const query = `DELETE FROM carrito WHERE usuario_id = $1;`;
    await db.query(query, [usuarioId]);
  }

  // Calcular el total del carrito (precio total)
  async getTotal(usuarioId) {
    const query = `
            SELECT SUM(c.cantidad * p.precio) AS total
            FROM carrito c
            JOIN producto p ON c.producto_id = p.id
            WHERE c.usuario_id = $1;
        `;
    const result = await db.query(query, [usuarioId]);
    return result.rows[0]?.total || 0;
  }
}

module.exports = new Carrito(); */
