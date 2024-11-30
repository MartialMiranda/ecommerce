import React, { useEffect, useState, useRef } from "react";
import { fetchProductos } from "../api/productos";

import ProductoCard from "../components/ProductoCard";
import { Swiper, SwiperSlide } from 'swiper/react';


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

const ProductosDestacados = () => {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);
  const swiperRef = useRef(null);

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const productosObtenidos = await fetchProductos();
        if (productosObtenidos && productosObtenidos.data && Array.isArray(productosObtenidos.data)) {
          setProductos(productosObtenidos.data); // Asegúrate de acceder a la propiedad correcta
        } else {
          setError("Los productos no tienen el formato esperado.");
        }
      } catch (err) {
        setError("Error al cargar los productos.");
      }
    };   

    cargarProductos();
  }, []);

  const handlePrevSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const handleNextSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideNext();
    }
  };

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="relative w-full group">
      {/* Botón Anterior */}
      <button 
        onClick={handlePrevSlide}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-20 
        bg-white/70 hover:bg-white/90 rounded-full p-2 shadow-md 
        transition duration-300 ease-in-out 
        opacity-0 group-hover:opacity-100 
        focus:outline-none"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-6 w-6 text-gray-700" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M15 19l-7-7 7-7" 
          />
        </svg>
      </button>

      {/* Botón Siguiente */}
      <button 
        onClick={handleNextSlide}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-20 
        bg-white/70 hover:bg-white/90 rounded-full p-2 shadow-md 
        transition duration-300 ease-in-out 
        opacity-0 group-hover:opacity-100 
        focus:outline-none"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-6 w-6 text-gray-700" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M9 5l7 7-7 7" 
          />
        </svg>
      </button>

      <Swiper
        ref={swiperRef}
        direction="horizontal"
        spaceBetween={10}

        breakpoints={{
          320: {
            slidesPerView: 1.2,
            spaceBetween: 10
          },
          480: {
            slidesPerView: 2.2,
            spaceBetween: 15
          },
          640: {
            slidesPerView: 3.2,
            spaceBetween: 20
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 25
          }
        }}
        className="mySwiper w-full px-4"
      >
        {productos.map((producto) => (
          <SwiperSlide 
            key={producto.id} 
            className="h-auto"
          >
            <ProductoCard producto={producto} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductosDestacados;