//implemeta las fucniones de adicionar um favorito, obtener favoritos por usuario, eliminar favorito, obtener favorito por id y obtener favorito por producto y usuario
const Favorito = require('../models/favorito');

const FavoritoController = {
  getAll: async (req, res) => {
    try {
      const usuarioId = req.user.id;
      const favoritos = await Favorito.getAll(usuarioId);
      res.json(favoritos);
    } catch (error) {
      console.error('Error al obtener favoritos:', error);
      res.status(500).json({ error: 'Error al obtener favoritos' });
    }
  },

  add: async (req, res) => {
    const { productoId } = req.body;
    const usuarioId = req.user.id;

    try {
      // Verificar si el producto ya está en favoritos
      const existe = await Favorito.exists(usuarioId, productoId);
      if (existe) {
        return res.status(400).json({ error: 'El producto ya está en favoritos' });
      }

      const nuevoFavorito = await Favorito.add(usuarioId, productoId);
      res.status(201).json(nuevoFavorito);
    } catch (error) {
      console.error('Error al agregar favorito:', error);
      res.status(500).json({ error: 'Error al agregar favorito' });
    }
  },

  remove: async (req, res) => {
    const { productoId } = req.params;
    const usuarioId = req.user.id;

    try {
      const favoritoEliminado = await Favorito.remove(usuarioId, productoId);

      if (!favoritoEliminado) {
        return res.status(404).json({ error: 'El producto no está en favoritos' });
      }

      res.json({ message: 'Producto eliminado de favoritos' });
    } catch (error) {
      console.error('Error al eliminar favorito:', error);
      res.status(500).json({ error: 'Error al eliminar favorito' });
    }
  },
};

module.exports = FavoritoController;
