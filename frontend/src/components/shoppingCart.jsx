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
  const [isUpdating, setIsUpdating] = useState(false);
  const [productosLocales, setProductosLocales] = useState([]);

  useEffect(() => {
    dispatch(fetchCarrito());
  }, [dispatch]);

  useEffect(() => {
    if (productos && productos.length > 0) {
      setProductosLocales(productos);
      const cantidadesIniciales = productos.reduce((acc, prod) => {
        acc[prod.id] = prod.cantidad || 1;
        return acc;
      }, {});
      setCantidades(cantidadesIniciales);
    }
  }, [productos]);

  const handleCantidadChange = async (productoId, nuevaCantidad, stock) => {
    if (isUpdating) return;

    // Validación de cantidad mínima
    if (nuevaCantidad < 1) {
      toastr.error("La cantidad no puede ser menor a 1");
      return;
    }
    
    const cantidadActual = cantidades[productoId] || 1;
    const estaAumentando = nuevaCantidad > cantidadActual;
    
    // Validación de stock para incremento
    if (estaAumentando) {
      if (stock === 0) {
        setErroresStock((prev) => ({
          ...prev,
          [productoId]: "No hay suficiente stock disponible.",
        }));
        return;
      }
    } else {
      // Si estamos decrementando y el stock es 0, primero validamos que tengamos cantidad actual mayor a 1
      if (stock === 0 && cantidadActual <= 1) {
        toastr.error("No se puede reducir más la cantidad");
        return;
      }
    }

    setErroresStock((prev) => {
      const updated = { ...prev };
      delete updated[productoId];
      return updated;
    });

    setIsUpdating(true);

    try {
      // Para el caso especial de stock 0 y decremento, primero actualizamos localmente
      if (stock === 0 && !estaAumentando) {
        console.log('Manejando decremento especial para stock 0');
      }

      // Actualiza la cantidad localmente primero
      setCantidades((prev) => ({ ...prev, [productoId]: nuevaCantidad }));
      
      // Actualiza el estado local de productos
      setProductosLocales(prev => 
        prev.map(prod => 
          prod.id === productoId 
            ? { ...prod, cantidad: nuevaCantidad }
            : prod
        )
      );

      // Realiza la actualización en el backend
      const resultado = await dispatch(
        addProducto({ 
          productoId, 
          cantidad: nuevaCantidad,
          // Añadimos un flag para indicar que es un decremento con stock 0
          esDecremento: stock === 0 && !estaAumentando
        })
      ).unwrap();
      
      // Actualiza el estado global sin recargar la página
      await dispatch(fetchCarrito());
      
      toastr.success("Cantidad actualizada correctamente.");
    } catch (error) {
      console.error('Error al actualizar:', error);

      // Revierte los cambios locales si hay error
      setCantidades((prev) => ({ ...prev, [productoId]: cantidadActual }));
      setProductosLocales(productos);
      
      // Mensaje de error más específico
      if (stock === 0 && !estaAumentando) {
        toastr.error("No se pudo decrementar la cantidad. Por favor, intenta de nuevo más tarde.");
      } else {
        toastr.error(error.response?.data?.message || "Error al actualizar la cantidad. Por favor, intenta de nuevo.");
      }
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRemove = async (productoId) => {
    const confirmacion = window.confirm(
      "¿Estás seguro de que deseas eliminar este producto del carrito?"
    );
  
    if (!confirmacion) return;
  
    try {
      await dispatch(removeProducto({ productoId })).unwrap();
      // Actualiza el estado local inmediatamente
      setProductosLocales(prev => prev.filter(prod => prod.id !== productoId));
      await dispatch(fetchCarrito());
      toastr.success("Producto eliminado del carrito.");
    } catch (error) {
      toastr.error("Error al eliminar el producto.");
      console.error(error);
    }
  };

  const handleProceed = () => {
    // Refresh the cart data before navigating
    dispatch(fetchCarrito())
      .then(() => {
        // Navigate to the order page
        navigate("/pedido");
        // Force a refresh of the page
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error refreshing cart:", error);
        toastr.error("Error al actualizar el carrito. Por favor, intenta de nuevo.");
      });
  };

  if (status === "loading" && productosLocales.length === 0)
    return <div className="text-center">Cargando carrito...</div>;

  // Ordena los productos por ID para mantener un orden consistente
  const productosOrdenados = [...productosLocales].sort((a, b) => a.id - b.id);

  return (
    <Layout>
      <div className="shopping-cart bg-gray-100 p-6 rounded-lg shadow-md max-w-4xl mx-auto mt-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Tu Carrito
        </h2>
        {productosOrdenados.length > 0 ? (
          <>
            <ul className="space-y-4">
              {productosOrdenados.map((producto) => (
                <li key={producto.id} className="border-b pb-4">
                  <div className="flex justify-between items-center">
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

                    <div className="flex items-center space-x-2">
                      <button
                        disabled={isUpdating}
                        onClick={() =>
                          handleCantidadChange(
                            producto.id,
                            cantidades[producto.id] - 1,
                            producto.stock
                          )
                        }
                        className="bg-gray-300 px-2 rounded disabled:opacity-50"
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
                        disabled={isUpdating}
                      />
                      <button
                        disabled={isUpdating || producto.stock === 0}
                        onClick={() =>
                          handleCantidadChange(
                            producto.id,
                            cantidades[producto.id] + 1,
                            producto.stock
                          )
                        }
                        className="bg-gray-300 px-2 rounded disabled:opacity-50"
                      >
                        +
                      </button>
                      <button
                        onClick={() => handleRemove(producto.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition disabled:opacity-50"
                        disabled={isUpdating}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
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
                {productosOrdenados
                  .reduce(
                    (acc, prod) =>
                      acc + parseFloat(prod.precio) * cantidades[prod.id],
                    0
                  )
                  .toFixed(2)}
              </p>
              <button
                onClick={handleProceed}
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