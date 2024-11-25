import React from "react";

const ProductoDetalles = ({ producto }) => {
  return (
    <div className="max-w-4xl mx-auto mt-8 p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Galería de imágenes */}
        <div>
          {producto.imagenes.map((imagen, index) => (
            <img
              key={index}
              src={`http://localhost:8000${imagen}`}
              alt={`Imagen ${index + 1}`}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
          ))}
        </div>

        {/* Información del producto */}
        <div>
          <h1 className="text-2xl font-bold mb-4">{producto.titulo}</h1>
          <p className="text-gray-700 mb-4">{producto.descripcion}</p>
          <p className="text-lg font-semibold mb-4">Bs. {producto.precio}</p>
          <p className="text-sm text-gray-600 mb-4">
            Stock disponible: {producto.stock}
          </p>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg">
            Comprar ahora
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductoDetalles;
