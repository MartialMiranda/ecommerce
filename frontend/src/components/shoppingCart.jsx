import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchCarrito,
  removeProducto,
  addProducto,
} from "../redux/slices/carritoSlice";
import Layout from "../components/layout";
import toastr from "toastr";

const ShoppingCart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productos, status, error } = useSelector((state) => state.carrito);
  const [cantidades, setCantidades] = useState({});
  const [erroresStock, setErroresStock] = useState({});

  useEffect(() => {
    dispatch(fetchCarrito());
  }, [dispatch]);

  useEffect(() => {
    if (productos && productos.length > 0) {
      const cantidadesIniciales = productos.reduce((acc, prod) => {
        acc[prod.id] = prod.cantidad || 1;
        return acc;
      }, {});
      setCantidades(cantidadesIniciales);
    }
  }, [productos]);

  const handleCantidadChange = async (productoId, nuevaCantidad, stock) => {
    if (nuevaCantidad < 1) nuevaCantidad = 1;

    // Verifica el stock disponible
    if (nuevaCantidad > stock) {
      setErroresStock((prev) => ({
        ...prev,
        [productoId]: `Solo hay ${stock} unidades disponibles.`,
      }));
      return; // No despacha si excede el stock
    }

    setErroresStock((prev) => {
      const updated = { ...prev };
      delete updated[productoId];
      return updated;
    });

    // Actualiza localmente primero
    setCantidades((prev) => ({ ...prev, [productoId]: nuevaCantidad }));

    // Luego actualiza el carrito
    try {
      await dispatch(
        addProducto({ productoId, cantidad: nuevaCantidad })
      ).unwrap();
      await dispatch(fetchCarrito()); // Refresca el carrito después de la acción
      toastr.success("Cantidad actualizada correctamente.");
    } catch (error) {
      toastr.error("Error al actualizar la cantidad.");
      console.error(error);
    }
  };

  const handleRemove = async (productoId) => {
    const confirmacion = window.confirm(
      "¿Estás seguro de que deseas eliminar este producto del carrito?"
    );
  
    if (!confirmacion) return; // No hace nada si el usuario cancela
  
    try {
      await dispatch(removeProducto({ productoId })).unwrap();
      await dispatch(fetchCarrito());
      toastr.success("Producto eliminado del carrito.");
    } catch (error) {
      toastr.error("Error al eliminar el producto.");
      console.error(error);
    }
  };

  if (status === "loading")
    return <div className="text-center">Cargando carrito...</div>;

  return (
    <Layout>
      <div className="shopping-cart bg-gray-100 p-6 rounded-lg shadow-md max-w-4xl mx-auto mt-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Tu Carrito
        </h2>
        {productos.length > 0 ? (
          <>
            <ul className="space-y-4">
              {productos.map((producto) => (
                <li key={producto.id} className="border-b pb-4">
                  <div className="flex justify-between items-center">
                    {/* Imagen y descripción */}
                    <div className="flex items-center space-x-4">
                      <img
                        src={`http://localhost:8000${producto.imagenes?.[0] || "/default.png"}`}
                        alt={producto.titulo}
                        className="h-20 w-20 object-cover rounded-md"
                      />
                      <div>
                        <p className="font-medium text-gray-800">
                          {producto.titulo}
                        </p>
                        <p className="text-sm text-gray-600">
                          Precio: ${parseFloat(producto.precio).toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-600">
                          Stock disponible: {producto.stock}
                        </p>
                      </div>
                    </div>

                    {/* Controles de cantidad */}
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() =>
                          handleCantidadChange(
                            producto.id,
                            cantidades[producto.id] - 1,
                            producto.stock
                          )
                        }
                        className="bg-gray-300 px-2 rounded"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="1"
                        value={cantidades[producto.id]}
                        onChange={(e) =>
                          handleCantidadChange(
                            producto.id,
                            parseInt(e.target.value, 10),
                            producto.stock
                          )
                        }
                        className="border border-gray-300 rounded-lg px-2 py-1 w-16 text-center"
                      />
                      <button
                        onClick={() =>
                          handleCantidadChange(
                            producto.id,
                            cantidades[producto.id] + 1,
                            producto.stock
                          )
                        }
                        className="bg-gray-300 px-2 rounded"
                      >
                        +
                      </button>
                      <button
                        onClick={() => handleRemove(producto.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                  {/* Mensaje de error si excede el stock */}
                  {erroresStock[producto.id] && (
                    <p className="text-red-500 text-sm mt-2">
                      {erroresStock[producto.id]}
                    </p>
                  )}
                </li>
              ))}
            </ul>
            <div className="mt-6 text-right">
              <p className="text-xl font-bold text-gray-800">
                Total: $
                {productos
                  .reduce(
                    (acc, prod) =>
                      acc + parseFloat(prod.precio) * cantidades[prod.id],
                    0
                  )
                  .toFixed(2)}
              </p>
              <button
                onClick={() => navigate("/pedido")}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg mt-4 transition"
              >
                Proceder al Pedido
              </button>
            </div>
          </>
        ) : (
          <div className="text-center text-gray-600">
            El carrito está vacío.
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ShoppingCart;
