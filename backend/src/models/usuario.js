// src/models/usuario.js
const BaseDao = require('../dao/baseDao');

class Usuario {
  constructor() {
    this.dao = new BaseDao('usuario');  // Nombre de la tabla
  }

  async obtenerUsuarios() {
    return await this.dao.obtenerTodos();
  }

  async obtenerUsuarioPorId(id) {
    return await this.dao.obtenerPorId(id);
  }

  async actualizarUsuario(id, data) {
    return await this.dao.actualizar(id, data);
  }

  async eliminarUsuario(id) {
    return await this.dao.eliminar(id);
  }
}

module.exports = new Usuario();
