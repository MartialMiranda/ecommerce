import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getDireccionById,
  updateDireccionById,
} from "../redux/slices/direccionEnvioSlice";

const EditarDireccion = () => {
  const { id } = useParams(); // Obtenemos el id de la dirección de los parámetros de la URL
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Estado local para manejar los campos del formulario
  const [direccion, setDireccion] = useState({
    direccion: "",
    ciudad: "",
    estado: "",
    pais: "",
  });

  const {
    direccion: direccionActual,
    loadingDireccion,
    error,
  } = useSelector((state) => state.direccionEnvio);

  // Cargar los detalles de la dirección al montar el componente
  useEffect(() => {
    if (id) {
      dispatch(getDireccionById(id));
    }
  }, [id, dispatch]);

  // Actualizamos el formulario cuando los datos de la dirección están disponibles
  useEffect(() => {
    if (direccionActual) {
      setDireccion({
        direccion: direccionActual.direccion || "", // Valor por defecto
        ciudad: direccionActual.ciudad || "",
        estado: direccionActual.estado || "",
        pais: direccionActual.pais || "",
      });
    }
  }, [direccionActual]);

  // Manejar cambios en los campos de entrada
  const handleChange = (e) => {
    setDireccion({ ...direccion, [e.target.name]: e.target.value });
  };

  // Manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateDireccionById({ id, direccionData: direccion }));
    navigate("/mis-direcciones");
  };
  

  // Indicadores de estado
  if (loadingDireccion) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
        Editar Dirección
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="direccion"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Dirección
          </label>
          <input
            id="direccion"
            type="text"
            name="direccion"
            placeholder="Dirección"
            value={direccion.direccion}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>
        <div>
          <label
            htmlFor="ciudad"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Ciudad
          </label>
          <input
            id="ciudad"
            type="text"
            name="ciudad"
            placeholder="Ciudad"
            value={direccion.ciudad}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>
        <div>
          <label
            htmlFor="estado"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Estado
          </label>
          <input
            id="estado"
            type="text"
            name="estado"
            placeholder="Estado"
            value={direccion.estado}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>
        <div>
          <label
            htmlFor="pais"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            País
          </label>
          <input
            id="pais"
            type="text"
            name="pais"
            placeholder="País"
            value={direccion.pais}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition duration-300"
        >
          Actualizar
        </button>
      </form>
    </div>
  );
};

export default EditarDireccion;
