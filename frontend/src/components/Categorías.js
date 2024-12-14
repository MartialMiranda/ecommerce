import React, { useEffect, useState } from 'react';
import Axios from 'axios'; // Si usas Axios, si no, usa fetch
import { FaMobileAlt, FaTshirt, FaCouch, FaGamepad, FaHeadphones, FaBook } from 'react-icons/fa';
import { IoIosFootball } from "react-icons/io";
import { GiLipstick } from "react-icons/gi";

const Categorías = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);  // Asume que también tienes un estado para los productos

  // Obtener categorías desde el backend
  useEffect(() => {
    const obtenerCategorias = async () => {
      try {
        const response = await Axios.get('http://localhost:8000/obtenerCategorias'); // URL de tu backend
        setCategories(response.data.data); // Suponiendo que la respuesta es de la forma { success: true, data: [] }
      } catch (error) {
        console.error('Error al obtener categorías:', error);
      }
    };

    obtenerCategorias();
  }, []);

  // Función para filtrar productos por categoría seleccionada
  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    // Realiza la lógica para filtrar productos según la categoría (esto depende de tu lógica de productos)
    // Aquí tienes un ejemplo simple, asumiendo que tienes un array de productos
    const productosFiltrados = allProducts.filter((producto) => producto.categoria_id === categoryId);
    setProducts(productosFiltrados);
  };

  return (
    <div className="w-full mx-auto p-6">
      <ul className="flex justify-center space-x-4">
        {categories.map((category) => (
          <li
            key={category.id} // Cambié key por category.id
            className="flex flex-col items-center hover:bg-gray-100 p-4 rounded-md transition cursor-pointer"
            onClick={() => handleCategorySelect(category.id)}
          >
            <div className="text-blue-500 text-3xl">
              {/* Aquí se puede agregar el icono correspondiente por cada categoría */}
              {category.icon === 'Electrónica' ? <FaMobileAlt /> :
               category.icon === 'Moda' ? <FaTshirt /> :
               category.icon === 'Hogar' ? <FaCouch /> :
               category.icon === 'Juegos' ? <FaGamepad /> :
               category.icon === 'Música' ? <FaHeadphones /> :
               category.icon === 'Libros' ? <FaBook /> :
               category.icon === 'Deportes' ? <IoIosFootball /> :
               category.icon === 'Belleza' ? <GiLipstick /> :
               null
              }
            </div>
            <span className="text-lg font-semibold text-gray-700 hover:text-blue-500">
              {category.nombre}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categorías;
