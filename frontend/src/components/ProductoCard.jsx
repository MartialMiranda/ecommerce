import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react'; // Asegúrate de instalar lucide-react

const ProductoCard = ({ producto, esOfertaEspecial = false }) => {
  const [liked, setLiked] = useState(false);

   // Convertir precio a número y manejar casos donde no sea un número válido
   const precioOriginal = Number(producto.precio) || 0;

   // Generar descuento aleatorio solo una vez
   const descuento = esOfertaEspecial 
     ? Math.floor(Math.random() * (50 - 10 + 1)) + 10 // Descuentos entre 10% y 50%
     : 0;
 
   // Calcular precio con descuento
   const precioConDescuento = esOfertaEspecial
     ? precioOriginal * (1 - descuento / 100)
     : precioOriginal;
 
  const handleLike = (e) => {
    e.preventDefault(); // Evita que el link se active
    setLiked(!liked);
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
          className={`w-6 h-6 ${liked ? 'fill-red-500 text-red-500' : 'text-gray-500'}`} 
        />
      </button>

      {/* Etiqueta de descuento */}
      {esOfertaEspecial && (
        <div className="absolute top-2 left-2 z-10 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
          {descuento}% OFF
        </div>
      )}

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
          
          {/* Condición para mostrar precios de oferta */}
          {esOfertaEspecial ? (
            <div className="flex items-center space-x-2">
              <p className="font-medium line-through text-red-500">
                Bs. {precioOriginal.toFixed(2)}
              </p>
              <p className="text-green-600 font-bold">
                Bs. {precioConDescuento.toFixed(2)}
              </p>
            </div>
          ) : (
            <p className="text-gray-700 font-medium">
              Bs. {precioOriginal.toFixed(2)}
            </p>
          )}
        </div>
      </Link>
      <div className="p-4 bg-white">
        <button
          className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg text-center transition"
          onClick={() => handleAgregarAlCarrito(producto)}
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  );
};

const handleAgregarAlCarrito = (producto) => {
  console.log(`Producto agregado al carrito: ${producto.titulo}`);
};

export default ProductoCard;