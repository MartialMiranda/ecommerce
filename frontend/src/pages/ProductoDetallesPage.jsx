import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addProducto } from "../redux/slices/carritoSlice";
import {
  addFavoritoAction,
  removeFavoritoAction,
  getFavoritos,
} from "../redux/slices/favoritoSlice";
import { fetchProductos } from "../api/productos";
import { fetchProtectedInfo } from "../api/auth";
import { FaFlag } from "react-icons/fa";
import { Heart } from "lucide-react";
import Layout from "../components/layout";
import toastr from "toastr";
import "toastr/build/toastr.css";

const ProductoDetallesPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  const favoritos = useSelector((state) => state.favoritos.favoritos);
  const carrito = useSelector((state) => state.carrito.productos);

  toastr.options = {
    positionClass: "toast-top-right",
    timeOut: "3000",
    closeButton: true,
    progressBar: true,
  };

  // Función para obtener datos del usuario autenticado
  const cargarUsuario = async () => {
    try {
      const response = await fetchProtectedInfo();
      setUser(response.data.usuario);
    } catch (error) {
      // Solo establecer error si no es un error de autenticación
      if (error.response?.status !== 401) {
        setError("Error al obtener la información del usuario.");
      }
    }
  };

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
        throw new Error("Formato de respuesta incorrecto.");
      }
    } catch (err) {
      toastr.error("Error al cargar el producto.");
      setError("Error al cargar los detalles del producto.");
    }
  };

  useEffect(() => {
    const inicializar = async () => {
      try {
        const response = await fetchProtectedInfo();
        setUser(response.data.usuario);

        // Load favorites if user is authenticated
        if (response.data.usuario) {
          await dispatch(getFavoritos()).unwrap();
        }
      } catch (error) {
        if (error.response?.status === 401) {
          setUser(null);
        } else {
          setError("Error al obtener la información del usuario.");
        }
      }
    };
    inicializar();
    cargarProducto();
  }, [id, dispatch]);

  const redirigirLogin = () => {
    toastr.warning("Por favor, inicia sesión para continuar.");
    navigate("/login");
  };

  const handleAgregarAlCarrito = async () => {
    if (!user) {
      redirigirLogin();
      return;
    }

    try {
      const productoEnCarrito = carrito.find((p) => p.id === producto.id);

      if (productoEnCarrito) {
        toastr.info("Este producto ya está en tu carrito.");
        return;
      }

      if (producto.stock <= 0) {
        toastr.error("El producto no tiene stock disponible.");
        return;
      }

      await dispatch(
        addProducto({ productoId: producto.id, cantidad: 1 })
      ).unwrap();
      toastr.success("Producto agregado al carrito con éxito!");
    } catch (error) {
      toastr.error("Error al agregar el producto al carrito.");
    }
  };

  // Update esFavorito check
  const esFavorito = favoritos.some(
    (fav) =>
      Number(fav.producto_id) === Number(producto?.id) ||
      Number(fav.id) === Number(producto?.id)
  );

  // Update handleFavorito function
  const handleFavorito = async (e) => {
    if (e) e.preventDefault();

    if (!user) {
      toastr.warning("Por favor, inicia sesión para agregar favoritos.");
      navigate("/login");
      return;
    }

    try {
      if (esFavorito) {
        await dispatch(removeFavoritoAction(producto.id)).unwrap();
        toastr.success("Eliminado de favoritos");
      } else {
        await dispatch(addFavoritoAction(producto.id)).unwrap();
        toastr.success("Agregado a favoritos");
      }
      await dispatch(getFavoritos()).unwrap();
    } catch (error) {
      toastr.error("Error al actualizar favoritos");
    }
  };

  const handleReportar = () => {
    if (!user) {
      redirigirLogin();
      return;
    }
    // Lógica para reportar producto
    toastr.info("Función de reporte en desarrollo");
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

  const esProductoDelUsuario = producto.usuario_id === user?.id;

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
                  onClick={handleFavorito}
                  className=" z-10 bg-white rounded-full shadow-md p-2 hover:bg-red-500 transition"
                >
                  <Heart
                    className={` ${
                      esFavorito ? "fill-red-500 text-red-500 hover:text-white" : "hover:text-white"
                    }`}
                  />
                </button>
                <button
                  title="Reportar"
                  onClick={handleReportar}
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
              <span className="font-medium">Stock:</span>{" "}
              <span
                className={`${
                  producto.stock === 0 ? "text-red-500 line-through" : ""
                }`}
              >
                {producto.stock}
              </span>
              {producto.stock === 0 && (
                <span className="ml-2 text-red-500">No disponible</span>
              )}
            </p>

            {esProductoDelUsuario ? (
              <div className="flex space-x-4 mt-4">
                <Link
                  to={`/editar-producto/${producto.id}`}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                  Editar
                </Link>
              </div>
            ) : (
              <>
                <button
                  className={`w-full py-3 px-6 rounded-lg font-medium transition ${
                    producto.stock === 0
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-600 text-white"
                  }`}
                  onClick={handleAgregarAlCarrito}
                  disabled={producto.stock === 0}
                >
                  {producto.stock === 0
                    ? "Sin stock disponible"
                    : "Agregar al carrito"}
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
