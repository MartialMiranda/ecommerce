class Pedido {
  constructor(usuarioId, direccionEnvioId, metodoEnvio, costoEnvio, productos = [], estado = 'pendiente') {
    this.usuarioId = usuarioId;
    this.direccionEnvioId = direccionEnvioId;
    this.metodoEnvio = metodoEnvio;
    this.costoEnvio = costoEnvio;
    this.productos = productos; // Lista de productos en el pedido
    this.estado = estado; // Estado inicial del pedido
    this.total = this.calcularTotal();
  }

  // Calcular el total del pedido (productos + costo de envío)
  calcularTotal() {
    const totalProductos = this.productos.reduce((total, producto) => {
      return total + producto.precio * producto.cantidad;
    }, 0);
    return totalProductos + this.costoEnvio;
  }

  // Cambiar el estado del pedido
  cambiarEstado(estado) {
    const estadosPermitidos = ['pendiente', 'procesando', 'completado', 'cancelado'];
    if (!estadosPermitidos.includes(estado)) {
      throw new Error(`Estado no válido: ${estado}. Estados permitidos: ${estadosPermitidos.join(', ')}`);
    }
    this.estado = estado;
  }

  // Obtener detalles de los productos en el pedido
  obtenerDetalles() {
    return this.productos.map(producto => ({
      productoId: producto.id,
      cantidad: producto.cantidad,
      precioUnitario: producto.precio,
    }));
  }

  // Validar que el pedido tiene todos los datos necesarios
  validarPedido() {
    if (!this.usuarioId || !this.direccionEnvioId || !this.metodoEnvio || this.productos.length === 0) {
      throw new Error('Faltan datos necesarios para crear el pedido.');
    }
    if (this.total <= 0) {
      throw new Error('El total del pedido debe ser mayor a 0.');
    }
    return true;
  }

  // Actualizar los productos en el pedido
  actualizarProductos(nuevosProductos) {
    this.productos = nuevosProductos;
    this.total = this.calcularTotal();
  }
}

module.exports = Pedido;
