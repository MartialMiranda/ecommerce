import React from "react";
import { Link, useNavigate } from "react-router-dom";

const ConfirmacionPedidoPage = () => {
  const navigate = useNavigate();

  return (
    <div className="confirmacion-pedido p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">¡Pedido Confirmado!</h1>
      <p className="text-lg mb-6">
        Gracias por tu compra. revisa tus compras en tu perfil para mas detalle.
      </p>

      <p className="mb-6">
        <Link to="/pedidos" className="text-blue-500 hover:underline">
          Ver pedidos
        </Link>
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