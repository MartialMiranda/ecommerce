import React from 'react';
import { Link } from 'react-router-dom';

const ProductoCard = ({ producto }) => {
  return (
    <div
      key={producto.id}
      className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition cursor-pointer"
    >
      <Link to={`/producto/${producto.id}`} className="block">
        <img
          src={`http://localhost:8000${producto.imagenes[0]}`}
          alt={producto.titulo}
          className="h-48 w-full object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {producto.titulo}
          </h3>
          <p className="text-gray-700 font-medium mb-4">Bs. {producto.precio}</p>
        </div>
      </Link>
      {/* Agregar al carrito */}
      <div className="p-4 bg-gray-100">
        <button
          className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg text-center transition"
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  );
};

export default ProductoCard;
