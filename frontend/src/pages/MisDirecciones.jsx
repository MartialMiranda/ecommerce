import React, { useEffect, useState  } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDirecciones,
  deleteDireccionById,
} from "../redux/slices/direccionEnvioSlice";
import { Link } from "react-router-dom";
import Layout from "../components/layout";

const MisDirecciones = () => {
  const dispatch = useDispatch();
  const { direcciones, loading, error } = useSelector(
    (state) => state.direccionEnvio
  );  

  useEffect(() => {
    dispatch(getDirecciones());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de eliminar esta dirección?")) {
      dispatch(deleteDireccionById(id));
    }
  };

  if (loading)
    return (
      <p className="text-center text-blue-500 font-bold mt-4">Cargando...</p>
    );
  if (error)
    return (
      <p className="text-center text-red-500 font-bold mt-4">Error: {error}</p>
    );

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md mt-4 ">
        <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">
          Mis Direcciones
        </h2>
        <Link
          to="/agregar-direccion"
          className="inline-block px-4 py-2 bg-green-500 text-white font-bold rounded-lg shadow hover:bg-green-600 transition duration-300 mb-4"
        >
          + Agregar Dirección
        </Link>
        <ul className="space-y-4">
          {direcciones.map((direccion) => (
            <li
              key={direccion.id}
              className="flex justify-between items-center p-4 bg-white rounded-lg shadow hover:shadow-lg transition duration-300"
            >
              <div className="flex flex-col">
                <span className="text-lg font-medium text-gray-800">
                  {direccion.direccion}, {direccion.ciudad}
                </span>
                <span className="text-sm text-gray-500">
                  Estado: {direccion.estado}
                </span>
                <span className="text-sm text-gray-500">
                  Pais: {direccion.pais}
                </span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleDelete(direccion.id)}
                  className="px-3 py-1 bg-red-500 text-white text-sm font-semibold rounded-lg hover:bg-red-600 transition duration-300"
                >
                  Eliminar
                </button>
                <Link
                  to={`/editar-direccion/${direccion.id}`}
                  className="px-3 py-1 bg-blue-500 text-white text-sm font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
                >
                  Editar
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
};

export default MisDirecciones;
