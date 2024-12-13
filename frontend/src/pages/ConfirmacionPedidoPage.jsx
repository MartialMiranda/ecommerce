import React from "react";
import { useNavigate } from "react-router-dom";

const ConfirmacionPedidoPage = () => {
  const navigate = useNavigate();

  return (
    <div className="confirmacion-pedido p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">¡Pedido Confirmado!</h1>
      <p className="text-lg mb-6">
        Gracias por tu compra. Recibirás un correo con los detalles del pedido.
      </p>
      <button
        onClick={() => navigate("/")}
        className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition"
      >
        Volver al Inicio
      </button>
    </div>
  );
};

export default ConfirmacionPedidoPage;