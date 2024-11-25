import React, { useState, useEffect } from 'react';

const Slider = () => {
  const slides = [
    {
      id: 1,
      src: 'https://img.freepik.com/foto-gratis/imagen-cosechada-mujer-que-introduce-informacion-tarjeta-llave-telefono-o-ordenador-portatil-mientras-que-hace-compras-linea_1423-68.jpg?t=st=1732380180~exp=1732383780~hmac=dbad61c60f9d514c08e5a876e34016e4bdbdffa3f1183904f0b84efdde28df0c&w=1380',
      alt: 'Imagen 1',
    },
    {
      id: 2,
      src: 'https://img.freepik.com/foto-gratis/mostrando-carro-carro-compras-linea-signo-grafico_53876-139718.jpg?t=st=1732380219~exp=1732383819~hmac=bd7f86943d9f63845d3e06a9549ce1320efdbdff32e0358229d84e544ca5d3c2&w=740',
      alt: 'Imagen 2',
    },
    {
      id: 3,
      src: 'https://img.freepik.com/foto-gratis/cesta-compra_1421-567.jpg?t=st=1732380263~exp=1732383863~hmac=08b8a3ed34581d6f9520021f2ce34a7e23ea2a4bc00adc527be02fb72d181e93&w=740',
      alt: 'Imagen 3',
    },
    {
      id: 4,
      src: 'https://img.freepik.com/foto-gratis/cesta-compra_1421-567.jpg?t=st=1732380263~exp=1732383863~hmac=08b8a3ed34581d6f9520021f2ce34a7e23ea2a4bc00adc527be02fb72d181e93&w=740',
      alt: 'Imagen 4',
    },
    {
      id: 5,
      src: 'https://img.freepik.com/foto-gratis/cesta-compra_1421-567.jpg?t=st=1732380263~exp=1732383863~hmac=08b8a3ed34581d6f9520021f2ce34a7e23ea2a4bc00adc527be02fb72d181e93&w=740',
      alt: 'Imagen 4',
    },
    {
      id: 6,
      src: 'https://img.freepik.com/foto-gratis/cesta-compra_1421-567.jpg?t=st=1732380263~exp=1732383863~hmac=08b8a3ed34581d6f9520021f2ce34a7e23ea2a4bc00adc527be02fb72d181e93&w=740',
      alt: 'Imagen 4',
    },
    {
      id: 7,
      src: 'https://img.freepik.com/foto-gratis/cesta-compra_1421-567.jpg?t=st=1732380263~exp=1732383863~hmac=08b8a3ed34581d6f9520021f2ce34a7e23ea2a4bc00adc527be02fb72d181e93&w=740',
      alt: 'Imagen 4',
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Cambiar cada 5 segundos
    return () => clearInterval(interval);
  }, [slides.length]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="relative w-full mx-auto overflow-hidden rounded-lg shadow-lg mt-6">
      <div
        className="flex transition-transform duration-500"
        style={{
          transform: `translateX(-${currentSlide * 100 / slides.length}%)`,
        }}
      >
        {slides.map((slide) => (
          <img
            key={slide.id}
            src={slide.src}
            alt={slide.alt}
            className="w-full h-64 object-cover"
          />
        ))}
      </div>

      {/* Botones de navegación */}
      <button
        onClick={handlePrev}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white text-gray-800 p-2 rounded-full shadow hover:bg-gray-100 transition"
        aria-label="Anterior"
      >
        &#8592;
      </button>
      <button
        onClick={handleNext}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white text-gray-800 p-2 rounded-full shadow hover:bg-gray-100 transition"
        aria-label="Siguiente"
      >
        &#8594;
      </button>

      {/* Indicadores */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              currentSlide === index
                ? 'bg-blue-500'
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
