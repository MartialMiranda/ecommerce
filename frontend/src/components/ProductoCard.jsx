import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Importar useNavigate
import { Heart, Edit } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addProducto } from "../redux/slices/carritoSlice";
import { fetchProtectedInfo } from "../api/auth";
import toastr from "toastr";
import "toastr/build/toastr.css";

const ProductoCard = ({ producto }) => {
  const [liked, setLiked] = useState(false);
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Inicializar useNavigate

  // Configuración global de Toastr
  toastr.options = {
    positionClass: "toast-top-right",
    timeOut: "3000",
    closeButton: true,
    progressBar: true,
  };

  // Obtener información del usuario
  useEffect(() => {
    const obtenerInfoUsuario = async () => {
      try {
        const response = await fetchProtectedInfo();
        setUser(response.data.usuario);
      } catch (error) {
        toastr.error("Error al obtener datos de usuario.");
        console.error("Error al obtener datos de usuario", error);
      }
    };

    obtenerInfoUsuario();
  }, []);

  // Accede al estado del carrito
  const carrito = useSelector((state) => state.carrito.productos);

  // Encuentra si el producto ya está en el carrito
  const productoEnCarrito = carrito.find((p) => p.id === producto.id);

  // Verificar si el producto pertenece al usuario
  const esProductoDelUsuario = producto.usuario_id === user?.id;

  const handleLike = (e) => {
    e.preventDefault();
    setLiked(!liked);
    toastr.success(liked ? "Eliminado de favoritos" : "Agregado a favoritos");
  };

  const handleAgregarAlCarrito = async () => {
    if (!user) {
      // Si el usuario no está autenticado, redirigir al login
      toastr.warning("Por favor, inicia sesión para agregar productos al carrito.");
      navigate("/login");
      return; // Detener la ejecución
    }

    try {
      // Verificar si el producto ya existe en el carrito
      if (productoEnCarrito) {
        toastr.info("Este producto ya está en tu carrito.");
        return;
      }

      // Verificar si hay stock disponible
      if (producto.stock <= 0) {
        toastr.error("El producto no tiene stock disponible.");
        return;
      }

      // Agregar el producto con cantidad 1 por defecto
      await dispatch(addProducto({ productoId: producto.id, cantidad: 1 })).unwrap();
      toastr.success("Producto agregado al carrito con éxito!");
    } catch (error) {
      console.error("Error al agregar el producto al carrito", error);
      toastr.error("Ocurrió un error al agregar el producto al carrito.");
    }
  };

  return (
    <div
      key={producto.id}
      className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition cursor-pointer h-full flex flex-col relative"
    >
      {/* Botón de like */}
      <button
        onClick={handleLike}
        className="absolute top-2 right-2 z-10 bg-white/50 rounded-full p-1 hover:bg-white/75 transition"
      >
        <Heart
          className={`w-6 h-6 ${liked ? "fill-red-500 text-red-500" : "text-gray-500"}`}
        />
      </button>

      <Link to={`/producto/${producto.id}`} className="block flex-grow">
        <img
          src={`http://localhost:8000${producto.imagenes[0]}`}
          alt={producto.titulo}
          className="h-48 w-full object-cover"
        />
        <div className="p-4 flex-grow">
          <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">
            {producto.titulo}
          </h3>
          <p className="text-gray-700 font-medium">
            Bs. {Number(producto.precio).toFixed(2)}
          </p>
        </div>
      </Link>

      <div className="p-4 bg-white">
        {esProductoDelUsuario ? (
          <div className="flex space-x-4">
            <Link
              to={`/editar-producto/${producto.id}`}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg text-center transition flex items-center justify-center"
            >
              <Edit className="mr-2 w-5 h-5" /> Editar
            </Link>
          </div>
        ) : (
          <>
            <button
              className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg text-center transition"
              onClick={handleAgregarAlCarrito}
            >
              Agregar al carrito
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductoCard;
