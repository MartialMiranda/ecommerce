import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPedidos, updateEstadoPedido } from "../redux/slices/pedidoSlice";
import { Link } from "react-router-dom";

const PedidosPage = () => {
  const dispatch = useDispatch();
  const { pedidos, status, error } = useSelector((state) => state.pedido);

  useEffect(() => {
    dispatch(fetchPedidos());
  }, [dispatch]);

  const handleCancelarPedido = (pedidoId) => {
    if (window.confirm("¿Estás seguro de cancelar este pedido?")) {
      dispatch(updateEstadoPedido({ pedidoId, estado: "cancelado" }));
    }
  };

  if (status === "loading") {
    return <div className="text-center">Cargando pedidos...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        Error al cargar pedidos: {error}
      </div>
    );
  }

  if (!pedidos || pedidos.length === 0) {
    return <div className="text-center">No tienes pedidos realizados.</div>;
  }

  return (
    <div className="pedidos-page p-6">
      <h1 className="text-2xl font-bold mb-4">Mis Pedidos</h1>
      <ul className="divide-y divide-gray-300">
        {pedidos.map((pedido) => (
          <li key={pedido.id} className="py-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Pedido #{pedido.id}</p>
                <p className="text-gray-500">
                  Fecha: {new Date(pedido.fecha_pedido).toLocaleString()}
                </p>
                <p className="text-gray-500">Total: ${pedido.total}</p>
                <p className="text-gray-500">Estado: {pedido.estado}</p>
              </div>

              <div className="flex space-x-4">
                <Link
                  to={`/pedido/${pedido.id}`}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                >
                  Ver Detalles
                </Link>

                {pedido.estado !== "cancelado" && pedido.estado !== "completado" && (
                  <button
                    onClick={() => handleCancelarPedido(pedido.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                  >
                    Cancelar Pedido
                  </button>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PedidosPage;