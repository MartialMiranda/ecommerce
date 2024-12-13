import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCarrito } from "../redux/slices/carritoSlice";
import { createPedido } from "../redux/slices/pedidoSlice";
import { getDirecciones } from "../redux/slices/direccionEnvioSlice";
import { useNavigate } from "react-router-dom";

const PedidoPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productos } = useSelector((state) => state.carrito);
  const { status, error } = useSelector((state) => state.pedido);
  const {
    direcciones,
    loading: loadingDirecciones,
    error: errorDirecciones,
  } = useSelector((state) => state.direccionEnvio);

  const [direccionSeleccionada, setDireccionSeleccionada] = useState("");
  const [metodoEnvio, setMetodoEnvio] = useState("Envio Exprés");
  const [costoEnvio, setCostoEnvio] = useState(100.0);

  useEffect(() => {
    dispatch(fetchCarrito());
    dispatch(getDirecciones());
  }, [dispatch]);

  const handleDireccionChange = (e) => {
    setDireccionSeleccionada(e.target.value);
  };

  const handleMetodoEnvioChange = (e) => {
    const metodoSeleccionado = e.target.value;
    setMetodoEnvio(metodoSeleccionado);
    // Cambiar el costo de envío según el método seleccionado
    switch (metodoSeleccionado) {
      case "Envio Exprés":
        setCostoEnvio(100.0);
        break;
      case "Envio Estándar":
        setCostoEnvio(50.0);
        break;      
      default:
        setCostoEnvio(0.0);
        break;
    }
  };

  const handleCrearPedido = async () => {
    if (!direccionSeleccionada) {
      alert("Por favor, selecciona una dirección de envío.");
      return;
    }

    try {
      const pedidoData = {
        direccionEnvioId: parseInt(direccionSeleccionada, 10),  // Convierte a número
        metodoEnvio: metodoEnvio,
        costoEnvio: parseFloat(costoEnvio),  // Convierte a número
      };

      console.log("Pedido Data to Dispatch:", pedidoData);

      const result = await dispatch(createPedido(pedidoData)).unwrap();
      console.log("Dispatch Result:", result);

      alert("Pedido creado exitosamente.");
      navigate("/confirmacion-pedido");
    } catch (error) {
      console.error("Error al crear el pedido", error);
      alert(`Ocurrió un error al crear el pedido: ${error}`);
    }
  };

  if (!productos || productos.length === 0)
    return <div className="text-center">El carrito está vacío.</div>;

  const totalProductos = productos.reduce(
    (acc, prod) => acc + parseFloat(prod.precio) * prod.cantidad,
    0
  );

  const totalPedido = totalProductos + costoEnvio;

  return (
    <div className="pedido-page p-6">
      <h1 className="text-2xl font-bold mb-4">Realizar Pedido</h1>

      {/* Dirección de Envío */}
      <div className="direccion-envio mb-4">
        <label
          htmlFor="direccion"
          className="block text-lg font-medium text-gray-700 mb-2"
        >
          Selecciona tu Dirección de Envío
        </label>
        {loadingDirecciones ? (
          <p>Cargando direcciones...</p>
        ) : errorDirecciones ? (
          <p className="text-red-500">
            Error al cargar direcciones: {errorDirecciones}
          </p>
        ) : (
          <select
            id="direccion"
            value={direccionSeleccionada}
            onChange={handleDireccionChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Selecciona una dirección</option>
            {direcciones.map((direccion) => (
              <option key={direccion.id} value={direccion.id}>
                {`${direccion.direccion}, ${direccion.ciudad}, ${direccion.estado}, ${direccion.pais}`}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Métodos de Envío */}
      <div className="metodo-envio mb-4">
        <label
          htmlFor="metodoEnvio"
          className="block text-lg font-medium text-gray-700 mb-2"
        >
          Selecciona tu Método de Envío
        </label>
        <select
          id="metodoEnvio"
          value={metodoEnvio}
          onChange={handleMetodoEnvioChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Envio Exprés">Envio Exprés - Bs.100.00</option>
          <option value="Envio Estándar">Envio Estándar - Bs.50.00</option>          
        </select>
      </div>

      {/* Resumen del Pedido */}
      <div className="productos bg-gray-100 p-4 rounded-lg shadow-md mb-4">
        <h2 className="text-xl font-semibold mb-2">Resumen del Pedido</h2>
        <ul>
          {productos.map((producto) => (
            <li key={producto.id} className="flex justify-between mb-2">
              <span>{producto.titulo}</span>
              <span>
                {producto.cantidad} x Bs.{parseFloat(producto.precio).toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
        <p className="text-right font-bold mt-2">
          Total productos: Bs.{totalProductos.toFixed(2)}
        </p>
        <p className="text-right font-bold">
          Costo de envío: Bs.{costoEnvio.toFixed(2)}
        </p>
        <p className="text-right font-bold mt-2">
          Total Pedido: Bs.{totalPedido.toFixed(2)}
        </p>
      </div>

      {/* Confirmar Pedido */}
      <button
        onClick={handleCrearPedido}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
      >
        Confirmar Pedido
      </button>

      {status === "loading" && (
        <p className="text-center mt-4">Procesando pedido...</p>
      )}
      {error && <p className="text-center text-red-500 mt-4">Error: {error}</p>}
    </div>
  );
};

export default PedidoPage;
