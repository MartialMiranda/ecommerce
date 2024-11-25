import React from 'react';

const Banner = () => {
  return (
    <div className="relative bg-gray-100 rounded-lg shadow-lg overflow-hidden">
      <img
        src="https://img.freepik.com/foto-gratis/decoracion-vinilo-black-friday-espacio-derecha_23-2147696825.jpg?t=st=1732380968~exp=1732384568~hmac=6bc6d5662e897d8928557caaeb2734fbcdb89d268ee97ca343d582ea0972f7a0&w=740"
        alt="Banner"
        className="w-full h-60 object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center text-white p-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">
          Oferta especial
        </h2>
        <p className="text-sm md:text-base mb-4">
          Descuento del 20% en productos seleccionados
        </p>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg shadow-md transition">
          Ver ofertas
        </button>
      </div>
    </div>
  );
};

export default Banner;
