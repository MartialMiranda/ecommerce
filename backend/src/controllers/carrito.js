const Carrito = require('../models/carrito');

const CarritoController = {
    getCarrito : async (req, res) => {
        try {
          const usuarioId = req.user.id;  // Asegúrate de que el ID de usuario esté disponible
          const carritoItems = await Carrito.getAll(usuarioId);  // Obtén los elementos del carrito
          res.json(carritoItems);
        } catch (error) {
          console.error('Error al obtener los elementos del carrito:', error.message);
          res.status(500).json({ error: 'Error al obtener los elementos del carrito', detalle: error.message });
        }
      },

    add: async (req, res) => {
        const { producto_id, cantidad } = req.body;
        const usuario_id = req.user.id;

        try {
            const nuevoItem = await Carrito.add({
                usuario_id,
                producto_id,
                cantidad,
            });

            return res.status(201).json(nuevoItem);
        } catch (error) {
            console.error('Error al agregar al carrito:', error);
            return res.status(500).json({ 
                error: 'Error al agregar el producto al carrito',
                detalle: error.message 
            });
        }
    },

    update: async (req, res) => {
        const { id } = req.params;
        const { cantidad } = req.body;

        try {
            const itemExistente = await Carrito.getById(id);

            if (!itemExistente || itemExistente.usuario_id !== req.user.id) {
                return res.status(403).json({ error: 'No autorizado para modificar este elemento' });
            }

            const itemActualizado = await Carrito.update(id, { cantidad });
            res.json(itemActualizado);
        } catch (error) {
            console.error('Error al actualizar el carrito:', error);
            res.status(500).json({ 
                error: 'Error al actualizar el carrito',
                detalle: error.message 
            });
        }
    },

    delete: async (req, res) => {
        const { id } = req.params;

        try {
            const itemExistente = await Carrito.getById(id);

            if (!itemExistente || itemExistente.usuario_id !== req.user.id) {
                return res.status(403).json({ error: 'No autorizado para eliminar este elemento' });
            }

            const resultado = await Carrito.delete(id);
            res.json(resultado);
        } catch (error) {
            console.error('Error al eliminar del carrito:', error);
            res.status(500).json({ 
                error: 'Error al eliminar el producto del carrito',
                detalle: error.message 
            });
        }
    },
};

module.exports = CarritoController;
