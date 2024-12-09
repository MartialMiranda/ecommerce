const Carrito = require("../models/carrito");

const CarritoController = {
  // Obtener todos los productos del carrito
  getCarrito: async (req, res) => {
    try {
      const usuarioId = req.user.id;
      const carritoItems = await Carrito.getAll(usuarioId);
      res.json(carritoItems);
    } catch (error) {
      console.error(
        "Error al obtener los elementos del carrito:",
        error.message
      );
      res
        .status(500)
        .json({
          error: "Error al obtener los elementos del carrito",
          detalle: error.message,
        });
    }
  },

  // Agregar un producto al carrito
  add: async (req, res) => {
    const { producto_id, cantidad } = req.body;
    const usuarioId = req.user.id;

    if (!producto_id || !cantidad || cantidad <= 0) {
      return res
        .status(400)
        .json({ error: "Producto ID y cantidad deben ser válidos" });
    }

    try {
      const nuevoItem = await Carrito.addOrUpdate(
        usuarioId,
        producto_id,
        cantidad
      );
      res.status(201).json(nuevoItem);
    } catch (error) {
      console.error("Error al agregar al carrito:", error.message);
      res
        .status(500)
        .json({
          error: "Error al agregar el producto al carrito",
          detalle: error.message,
        });
    }
  },

  // Actualizar la cantidad de un producto en el carrito
  update: async (req, res) => {
    const { id } = req.params; // ID del elemento del carrito
    const { cantidad } = req.body; // Nueva cantidad
    const usuarioId = req.user.id; // Usuario autenticado

    if (!cantidad || cantidad <= 0) {
      return res.status(400).json({ error: "La cantidad debe ser mayor a 0" });
    }

    try {
      const itemExistente = await Carrito.getById(id);

      if (!itemExistente || itemExistente.usuario_id !== usuarioId) {
        return res
          .status(403)
          .json({ error: "No autorizado para modificar este elemento" });
      }

      const itemActualizado = await Carrito.addOrUpdate(
        usuarioId,
        itemExistente.producto_id,
        cantidad
      );

      res.json(itemActualizado);
    } catch (error) {
      console.error("Error al actualizar el carrito:", error.message);
      res
        .status(500)
        .json({
          error: "Error al actualizar el carrito",
          detalle: error.message,
        });
    }
  },

  // Eliminar un producto del carrito
  delete: async (req, res) => {
    const { id } = req.params;
    const usuarioId = req.user.id;

    try {
      const itemExistente = await Carrito.getById(id);

      if (!itemExistente || itemExistente.usuario_id !== usuarioId) {
        return res
          .status(403)
          .json({ error: "No autorizado para eliminar este elemento" });
      }

      const resultado = await Carrito.deleteItem(id);
      res
        .status(200)
        .json({ message: "Producto eliminado con éxito", resultado });
    } catch (error) {
      console.error("Error al eliminar del carrito:", error.message);
      res
        .status(500)
        .json({
          error: "Error al eliminar el producto del carrito",
          detalle: error.message,
        });
    }
  },

  // Vaciar todo el carrito
  clearCarrito: async (req, res) => {
    try {
      const usuarioId = req.user.id;
      await Carrito.clear(usuarioId);
      res.status(200).json({ message: "Carrito vaciado con éxito" });
    } catch (error) {
      console.error("Error al vaciar el carrito:", error.message);
      res
        .status(500)
        .json({ error: "Error al vaciar el carrito", detalle: error.message });
    }
  },

  // Obtener el total del carrito
  getTotal: async (req, res) => {
    try {
      const usuarioId = req.user.id;
      const total = await Carrito.getTotal(usuarioId);
      res.json({ total });
    } catch (error) {
      console.error("Error al obtener el total del carrito:", error.message);
      res
        .status(500)
        .json({
          error: "Error al obtener el total del carrito",
          detalle: error.message,
        });
    }
  },
};

module.exports = CarritoController;
