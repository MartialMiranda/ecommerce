import React, { useEffect, useState } from "react";
import { obtenerProductos } from "../api/productos";
import ProductoCard from "../components/ProductoCard";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import '../styles.css';


const ProductosDestacados = () => {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const productosObtenidos = await obtenerProductos();
        if (productosObtenidos && Array.isArray(productosObtenidos)) {
          setProductos(productosObtenidos);
        } else {
          setError("Los productos no tienen el formato esperado.");
        }
      } catch (err) {
        setError("Error al cargar los productos.");
      }
    };

    cargarProductos();
  }, []);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="productos-destacados">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Productos Destacados
      </h2>

      <Swiper
        spaceBetween={10}  // Espacio entre los productos
        slidesPerView={"auto"}  // Se adapta a la cantidad de productos visibles
        loop={true}  // Hace que el carrusel sea infinito
        centeredSlides={true}  // Centra el slide actual
        className="mySwiper"
      >
        {productos.map((producto) => (
          <SwiperSlide key={producto.id}>
            <ProductoCard producto={producto} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductosDestacados;
