import React from 'react';
import Layout from '../components/layout';
import Slider from '../components/Slider';
import Categorías from '../components/Categorías';
import ProductosDestacados from '../components/ProductosDestacados';
import Banner from '../components/Banner';

const Home = () => {
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
            Productos Destacados
          </h2>
          <div className='bg-gray-100 p-3 rounded-lg'>
            <ProductosDestacados />
          </div>
          
        </section>

        {/* Banner Section */}
        <section className="banner mb-12">
          <Banner />
        </section>

        {/* Special Offers Section */}
        <section className="ofertas-especiales">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Ofertas Especiales
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { id: 1, img: 'https://img.freepik.com/foto-gratis/vida-muerta-auriculares-ciberneticos-inalambricos_23-2151072224.jpg?t=st=1732380582~exp=1732384182~hmac=f2b8a4d33241531d0e4ec0746b6ce8b822d4016a71d42b2e89d35e045ea6ef7c&w=740', title: 'Producto 1', price: 'Bs.99.99' },
              { id: 2, img: 'https://img.freepik.com/foto-gratis/bodegon-cambio-armario-primavera_23-2150478968.jpg?t=st=1732380642~exp=1732384242~hmac=c933ffb73096bb15e3554e29e5a6e31057a84797d8067a37840844780400cb3f&w=740', title: 'Producto 2', price: 'Bs.149.99' },
              { id: 3, img: 'https://img.freepik.com/foto-gratis/almohada-sofa_74190-2070.jpg?t=st=1732380699~exp=1732384299~hmac=eec76f45fa4625eb85e498fa509c5f3b0e833be80b1142fdcc29e7656267da5c&w=740', title: 'Producto 3', price: 'Bs.199.99' },
            ].map((product) => (
              <div
                key={product.id}
                className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition"
              >
                <img
                  src={product.img}
                  alt={product.title}
                  className="h-48 w-full object-cover"
                />
                <div className="p-4">
                  <h5 className="text-xl font-bold text-gray-800">{product.title}</h5>
                  <p className="text-gray-700 font-medium mb-4">{product.price}</p>
                  <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition">
                    Comprar ahora
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default Home;
