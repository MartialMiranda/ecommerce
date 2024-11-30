import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getMisProductos,
  deleteProductoById,
} from "../redux/slices/productoSlice";
import Layout from "../components/layout";
import { Link } from "react-router-dom";

const MisProductos = () => {
  const dispatch = useDispatch();
  const { misProductos = [], loading, error } = useSelector((state) => state.producto || {});

  useEffect(() => {
    dispatch(getMisProductos()); // Disparar la acción para obtener productos
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de eliminar este producto?")) {
      dispatch(deleteProductoById(id)); // Eliminar producto
    }
  };

  if (loading) return <div className="text-center mt-8">Cargando productos...</div>;
  if (error) return <div className="text-center mt-8 text-red-600">Error: {error}</div>;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Mis Productos</h1>

        {/* Condicional para mostrar mensaje si no hay productos */}
        {misProductos.length === 0 ? (
          <p className="text-center text-gray-500">No tienes productos registrados</p>
        ) : (
          <ul className="space-y-6">
            {misProductos.map((producto) => (
              <li key={producto.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="flex flex-col md:flex-row items-start md:items-center p-6">
                  <div className="flex-1">
                    {/* Título clicable que redirige a la página de detalles */}
                    <Link to={`/producto/${producto.id}`} className="text-2xl font-semibold text-gray-800 mb-2 hover:text-blue-500 transition duration-300">
                      {producto.titulo}
                    </Link>
                    
                    <p className="text-gray-600 mb-3">{producto.descripcion}</p>
                    <p className="text-lg font-bold text-gray-900 mb-4">Precio: ${producto.precio}</p>

                    {/* Mostrar todas las imágenes clicables que redirigen a la página de detalles */}
                    {producto.imagenes && producto.imagenes.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {producto.imagenes.map((imagen, index) => (
                          <Link key={index} to={`/producto/${producto.id}`}>
                            <img
                              src={`http://localhost:8000${imagen.url_imagen}`}
                              alt={`Imagen ${index + 1} de ${producto.titulo}`}
                              className="w-full h-40 object-cover rounded-lg cursor-pointer hover:scale-105 transition duration-200"
                            />
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Botones de acción */}
                  <div className="flex space-x-4 mt-4 md:mt-0">
                    <Link
                      to={`/editar-producto/${producto.id}`}
                      className="px-4 py-2 bg-blue-500 text-white text-sm font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => handleDelete(producto.id)}
                      className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition duration-300"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Layout>
  );
};

export default MisProductos;
