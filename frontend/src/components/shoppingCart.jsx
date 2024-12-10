import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCarrito,
  removeProducto,
  addProducto,
} from "../redux/slices/carritoSlice";

const ShoppingCart = () => {
  const dispatch = useDispatch();
  const { productos, status, error } = useSelector((state) => state.carrito);
  const [cantidades, setCantidades] = useState({}); // Estado para las cantidades por producto

  useEffect(() => {
    dispatch(fetchCarrito());
  }, [dispatch]);

  useEffect(() => {
    if (productos && productos.length > 0) {
      const cantidadesIniciales = productos.reduce((acc, prod) => {
        acc[prod.id] = prod.cantidad;
        return acc;
      }, {});
      setCantidades(cantidadesIniciales);
    }
  }, [productos]);

  const handleCantidadChange = (e, productoId) => {
    const nuevaCantidad = Math.max(1, parseInt(e.target.value, 10) || 1);
    setCantidades((prev) => ({ ...prev, [productoId]: nuevaCantidad }));
  };
  const handleActualizarCarrito = async (productoId) => {
    try {
      await dispatch(
        addProducto({ productoId, cantidad: cantidades[productoId] })
      ).unwrap();
  
      // Refrescar el carrito después de agregar o actualizar
      await dispatch(fetchCarrito());
      
    } catch (error) {
      console.error("Error al actualizar el carrito", error);
      alert("Ocurrió un error al actualizar el carrito");
    }
  };
  
  const handleRemove = async (productoId) => {
    try {
      await dispatch(removeProducto({ productoId })).unwrap();
  
      // Refrescar el carrito después de eliminar
      await dispatch(fetchCarrito());
      alert("Producto eliminado del carrito");
    } catch (error) {
      console.error("Error al eliminar el producto del carrito", error);
      alert("Ocurrió un error al eliminar el producto");
    }
  };

  if (status === "loading")
    return <div className="text-center">Cargando carrito...</div>;
  if (error)
    return <div className="text-center text-red-500">Error: {error}</div>;
  if (!productos || productos.length === 0)
    return <div className="text-center">El carrito está vacío.</div>;

  const total = productos.reduce(
    (acc, prod) => acc + parseFloat(prod.precio) * prod.cantidad,
    0
  );

  return (
    <div className="shopping-cart bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Tu Carrito</h2>
      <ul className="space-y-4">
        {productos.map((producto) => (
          <li
            key={producto.id}
            className="flex justify-between items-center border-b pb-4"
          >
            <div className="flex items-center space-x-4">
              <img
                src={`http://localhost:8000${
                  producto.imagenes?.[0] || "/default.png"
                }`}
                alt={producto.titulo}
                className="h-20 w-20 object-cover rounded-md"
              />
              <div>
                <p className="font-medium text-gray-800">{producto.titulo}</p>
                <p className="font-medium text-gray-600">
                  Cantidad: {producto.cantidad}
                </p>
                <p className="text-sm text-gray-600">
                  Precio: ${parseFloat(producto.precio).toFixed(2)}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                min="1"
                value={cantidades[producto.id]}
                onChange={(e) => handleCantidadChange(e, producto.id)}
                className="border border-gray-300 rounded-lg px-2 py-1 w-16"
              />
              <button
                onClick={() => handleActualizarCarrito(producto.id)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
              >
                Actualizar
              </button>
              <button
                onClick={() => handleRemove(producto.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-6 text-right">
        <p className="text-xl font-bold text-gray-800">
          Total: ${total.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default ShoppingCart;
