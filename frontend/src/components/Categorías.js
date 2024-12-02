import React from 'react';
import {
  FaMobileAlt,
  FaTshirt,
  FaCouch,
  FaGamepad,
  FaHeadphones,
  FaBook,
} from 'react-icons/fa';
import { IoIosFootball } from "react-icons/io";
import { GiLipstick } from "react-icons/gi";

const Categorías = () => {
  const categories = [
    { name: 'Electrónica', icon: <FaMobileAlt /> },
    { name: 'Moda', icon: <FaTshirt /> },
    { name: 'Hogar', icon: <FaCouch /> },
    { name: 'Juegos', icon: <FaGamepad /> },
    { name: 'Música', icon: <FaHeadphones /> },
    { name: 'Libros', icon: <FaBook /> },
    { name: 'Deportes', icon: <IoIosFootball /> },
    { name: 'Belleza', icon: <GiLipstick /> },
  ];

  return (
    <div className="w-full mx-auto p-6">
      <ul className="flex justify-center space-x-4">
        {categories.map((category, index) => (
          <li
            key={index}
            className="flex flex-col items-center hover:bg-gray-100 p-4 rounded-md transition cursor-pointer"
          >
            <div className="text-blue-500 text-3xl">{category.icon}</div>
            <span className="text-lg font-semibold text-gray-700 hover:text-blue-500">
              {category.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categorías;