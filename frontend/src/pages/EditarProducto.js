// src/pages/EditarProducto.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getProductoById, updateProductoById } from "../redux/slices/productoSlice";

const EditarProducto = () => {
  const { id } = useParams(); // Obtenemos el id de la URL
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [producto, setProducto] = useState({
    titulo: "",
    descripcion: "",
    precio: "",
    stock: "",
    categoria_id: "",
  });

  const { producto: productoActual, loadingProducto, error } = useSelector((state) => state.producto);

  useEffect(() => {
    if (id) {
      dispatch(getProductoById(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (productoActual) {
      setProducto({
        titulo: productoActual.titulo || "",
        descripcion: productoActual.descripcion || "",
        precio: productoActual.precio || "",
        stock: productoActual.stock || "",
        categoria_id: productoActual.categoria_id || "",
      });
    }
  }, [productoActual]);

  const handleChange = (e) => {
    setProducto({ ...producto, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProductoById({ id, productoData: producto }));
    navigate("/mis-productos");
  };

  if (loadingProducto) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
        Editar Producto
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="titulo" className="block text-sm font-medium text-gray-600 mb-1">
            Titulo
          </label>
          <input
            id="titulo"
            type="text"
            name="titulo"
            value={producto.titulo}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="descripcion" className="block text-sm font-medium text-gray-600 mb-1">
            Descripción
          </label>
          <input
            id="descripcion"
            type="text"
            name="descripcion"
            value={producto.descripcion}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="precio" className="block text-sm font-medium text-gray-600 mb-1">
            Precio
          </label>
          <input
            id="precio"
            type="text"
            name="precio"
            value={producto.precio}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="stock" className="block text-sm font-medium text-gray-600 mb-1">
            Stock
          </label>
          <input
            id="stock"
            type="number"
            name="stock"
            value={producto.stock}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="categoria_id" className="block text-sm font-medium text-gray-600 mb-1">
            Categoría
          </label>
          <input
            id="categoria_id"
            type="text"
            name="categoria_id"
            value={producto.categoria_id}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg mt-4 hover:bg-blue-600"
        >
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};

export default EditarProducto;
