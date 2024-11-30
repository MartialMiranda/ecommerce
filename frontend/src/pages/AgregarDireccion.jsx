import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createDireccion } from "../redux/slices/direccionEnvioSlice";
import { useNavigate } from "react-router-dom";

const AgregarDireccion = () => {
  const [direccion, setDireccion] = useState({
    direccion: "",
    ciudad: "",
    estado: "",
    pais: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setDireccion({ ...direccion, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createDireccion(direccion));
    navigate("/mis-direcciones");
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Agregar Dirección</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="direccion" className="block text-sm font-medium text-gray-600 mb-1">
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
          <label htmlFor="ciudad" className="block text-sm font-medium text-gray-600 mb-1">
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
          <label htmlFor="estado" className="block text-sm font-medium text-gray-600 mb-1">
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
          <label htmlFor="pais" className="block text-sm font-medium text-gray-600 mb-1">
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
          Guardar
        </button>
      </form>
    </div>
  );
};

export default AgregarDireccion;
