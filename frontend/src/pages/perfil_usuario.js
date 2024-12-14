import React from 'react'
import { Link } from 'react-router-dom'

const PerfilUsuario = ({ onLogout, user  }) => {
  return (
    <div className="bg-gray-100 min-h-screen p-8">
      {/* Encabezado del Perfil */}
      <div className="bg-blue-500 p-6 rounded-lg shadow-lg">
        <div className="flex items-center space-x-6">
          <img
            src="https://via.placeholder.com/150"
            alt="Foto de perfil"
            className="w-24 h-24 rounded-full border-4 border-white"
          />
          <div>
            <h2 className="text-white text-3xl font-bold">{user.nombre || "Nombre del Usuario"}</h2>
            <p className="text-blue-200 text-sm">{user.email || "usuario@email.com"}</p>
          </div>
        </div>
      </div>

      {/* Sección de Accesos Directos */}
      <div className="mt-8">
        <h3 className="text-gray-700 text-xl font-semibold mb-4">Accesos Rápidos</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Aquí agregamos los accesos directos */}
          <Link
            to="/mis-direcciones"
            className="flex items-center justify-between bg-white p-4 rounded-lg shadow hover:bg-blue-50 transition duration-200"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <span className="text-blue-500 text-xl">📍</span>
              </div>
              <span className="text-gray-800 font-medium">Mis Ubicaciones</span>
            </div>
            <span className="text-blue-500">➡️</span>
          </Link>
         
          <Link
            to="/mis-productos"
            className="flex items-center justify-between bg-white p-4 rounded-lg shadow hover:bg-green-50 transition duration-200"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-green-100 p-3 rounded-full">
                <span className="text-green-500 text-xl">🛒</span>
              </div>
              <span className="text-gray-800 font-medium">Mis Productos</span>
            </div>
            <span className="text-green-500">➡️</span>
          </Link>

          <Link
            to="/pedidos"
            className="flex items-center justify-between bg-white p-4 rounded-lg shadow hover:bg-yellow-50 transition duration-200"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-yellow-100 p-3 rounded-full">
                <span className="text-yellow-500 text-xl">💳</span>
              </div>
              <span className="text-gray-800 font-medium">Mis Pedidos</span>
            </div>
            <span className="text-yellow-500">➡️</span>
          </Link>

          <Link
            to="/historial"
            className="flex items-center justify-between bg-white p-4 rounded-lg shadow hover:bg-purple-50 transition duration-200"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <span className="text-purple-500 text-xl">🕒</span>
              </div>
              <span className="text-gray-800 font-medium">Historial</span>
            </div>
            <span className="text-purple-500">➡️</span>
          </Link>

          <Link
            to="/mis-ventas"
            className="flex items-center justify-between bg-white p-4 rounded-lg shadow hover:bg-purple-50 transition duration-200"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <span className="text-purple-500 text-xl">🕐</span>
              </div>
              <span className="text-gray-800 font-medium">Mis Ventas</span>
            </div>
            <span className="text-purple-500">➡️</span>
          </Link>

          <Link
            to="/configuracion"
            className="flex items-center justify-between bg-white p-4 rounded-lg shadow hover:bg-red-50 transition duration-200"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-red-100 p-3 rounded-full">
                <span className="text-red-500 text-xl">⚙️</span>
              </div>
              <span className="text-gray-800 font-medium">Configuración</span>
            </div>
            <span className="text-red-500">➡️</span>
          </Link>
        </div>
      </div>

      {/* Botón de Cerrar Sesión */}
      <div className="mt-8">
        <button
          onClick={onLogout}
          className="w-full bg-red-500 text-white font-semibold py-3 rounded-lg shadow hover:bg-red-600 transition duration-200"
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  )
}

export default PerfilUsuario
