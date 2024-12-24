// components/ProductoCard.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, Edit } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  addFavoritoAction,
  removeFavoritoAction,
  getFavoritos,
} from "../redux/slices/favoritoSlice";
import { addProducto } from "../redux/slices/carritoSlice";
import { fetchProtectedInfo } from "../api/auth";
import toastr from "toastr";
import "toastr/build/toastr.css";

const ProductoCard = ({ producto }) => {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const favoritos = useSelector((state) => state.favoritos.favoritos);
  const carrito = useSelector((state) => state.carrito.productos);

  const productoEnCarrito = carrito.find((p) => p.id === producto.id);
  const esProductoDelUsuario = producto.usuario_id === user?.id;

  useEffect(() => {
    const inicializar = async () => {
      try {
        const response = await fetchProtectedInfo();
        setUser(response.data.usuario);

        // Si el usuario está autenticado, cargar sus favoritos
        if (response.data.usuario) {
          await dispatch(getFavoritos()).unwrap();
        }
      } catch (error) {
        if (error.response?.status === 401) {
          setUser(null); // Usuario no autenticado
        } else {
          console.error("Error usuario:", error);
        }
      }
    };
    inicializar();
  }, [dispatch]);

  const esFavorito = favoritos.some(fav => 
    Number(fav.producto_id) === Number(producto.id) || 
    Number(fav.id) === Number(producto.id)
  );

  const handleLike = async (e) => {
  e.preventDefault();
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

  const handleAgregarAlCarrito = async () => {
    if (!user) {
      toastr.warning("Por favor, inicia sesión para agregar productos al carrito.");
      navigate("/login");
      return;
    }

    try {
      if (productoEnCarrito) {
        toastr.info("Este producto ya está en tu carrito.");
        return;
      }

      if (producto.stock <= 0) {
        toastr.error("El producto no tiene stock disponible.");
        return;
      }

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
       <button
        onClick={handleLike}
        className="absolute top-2 right-2 z-10 bg-white/50 rounded-full p-1 hover:bg-white/75 transition"
      >
        <Heart
          className={`w-6 h-6 ${esFavorito ? "fill-red-500 text-red-500" : "text-gray-500"}`}
        />
      </button>

      <Link to={`/producto/${producto.id}`} className="block flex-grow">
        <img
          src={
            producto.imagenes && producto.imagenes.length > 0
              ? `http://localhost:8000${producto.imagenes[0]}`
              : "https://via.placeholder.com/150" // Imagen de respaldo
          }
          alt={producto.titulo || "Producto sin título"}
          className="h-48 w-full object-cover"
        />
        <div className="p-4 flex-grow">
          <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">
            {producto.titulo || "Sin título"}
          </h3>
          <p className="text-gray-700 font-medium">
            Bs. {producto.precio ? Number(producto.precio).toFixed(2) : "0.00"}
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
          <button
            className={`w-full font-medium py-2 px-4 rounded-lg text-center transition ${
              producto.stock === 0
                ? "bg-gray-400 cursor-not-allowed text-gray-100"
                : "bg-green-500 hover:bg-green-600 text-white"
            }`}
            onClick={handleAgregarAlCarrito}
            disabled={producto.stock === 0}
          >
            {producto.stock === 0 ? "Sin stock disponible" : "Agregar al carrito"}
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductoCard;
