// src/controllers/usuario.js
const Usuario = require('../models/usuario');

module.exports = {
  obtenerUsuarios: async (req, res) => {
    try {
      const usuarios = await Usuario.obtenerUsuarios();
      res.json({ success: true, data: usuarios });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  obtenerUsuarioPorId: async (req, res) => {
    const { id } = req.params;
    try {
      const usuario = await Usuario.obtenerUsuarioPorId(id);
      if (usuario) {
        res.json({ success: true, data: usuario });
      } else {
        res.status(404).json({ success: false, message: 'Usuario no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  

  actualizarUsuario: async (req, res) => {
    const { id } = req.params;
    const { nombre, email, contraseña, direccion, telefono } = req.body;
    try {
      const actualizado = await Usuario.actualizarUsuario(id, {
        nombre,
        email,
        contraseña,
        direccion,
        telefono,
      });
      if (actualizado) {
        res.json({ success: true, message: 'Usuario actualizado correctamente' });
      } else {
        res.status(404).json({ success: false, message: 'Usuario no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  eliminarUsuario: async (req, res) => {
    const { id } = req.params;
    try {
      const eliminado = await Usuario.eliminarUsuario(id);
      if (eliminado) {
        res.json({ success: true, message: 'Usuario eliminado correctamente' });
      } else {
        res.status(404).json({ success: false, message: 'Usuario no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
};
