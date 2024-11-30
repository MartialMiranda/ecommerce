import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCarrito,
  removeDelCarrito,
  updateCantidadCarrito,
} from "../redux/slices/carritoSlice";
import { Link } from "react-router-dom";

const ShoppingCart = () => {
  const dispatch = useDispatch();
  const { productos, loading, error } = useSelector((state) => state.carrito);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      dispatch(getCarrito(token));
    } else {
      console.error("No token found, unable to fetch carrito");
    }
  }, [dispatch, token]);

  const handleRemove = (productoId) => {
    dispatch(removeDelCarrito({ productoId, token }));
  };

  const handleUpdateCantidad = (productoId, cantidad) => {
    dispatch(updateCantidadCarrito({ productoId, cantidad, token }));
  };

  if (loading) return <div className="text-center">Cargando carrito...</div>;
  if (error)
    return <div className="text-center text-red-600">Error: {error}</div>;

  console.log("Productos en el carrito:", productos); // Verifica si los productos están disponibles

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">
        Carrito de Compras
      </h1>

      {productos.length === 0 ? (
        <p className="text-center text-xl text-gray-600">
          No hay productos en tu carrito
        </p>
      ) : (
        <div className="space-y-6">
          {productos.map((producto) => (
            <div
              key={producto.id}
              className="bg-white p-4 rounded-lg shadow-lg flex items-center justify-between"
            >
              <div className="flex items-center space-x-4">
                <Link to={`/producto/${producto.id}`} className="flex-shrink-0">
                  <img
                    src={
                      producto.imagenes && producto.imagenes.length > 0
                        ? `http://localhost:8000${producto.imagenes[0]}`
                        : "/path/to/default/image.jpg"
                    }
                    alt={producto.titulo}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                </Link>
                <div>
                  <h2 className="text-lg font-semibold">{producto.titulo}</h2>
                  <p className="text-gray-600">Precio: Bs. {producto.precio}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <button
                      className="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600 transition"
                      onClick={() =>
                        handleUpdateCantidad(producto.id, producto.cantidad + 1)
                      }
                    >
                      +
                    </button>
                    <p className="text-gray-800">
                      Cantidad: {producto.cantidad}
                    </p>
                    <button
                      className="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600 transition"
                      onClick={() =>
                        handleUpdateCantidad(producto.id, producto.cantidad - 1)
                      }
                    >
                      -
                    </button>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleRemove(producto.id)}
                className="text-red-600 font-semibold hover:text-red-800 transition"
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
