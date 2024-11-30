import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProducto } from "../redux/slices/productoSlice";
import Layout from "../components/layout";
import { useNavigate } from "react-router-dom";

const AgregarProducto = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.auth); // Token del estado global
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    precio: "",
    stock: "",
    categoria_id: "",
  });
  const [imagenes, setImagenes] = useState([]);

  // Manejar cambios en los inputs del formulario
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Manejar cambios en los archivos
  const handleFileChange = (e) => {
    setImagenes(e.target.files);
  };

  // Enviar formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));
    Array.from(imagenes).forEach((imagen) => data.append("imagenes", imagen));

    // Despachar la acción para crear el producto
    dispatch(createProducto({ productoData: data, token }));
    navigate("/mis-productos");
  };

  return (
    <Layout>
      <div className="max-w-xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md mt-4">
        <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">
          Agregar Producto
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Título</label>
            <input
              type="text"
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Descripción</label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Precio</label>
            <input
              type="number"
              name="precio"
              value={formData.precio}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Stock</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Categoría</label>
            <input
              type="number"
              name="categoria_id"
              value={formData.categoria_id}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Imágenes</label>
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="w-full p-2"
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Agregar Producto
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default AgregarProducto;
