import React from 'react';
import ShoppingCart from '../components/shoppingCart';

const CarritoPage = () => {

  return (
    <div>
      <h1>Carrito de Compras</h1>
      <ShoppingCart usuarioId={usuarioId} />
    </div>
  );
};

export default CarritoPage;
