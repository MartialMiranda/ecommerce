import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVentas, updateEstadoPedido } from "../redux/slices/pedidoSlice";
import { Link } from "react-router-dom";

const MisVentas = () => {
  const dispatch = useDispatch();
  const { ventas, status, error } = useSelector((state) => state.pedido);

  useEffect(() => {
    // Obtener las ventas del vendedor al cargar la página
    dispatch(fetchVentas());
  }, [dispatch]);

  const handleEstadoChange = (pedidoId, nuevoEstado) => {
    dispatch(updateEstadoPedido({ pedidoId, estado: nuevoEstado }));
  };

  const [expanded, setExpanded] = useState({});

  const toggleDescription = (pedidoId) => {
    setExpanded((prev) => ({
      ...prev,
      [pedidoId]: !prev[pedidoId],
    }));
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Mis Ventas</h1>

      {status === "loading" && <p>Cargando ventas...</p>}
      {status === "failed" && <p className="text-red-500">{error}</p>}

      {status === "succeeded" && ventas.length === 0 && (
        <p className="text-gray-500">No tienes ventas registradas.</p>
      )}

      {status === "succeeded" && ventas.length > 0 && (
        <table className="min-w-full table-auto bg-white border-collapse shadow-md">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="py-2 px-4 text-left">Producto</th>
            <th className="py-2 px-4 text-left w-[200px]">Descripción</th> {/* Ajustar el ancho de la columna Descripción */}
            <th className="py-2 px-4 text-left">Cantidad</th>
            <th className="py-2 px-4 text-left">Precio Unitario</th>
            <th className="py-2 px-4 text-left">Comprador</th>
            <th className="py-2 px-4 text-left">Estado</th>
            <th className="py-2 px-4 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ventas.map((venta) => (
            <tr key={venta.pedido_id} className="border-t">
              <td className="py-2 px-2">
                {/* Muestra la imagen del producto */}
                {venta.producto_imagenes &&
                  venta.producto_imagenes.length > 0 && (
                    <div className="flex justify-center">
                      {/* Muestra la primera imagen del producto */}
                      <Link to={`/producto/${venta.producto_id}`}>
                        <img
                          src={`http://localhost:8000${venta.producto_imagenes[0]}`} // Mostrar solo la primera imagen
                          alt={`Imagen 1 de ${venta.producto_titulo}`}
                          className="w-full max-w-[150px] h-auto object-cover rounded-lg cursor-pointer hover:scale-105 transition duration-200"
                        />
                      </Link>
                    </div>
                  )}
              </td>
      
              <td className="py-2 px-2">
                <div
                  className={`text-sm text-gray-600 ${
                    expanded[venta.pedido_id] ? "" : "line-clamp-2"
                  }`}
                >
                  {venta.producto_descripcion}
                </div>
                {venta.producto_descripcion.length > 100 && (
                  <button
                    onClick={() => toggleDescription(venta.pedido_id)}
                    className="text-blue-500 text-sm mt-1"
                  >
                    {expanded[venta.pedido_id] ? "Ver menos" : "Ver más..."}
                  </button>
                )}
              </td>
              <td className="py-2 px-4">{venta.cantidad}</td>
              <td className="py-2 px-4">${venta.precio_unitario}</td>
              <td className="py-2 px-4">
                {venta.comprador_nombre} ({venta.comprador_email})
              </td>
              <td className="py-2 px-4">
                <span className="font-bold capitalize">{venta.estado}</span>
              </td>
              <td className="py-2 px-4">
                <button
                  onClick={() =>
                    handleEstadoChange(venta.pedido_id, "enviando")
                  }
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600 transition duration-200"
                  disabled={
                    venta.estado === "enviado" || status === "loading"
                  }
                >
                  Marcar como Enviado
                </button>
                <button
                  onClick={() =>
                    handleEstadoChange(venta.pedido_id, "completado")
                  }
                  className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-600 transition duration-200"
                  disabled={
                    venta.estado === "completado" || status === "loading"
                  }
                >
                  Marcar como Completado
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      )}
    </div>
  );
};

export default MisVentas;
