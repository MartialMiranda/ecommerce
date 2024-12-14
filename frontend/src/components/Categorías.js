import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategorias } from '../redux/slices/categoriaSlice'; // Asegúrate de importar correctamente
import { Swiper, SwiperSlide } from 'swiper/react';  // Importa Swiper
import 'swiper/css';  // Importa los estilos de Swiper
import 'swiper/css/navigation';  // Estilos de navegación si los necesitas

const Categorías = () => {
  const dispatch = useDispatch();
  const { categorias, loading, error } = useSelector((state) => state.categoria); // Accede al estado de categorias

  useEffect(() => {
    dispatch(getCategorias()); // Obtiene las categorías cuando el componente se monta
  }, [dispatch]);

  if (loading) return <div>Cargando categorías...</div>;
  if (error) return <div>Error al cargar las categorías: {error}</div>;
  if (!Array.isArray(categorias)) return <div>No se han encontrado categorías.</div>;

  return (
    <div className="w-full mx-auto p-6">
      <Swiper
        spaceBetween={20} // Espacio entre los elementos
        slidesPerView={6} // Muestra 3 elementos al mismo tiempo
        freeMode={true}  // Permite deslizar libremente
        className="mySwiper"
      >
        {categorias.map((category, index) => (
          <SwiperSlide key={index} className="flex flex-col items-center p-4 rounded-lg  text-gray-700 text-center cursor-pointer hover:bg-gray-100 transition-all">
            <button className="text-sm font-semibold">{category.nombre}</button>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Categorías;
