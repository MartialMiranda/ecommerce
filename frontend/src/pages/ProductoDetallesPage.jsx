import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addProducto } from "../redux/slices/carritoSlice";
import { fetchProductos } from "../api/productos";
import { FaHeart, FaFlag, FaStar, FaStarHalfAlt } from "react-icons/fa";
import Layout from "../components/layout";
import { fetchProtectedInfo } from "../api/auth";
import { Link } from "react-router-dom";

const ProductoDetallesPage = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);
  const [error, setError] = useState(null);
  const [calificacion, setCalificacion] = useState(0);
  const [cantidad, setCantidad] = useState(1);
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);

  const protectedInfo = async () => {
    try {
      const response = await fetchProtectedInfo();
      setUser(response.data.usuario); // Ajusta la propiedad según la respuesta del backend
    } catch (error) {
      console.error(
        "Error al obtener datos protegidos:",
        error.response || error.message
      );
    }
  };
  useEffect(() => {
    protectedInfo();
  }, []);

  // Accede al estado del carrito y usuario logeado
  const carrito = useSelector((state) => state.carrito.productos);
  const usuarioLogeado = user?.id;

  useEffect(() => {
    const cargarProducto = async () => {
      try {
        const response = await fetchProductos();
        if (response && Array.isArray(response.data)) {
          const productoEncontrado = response.data.find(
            (prod) => prod.id === parseInt(id)
          );

          if (productoEncontrado) {
            setProducto(productoEncontrado);
            setImagenSeleccionada(productoEncontrado.imagenes[0]);
          } else {
            setError("Producto no encontrado.");
          }
        } else {
          setError("Formato de productos incorrecto.");
        }
      } catch (err) {
        setError("Error al cargar los detalles del producto.");
      }
    };

    cargarProducto();
  }, [id]);

  const handleAgregarAlCarrito = async () => {
    try {
      const productoEnCarrito = carrito.find((p) => p.id === producto.id);
      const cantidadTotal = (productoEnCarrito?.cantidad || 0) + cantidad;

      const response = await dispatch(
        addProducto({ productoId: producto.id, cantidad: cantidadTotal })
      ).unwrap();

      alert(
        response.existing
          ? "Cantidad actualizada en el carrito"
          : "Producto agregado al carrito"
      );
    } catch (error) {
      console.error("Error al agregar el producto al carrito", error);
      alert("Ocurrió un error al agregar el producto");
    }
  };

  const manejarZoom = (e) => {
    const img = e.target;
    const { offsetX, offsetY } = e.nativeEvent;
    const { offsetWidth, offsetHeight } = img;
    const x = (offsetX / offsetWidth) * 100;
    const y = (offsetY / offsetHeight) * 100;
    img.style.transformOrigin = `${x}% ${y}%`;
    img.style.transform = "scale(2)";
  };

  const quitarZoom = (e) => {
    e.target.style.transform = "scale(1)";
    e.target.style.transformOrigin = "center center";
  };

  if (error) {
    return <p className="text-red-500 text-center mt-10">{error}</p>;
  }

  if (!producto) {
    return (
      <p className="text-gray-500 text-center mt-10">Cargando producto...</p>
    );
  }

  const esProductoDelUsuario = producto.usuario_id === usuarioLogeado;

  return (
    <Layout>
      <div className="container mx-auto p-6 bg-white">
        <div className="flex flex-col lg:flex-row gap-10">
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
                  className={`h-16 w-16 border rounded-md object-contain cursor-pointer ${
                    imagenSeleccionada === img ? "ring-2 ring-blue-500" : ""
                  }`}
                  onClick={() => setImagenSeleccionada(img)}
                />
              ))}
            </div>
          </div>

          <div className="lg:w-3/5 flex flex-col gap-6">
            <h1 className="text-3xl font-semibold text-gray-800">
              {producto.titulo}
            </h1>
            <p className="text-gray-600 text-lg">{producto.descripcion}</p>
            <p className="text-3xl font-bold text-green-600">
              Bs. {producto.precio}
            </p>
            <p className="text-gray-500">
              <span className="font-medium">Stock:</span> {producto.stock}
            </p>

            {esProductoDelUsuario ? (
              <div className="flex space-x-4 mt-4 md:mt-0">
                <Link
                  to={`/editar-producto/${producto.id}`}
                  className="px-4 py-2 bg-blue-500 text-white text-sm font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
                >
                  Editar
                </Link>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-4">
                  <label>Cantidad:</label>
                  <input
                    type="number"
                    min="1"
                    value={cantidad}
                    onChange={(e) =>
                      setCantidad(Math.max(1, parseInt(e.target.value, 10)))
                    }
                    className="border border-gray-300 rounded-lg px-2 py-1 w-16"
                  />
                </div>
                <button
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-medium transition"
                  onClick={handleAgregarAlCarrito}
                >
                  Agregar al carrito
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductoDetallesPage;
