import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVentas, updateEstadoPedido, fetchPedidos } from "../redux/slices/pedidoSlice";
import Layout from "../components/layout";
import "toastr/build/toastr.min.css";
import toastr from "toastr";

const MisVentas = () => {
  const dispatch = useDispatch();
  const { ventas, status, error } = useSelector((state) => state.pedido);
  const [expandedPedido, setExpandedPedido] = useState({});
  const [actualizandoEstado, setActualizandoEstado] = useState(false);

  useEffect(() => {
    cargarDatos();
  }, [dispatch]);

  const cargarDatos = async () => {
    await dispatch(fetchVentas());
    await dispatch(fetchPedidos());
  };

  const togglePedidoDetails = (pedidoId) => {
    setExpandedPedido((prev) => ({
      ...prev,
      [pedidoId]: !prev[pedidoId],
    }));
  };

  const pedidosAgrupados = ventas.reduce((acc, venta) => {
    if (!acc[venta.pedido_id]) {
      acc[venta.pedido_id] = [];
    }
    acc[venta.pedido_id].push(venta);
    return acc;
  }, {});

  const handleEstadoChange = async (pedidoId, nuevoEstado) => {
    setActualizandoEstado(true);
    const estadoAnterior = pedidosAgrupados[pedidoId][0].estado;

    try {
      // Actualizar estado optimistamente
      const updatedVentas = ventas.map((venta) =>
        venta.pedido_id === pedidoId ? { ...venta, estado: nuevoEstado } : venta
      );
      dispatch({ type: "pedido/updateVentas", payload: updatedVentas });

      // Realizar la actualización en el servidor
      await dispatch(updateEstadoPedido({ pedidoId, estado: nuevoEstado })).unwrap();
      
      // Recargar datos
      await cargarDatos();
      
      toastr.success(`El estado del pedido #${pedidoId} ha sido actualizado a "${nuevoEstado}".`);
    } catch (error) {
      // Revertir cambios en caso de error
      const revertedVentas = ventas.map((venta) =>
        venta.pedido_id === pedidoId ? { ...venta, estado: estadoAnterior } : venta
      );
      dispatch({ type: "pedido/updateVentas", payload: revertedVentas });
      toastr.error("Error al actualizar el estado del pedido. Inténtalo de nuevo.");
      console.error("Error al actualizar el estado:", error);
    } finally {
      setActualizandoEstado(false);
    }
  };

  return (
    <Layout>
      <div className="bg-gray-100 min-h-screen p-6">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Mis Ventas</h1>

        {status === "loading" && <p>Cargando ventas...</p>}
        {status === "failed" && <p className="text-red-500">{error}</p>}

        {status === "succeeded" && ventas.length === 0 && (
          <p className="text-gray-500">No tienes ventas registradas.</p>
        )}

        {status === "succeeded" && ventas.length > 0 && (
          <div className="space-y-4">
            {Object.entries(pedidosAgrupados).map(([pedidoId, productos]) => {
              const comprador = productos[0].comprador_nombre;
              const compradorEmail = productos[0].comprador_email;
              const estadoPedido = productos[0].estado;

              return (
                <div key={pedidoId} className="bg-white shadow-md rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-lg font-bold text-gray-700">Pedido #{pedidoId}</h2>
                      <p className="text-gray-600 text-sm">
                        Comprador: {comprador} ({compradorEmail})
                      </p>
                      <p className="text-gray-600 text-sm">
                        Estado: <span className="font-bold capitalize">{estadoPedido}</span>
                      </p>
                    </div>
                    <button
                      onClick={() => togglePedidoDetails(pedidoId)}
                      className="text-blue-500 underline hover:text-blue-600"
                    >
                      {expandedPedido[pedidoId] ? "Ocultar detalles" : "Ver detalles"}
                    </button>
                  </div>

                  {expandedPedido[pedidoId] && (
                    <div className="mt-4">
                      <table className="min-w-full table-auto">
                        <thead>
                          <tr className="bg-gray-200 text-gray-700">
                            <th className="py-2 px-4 text-left">Producto</th>
                            <th className="py-2 px-4 text-left">Descripción</th>
                            <th className="py-2 px-4 text-left">Cantidad</th>
                            <th className="py-2 px-4 text-left">Precio Unitario</th>
                          </tr>
                        </thead>
                        <tbody>
                          {productos.map((venta) => (
                            <tr key={venta.producto_id} className="border-t">
                              <td className="py-2 px-4 flex items-center">
                                {venta.producto_imagenes?.length > 0 && (
                                  <img
                                    src={`http://localhost:8000${venta.producto_imagenes[0]}`}
                                    alt={`Imagen de ${venta.producto_titulo}`}
                                    className="w-16 h-16 object-cover rounded-lg mr-2"
                                  />
                                )}
                                <span>{venta.producto_titulo}</span>
                              </td>
                              <td className="py-2 px-4">{venta.producto_descripcion}</td>
                              <td className="py-2 px-4">{venta.cantidad}</td>
                              <td className="py-2 px-4">Bs.{venta.precio_unitario}</td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr className="bg-gray-200 text-gray-700">
                            <td className="py-2 px-4"></td>
                            <td colSpan="2" className="py-2 px-4 text-right font-bold">
                              Total:
                            </td>
                            <td className="py-2 px-2">
                              Bs.
                              {productos
                                .reduce(
                                  (total, venta) => total + venta.precio_unitario * venta.cantidad,
                                  0
                                )
                                .toFixed(2)}
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  )}

                  {estadoPedido !== "cancelado" && estadoPedido !== "completado" && (
                    <div className="mt-4 flex justify-end space-x-2">
                      {estadoPedido !== "enviando" && (
                        <button
                          onClick={() => handleEstadoChange(pedidoId, "enviando")}
                          className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600 transition duration-200"
                          disabled={actualizandoEstado}
                        >
                          {actualizandoEstado ? "Actualizando..." : "Marcar como Enviado"}
                        </button>
                      )}
                      <button
                        onClick={() => handleEstadoChange(pedidoId, "completado")}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-600 transition duration-200"
                        disabled={actualizandoEstado || estadoPedido === "completado"}
                      >
                        {actualizandoEstado ? "Actualizando..." : "Marcar como Completado"}
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MisVentas;