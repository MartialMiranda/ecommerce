class Pedido {
    constructor(usuarioId, direccionEnvioId, metodoEnvio, costoEnvio, productos) {
      this.usuarioId = usuarioId;
      this.direccionEnvioId = direccionEnvioId;
      this.metodoEnvio = metodoEnvio;
      this.costoEnvio = costoEnvio;
      this.productos = productos || []; // Lista de productos en el pedido
      this.total = this.calcularTotal();
      this.estado = 'pendiente'; // Inicialmente el estado del pedido es 'pendiente'
    }
  
    // Calcular el total del pedido (producto + costo de envío)
    calcularTotal() {
      const totalProductos = this.productos.reduce((total, producto) => {
        return total + (producto.precio * producto.cantidad);
      }, 0);
      return totalProductos + this.costoEnvio;
    }
  
    // Cambiar el estado del pedido
    cambiarEstado(estado) {
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
  }
  
  module.exports = Pedido;
