import React from 'react';
import { Link } from 'react-router-dom';

const ProductoCard = ({ producto }) => {
  return (
    <div
      key={producto.id}
      className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition cursor-pointer h-full flex flex-col"
    >
      <Link to={`/producto/${producto.id}`} className="block flex-grow">
        <img
          src={`http://localhost:8000${producto.imagenes[0]}`} // Asegúrate de que esta URL sea correcta
          alt={producto.titulo}
          className="h-48 w-full object-cover" // Mantiene la altura de la imagen
        />
        <div className="p-4 flex-grow">
          <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">
            {producto.titulo}
          </h3>
          <p className="text-gray-700 font-medium mb-4">Bs. {producto.precio}</p>
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