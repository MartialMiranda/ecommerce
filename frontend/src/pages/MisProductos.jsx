import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMisProductos, deleteProductoById } from "../redux/slices/productoSlice";
import Layout from "../components/layout";
import { Link } from "react-router-dom";
import { Search, ArrowUpDown } from "lucide-react";

const MisProductos = () => {
  const dispatch = useDispatch();
  const { misProductos = [], loading, error } = useSelector((state) => state.producto || {});
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "ascending" });

  useEffect(() => {
    dispatch(getMisProductos());
  }, [dispatch]);

  useEffect(() => {
    filterProducts();
  }, [misProductos, searchTerm, sortConfig]);

  const filterProducts = () => {
    let filtered = [...misProductos];

    // Filtrar por término de búsqueda
    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.titulo.toLowerCase().includes(lowerSearchTerm) ||
          product.descripcion.toLowerCase().includes(lowerSearchTerm)
      );
    }

    // Ordenar según configuración
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }

    setFilteredProducts(filtered);
  };

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction:
        sortConfig.key === key && sortConfig.direction === "ascending"
          ? "descending"
          : "ascending",
    });
  };

  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de eliminar este producto?")) {
      dispatch(deleteProductoById(id));
    }
  };

  const getStockStyle = (stock) => {
    if (stock === 0) return "text-red-600 font-bold";
    if (stock <= 5) return "text-orange-500 font-bold";
    return "text-green-600";
  };

  if (loading) return <div className="text-center mt-8">Cargando productos...</div>;
  if (error) return <div className="text-center mt-8 text-red-600">Error: {error}</div>;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-600">Mis Productos</h1>

        {/* Barra de búsqueda */}
        <div className="flex items-center mb-4">
          <Search className="h-5 w-5 text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Buscar productos..."
            className="flex-grow border rounded-lg px-4 py-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Tabla de productos */}
        <div className="overflow-x-auto">
          <table className="w-full table-auto rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-4">Imagen</th>
                <th className="p-4 cursor-pointer" onClick={() => handleSort("titulo")}>
                  <div className="flex items-center">
                    Título <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </th>
                <th className="p-4 cursor-pointer" onClick={() => handleSort("precio")}>
                  <div className="flex items-center">
                    Precio <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </th>
                <th className="p-4 cursor-pointer" onClick={() => handleSort("stock")}>
                  <div className="flex items-center">
                    Stock <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center p-4">
                    No se encontraron productos.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((producto) => (
                  <tr key={producto.id} className="hover:bg-gray-100">
                    <td className="p-4">
                      {producto.imagenes && producto.imagenes.length > 0 && (
                        <img
                          src={`http://localhost:8000${producto.imagenes[0].url_imagen}`}
                          alt={producto.titulo}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                      )}
                    </td>
                    <td className="p-4">
                      <Link
                        to={`/producto/${producto.id}`}
                        className="font-medium text-gray-600 hover:underline"
                      >
                        {producto.titulo}
                      </Link>
                      <p className="text-sm text-gray-500">{producto.descripcion}</p>
                    </td>
                    <td className="p-4">${producto.precio}</td>
                    <td className={`p-4 ${getStockStyle(producto.stock)}`}>
                      {producto.stock}
                    </td>
                    <td className="p-4">
                      <div className="flex space-x-2">
                        <Link
                          to={`/editar-producto/${producto.id}`}
                          className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                        >
                          Editar
                        </Link>
                        <button
                          onClick={() => handleDelete(producto.id)}
                          className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default MisProductos;
