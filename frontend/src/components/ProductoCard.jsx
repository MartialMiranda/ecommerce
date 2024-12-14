import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Heart, Edit } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addProducto } from "../redux/slices/carritoSlice";
import { fetchProtectedInfo } from "../api/auth";

const ProductoCard = ({ producto }) => {
  const [liked, setLiked] = useState(false);
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  // Obtener información del usuario
  useEffect(() => {
    const obtenerInfoUsuario = async () => {
      try {
        const response = await fetchProtectedInfo();
        setUser(response.data.usuario);
      } catch (error) {
        console.error("Error al obtener datos de usuario", error);
      }
    };

    obtenerInfoUsuario();
  }, []);

  // Accede al estado del carrito
  const carrito = useSelector((state) => state.carrito.productos);

  // Encuentra la cantidad actual del producto en el carrito
  const productoEnCarrito = carrito.find((p) => p.id === producto.id);
  const cantidadActualEnCarrito = productoEnCarrito?.cantidad || 0;

  // Verificar si el producto pertenece al usuario
  const esProductoDelUsuario = producto.usuario_id === user?.id;

  const handleLike = (e) => {
    e.preventDefault();
    setLiked(!liked);
  };

  const handleAgregarAlCarrito = async () => {
    try {
      // Se envía la cantidad 1 por defecto
      const cantidadTotal = cantidadActualEnCarrito + 1;
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
