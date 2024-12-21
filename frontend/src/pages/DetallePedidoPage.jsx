import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchDetallesPedido } from "../redux/slices/pedidoSlice";
import { useParams } from "react-router-dom";
import Layout from "../components/layout";

const DetallePedidoPage = () => {
  const { pedidoId } = useParams();
  const dispatch = useDispatch();

  const { detalles, status, error } = useSelector((state) => state.pedido);

  useEffect(() => {
    if (pedidoId) {
      dispatch(fetchDetallesPedido(pedidoId)); // Cargar detalles del pedido
    }
  }, [dispatch, pedidoId]);

  if (status === "loading") {
    return <div>Cargando detalles del pedido...</div>;
  }

  if (status === "failed") {
    return <div>Error al cargar los detalles: {error}</div>;
  }

  if (!detalles || detalles.length === 0) {
    return <div>No hay detalles disponibles para este pedido.</div>;
  }

  return (
    <Layout>
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Detalle del Pedido #{pedidoId}</h1>
      <ul className="space-y-4">
        {detalles.map((producto, index) => (
          <li
            key={producto.producto_id}
            className="border p-4 rounded shadow-sm bg-white flex flex-col md:flex-row"
          >
            <div className="w-full md:w-1/4 mb-4 md:mb-0">
              {/* Renderizar la primera imagen como principal */}
              <img
                src={`http://localhost:8000${producto.imagenes[0]}`}
                alt={producto.titulo}
                className="w-40 h-40 object-cover rounded-lg"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold">{producto.titulo}</h2>
              <p>
                <strong>Cantidad:</strong> {producto.cantidad}
              </p>
              <p>
                <strong>Precio unitario:</strong> ${producto.precio_unitario}
              </p>
              
            </div>
          </li>
        ))}
      </ul>
    </div>
    </Layout>
  );
};

export default DetallePedidoPage;
