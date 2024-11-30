import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductos } from "../api/productos";
import { FaHeart, FaFlag, FaStar, FaStarHalfAlt } from 'react-icons/fa';
import Layout from '../components/layout';

const ProductoDetallesPage = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);
  const [error, setError] = useState(null);
  const [calificacion, setCalificacion] = useState(0);

  useEffect(() => {
    const cargarProducto = async () => {
      try {
        const response = await fetchProductos(); // Asegúrate de que fetchProductos devuelve un array
        if (response && Array.isArray(response.data)) {
          const productoEncontrado = response.data.find(
            (prod) => prod.id === parseInt(id)
          );
          
          if (productoEncontrado) {
            setProducto(productoEncontrado);
            setImagenSeleccionada(productoEncontrado.imagenes[0]); // Primera imagen por defecto
          } else {
            setError('Producto no encontrado.');
          }
        } else {
          setError('Formato de productos incorrecto.');
        }
      } catch (err) {
        setError('Error al cargar los detalles del producto.');
      }
    };
  
    cargarProducto();
  }, [id]);
  


  const manejarZoom = (e) => {
    const img = e.target;
    const { offsetX, offsetY } = e.nativeEvent;
    const { offsetWidth, offsetHeight } = img;
    const x = (offsetX / offsetWidth) * 100;
    const y = (offsetY / offsetHeight) * 100;
    img.style.transformOrigin = `${x}% ${y}%`;
    img.style.transform = 'scale(2)';
  };

  const quitarZoom = (e) => {
    e.target.style.transform = 'scale(1)';
    e.target.style.transformOrigin = 'center center';
  };

  if (error) {
    return <p className="text-red-500 text-center mt-10">{error}</p>;
  }

  if (!producto) {
    return <p className="text-gray-500 text-center mt-10">Cargando producto...</p>;
  }

  return (
    <Layout >
    <div className="container mx-auto p-6 bg-white">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Sección de imágenes */}
        <div className="lg:w-2/5 flex flex-col items-center">
          <div className="relative w-full h-96 border rounded-md overflow-hidden">
            <img
              src={`http://localhost:8000${imagenSeleccionada}`}
              alt={producto.titulo}
              className="h-full w-full object-contain transition-transform duration-300"
              onMouseMove={manejarZoom}
              onMouseLeave={quitarZoom}
            />
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              <button
                title="Marcar como favorito"
                className="p-2 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 transition"
              >
                <FaHeart size={20} />
              </button>
              <button
                title="Reportar"
                className="p-2 bg-gray-500 text-white rounded-full shadow-md hover:bg-gray-600 transition"
              >
                <FaFlag size={20} />
              </button>
            </div>
          </div>
          <div className="flex gap-4 mt-4">
            {producto.imagenes.map((img, index) => (
              <img
                key={index}
                src={`http://localhost:8000${img}`}
                alt={`Imagen ${index + 1}`}
                className={`h-16 w-16 border rounded-md object-contain cursor-pointer hover:ring-2 hover:ring-blue-500 ${
                  imagenSeleccionada === img ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => setImagenSeleccionada(img)}
              />
            ))}
          </div>
        </div>

        {/* Detalles del producto */}
        <div className="lg:w-3/5 flex flex-col gap-6">
          <h1 className="text-3xl font-semibold text-gray-800">{producto.titulo}</h1>
          <p className="text-gray-600 text-lg">{producto.descripcion}</p>
          <p className="text-3xl font-bold text-green-600">
            Bs. {producto.precio}
          </p>
          <p className="text-gray-500">
            <span className="font-medium">Stock:</span> {producto.stock}      
          </p>

          {/* Calificación con estrellas */}
          <div>
            <p className="font-medium text-lg">Calificación:</p>
            <div className="flex items-center gap-1 mt-2">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`text-2xl cursor-pointer ${
                    i < calificacion ? 'text-yellow-500' : 'text-gray-300'
                  }`}
                  onClick={() => setCalificacion(i + 1)}
                >
                  <FaStar />
                </span>
              ))}
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex gap-4 mt-6">
            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-medium transition">
              Agregar al carrito
            </button>
            <button className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg font-medium transition">
              Comprar ahora
            </button>
          </div>
        </div>
      </div>

      {/* Opiniones de usuarios */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Reseñas</h2>
        <div className="space-y-4">
          {[
            {
              nombre: 'Juan Pérez',
              calificacion: 5,
              comentario: 'Producto excelente. Muy recomendado.',
            },
            {
              nombre: 'Ana López',
              calificacion: 4,
              comentario: 'Buena calidad, pero el envío fue lento.',
            },
          ].map((resena, index) => (
            <div
              key={index}
              className="flex gap-4 items-start p-4 bg-gray-50 border rounded-lg shadow-sm"
            >
              
              <div>
              <div className="text-sm flex">
                {[...Array(resena.calificacion)].map((_, i) => (
                  <FaStar key={i} />
                ))}
                {resena.calificacion < 5 && <FaStarHalfAlt />}
              </div>
                <p className="font-semibold text-gray-800">{resena.nombre} </p>                
                <p className="text-gray-600">{resena.comentario}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </Layout>
  );

};

export default ProductoDetallesPage;
