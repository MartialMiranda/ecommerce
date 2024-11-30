import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Layout from "../components/layout";
import Slider from "../components/Slider";
import Categorías from "../components/Categorías";
import ProductosDestacados from "../components/ProductosDestacados";
import Banner from "../components/Banner";
import { fetchProductos } from "../api/productos";
import ProductoCard from "../components/ProductoCard";

// Importa los estilos de Swiper
import "swiper/css";
import "swiper/css/navigation";

const Home = () => {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);

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
  return (
    <Layout>
      <main className="container mx-auto px-4 lg:px-8">
        {/* Hero Section */}
        <section className="hero mb-10">
          <Slider />
        </section>
        {/* Categories Section */}
        <section className="categorías mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Categorías
          </h2>
          <div className="flex justify-center">
            <Categorías />
          </div>
        </section>
        {/* Featured Products Section */}
        <section className="productos-destacados mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Productos Recientes
          </h2>
          <div className="bg-gray-100 p-3 rounded-lg">
            <ProductosDestacados />
          </div>
        </section>
        {/* Banner Section */}
        <section className="banner mb-12">
          <Banner />
        </section>
        {/* Special Offers Section */}
        <section className="ofertas-especiales mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Ofertas Especiales
          </h2>
          {error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : (
            <div className="bg-gray-100 p-3 rounded-lg">
              <Swiper
                direction="horizontal"
                spaceBetween={10}
                breakpoints={{
                  320: {
                    slidesPerView: 1.2,
                    spaceBetween: 10,
                  },
                  480: {
                    slidesPerView: 2.2,
                    spaceBetween: 15,
                  },
                  640: {
                    slidesPerView: 3.2,
                    spaceBetween: 20,
                  },
                  1024: {
                    slidesPerView: 4,
                    spaceBetween: 25,
                  },
                }}
                className="mySwiper w-full px-4"
              >
                {productos.map((producto) => (
                  <SwiperSlide key={producto.id} className="h-auto">
                    <ProductoCard producto={producto} esOfertaEspecial={true} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
        </section>
      </main>
    </Layout>
  );
};

export default Home;
