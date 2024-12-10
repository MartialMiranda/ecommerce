import React from "react";
import ShoppingCart from "../components/shoppingCart";
const CarritoPage = () => {// Aquí se debe establecer el ID del usuario (puedes obtenerlo de contexto o autenticación)

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Carrito de Compras</h1>
      <ShoppingCart/>
    </div>
  );
};

export default CarritoPage;
