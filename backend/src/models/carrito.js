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