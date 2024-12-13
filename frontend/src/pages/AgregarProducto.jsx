import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProducto, getCategorias } from "../redux/slices/productoSlice";
import Layout from "../components/layout";
import { useNavigate } from "react-router-dom";

const AgregarProducto = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categorias, loading, error } = useSelector((state) => state.producto);
  const { token } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    precio: "",
    stock: "",
    categoria_id: "",
  });
  const [imagenes, setImagenes] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!categorias || categorias.length === 0) {
      dispatch(getCategorias());
    }

    // Evento para pegar imágenes
    const handlePaste = (e) => {
      const items = e.clipboardData.items;
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf("image") !== -1) {
          const blob = items[i].getAsFile();
          handleAddImage(blob);
        }
      }
    };

    document.addEventListener('paste', handlePaste);
    return () => {
      document.removeEventListener('paste', handlePaste);
    };
  }, [dispatch, categorias]);

  // Validar y añadir imágenes
  const handleAddImage = (file) => {
    if (file && file.type.startsWith('image/')) {
      if (imagenes.length < 5) {
        const newImages = [...imagenes, file];
        setImagenes(newImages);
        
        const preview = URL.createObjectURL(file);
        setPreviewImages([...previewImages, preview]);
      } else {
        alert('Máximo 5 imágenes permitidas');
      }
    }
  };

  // Manejar cambios en los inputs del formulario
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Manejar selección de imágenes desde el input de archivo
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(handleAddImage);
  };

  // Manejar arrastrar y soltar
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    files.forEach(handleAddImage);
  };

  // Eliminar una imagen de la previsualización
  const handleRemoveImage = (index) => {
    const newImages = [...imagenes];
    const newPreviews = [...previewImages];
    newImages.splice(index, 1);
    newPreviews.splice(index, 1);
    setImagenes(newImages);
    setPreviewImages(newPreviews);
  };

  // Enviar formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));
    imagenes.forEach((imagen) => data.append("imagenes", imagen));

    dispatch(createProducto({ productoData: data, token }));
    navigate("/mis-productos");
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-md mt-6">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">
          Agregar Producto
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Título</label>
            <input
              type="text"
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
              className="w-full p-3 border rounded focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Descripción</label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              className="w-full p-3 border rounded focus:outline-none focus:ring focus:ring-blue-300"
              required
            ></textarea>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Precio</label>
              <input
                type="number"
                name="precio"
                value={formData.precio}
                onChange={handleChange}
                className="w-full p-3 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Stock</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className="w-full p-3 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Categoría</label>
            <select
              name="categoria_id"
              value={formData.categoria_id}
              onChange={handleChange}
              className="w-full p-3 border rounded focus:outline-none focus:ring focus:ring-blue-300"
              required
            >
              <option value="">Seleccione una categoría</option>
              {(categorias || []).map((categoria) => (
                <option key={categoria.id} value={categoria.id}>
                  {categoria.nombre}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Imágenes</label>
            <div 
              className={`w-full p-6 border-2 border-dashed rounded-lg text-center transition-colors duration-300 ${
                dragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <input
                type="file"
                ref={fileInputRef}
                multiple
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
              />
              <p className="text-gray-600 mb-4">
                Arrastra y suelta imágenes aquí o{' '}
                <button 
                  type="button"
                  onClick={() => fileInputRef.current.click()}
                  className="text-blue-500 hover:underline"
                >
                  selecciona archivos
                </button>
              </p>
              <p className="text-sm text-gray-500">
                Puedes pegar imágenes directamente. Máximo 5 imágenes.
              </p>
            </div>
            
            <div className="mt-4 grid grid-cols-3 gap-4">
              {previewImages.map((src, index) => (
                <div key={index} className="relative">
                  <img
                    src={src}
                    alt={`Preview ${index}`}
                    className="w-full h-24 object-cover rounded shadow"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Agregar Producto
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default AgregarProducto;
