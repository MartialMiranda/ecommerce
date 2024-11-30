const Categoria = require('../models/categoria');

const crearCategoria = async (req, res) => {
    try {
      const { nombre, descripcion, categoria_padre_id } = req.body;
  
      if (!nombre) {
        return res.status(400).json({ success: false, message: 'El nombre es obligatorio' });
      }
  
      const categoria = await Categoria.crear(nombre, descripcion, categoria_padre_id );
  
      if (!categoria) {
        return res.status(500).json({ success: false, message: 'Error al crear la categoría' });
      }
  
      res.status(201).json({ success: true, data: categoria });
    } catch (error) {
      console.error('Error al crear la categoría:', error.message);
      res.status(500).json({ success: false, message: 'Error interno del servidor' });
    }
  };
  

const obtenerCategorias = async (req, res) => {
  try {
    const categorias = await Categoria.obtenerTodas();
    res.status(200).json({ success: true, data: categorias });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error al obtener las categorías' });
  }
};

const actualizarCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, categoria_padre_id } = req.body;
    const categoria = await Categoria.actualizar(id, nombre, descripcion, categoria_padre_id || null);
    res.status(200).json({ success: true, data: categoria });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error al actualizar la categoría' });
  }
};

const eliminarCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const categoria = await Categoria.eliminar(id);
    res.status(200).json({ success: true, data: categoria });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error al eliminar la categoría' });
  }
};

module.exports = {
  crearCategoria,
  obtenerCategorias,
  actualizarCategoria,
  eliminarCategoria,
};
