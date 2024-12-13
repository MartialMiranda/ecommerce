import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  ShoppingCart,
  User,
} from "lucide-react";

const Navbar = () => {
  const { isAuth } = useSelector((state) => state.auth);
  const { productos } = useSelector((state) => state.carrito);

  return (
    <nav className="fixed bg-white shadow-md w-full z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <NavLink to="/" className="flex items-center">
          <h1 className="text-3xl font-bold text-gray-800 hover:text-blue-500 transition">
            E-Commerce
          </h1>
        </NavLink>

        {/* Minimal Search */}
        <div className="hidden md:flex flex-1 mx-6">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Buscar productos..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="absolute inset-y-0 left-3 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-4.35-4.35M10 18a8 8 0 110-16 8 8 0 010 16z"
                />
              </svg>
            </span>
          </div>
        </div>

        {/* Navigation links */}
        <div className="flex items-center space-x-6">
          {isAuth ? (
            <>
              <NavLink
                to="/agregar-producto"
                className="text-gray-700 hover:text-blue-500 font-medium text-sm transition"
              >
                Agregar Producto
              </NavLink>

              <NavLink
                to="/mis-direcciones"
                className="text-gray-700 hover:text-blue-500 font-medium text-sm transition"
              >
                Mis Direcciones
              </NavLink>
              <NavLink
                to="/dashboard"
                className="text-gray-700 hover:text-blue-500 font-medium text-sm transition"
              >
                <User className="w-6 h-6 text-gray-700 hover:text-blue-500 transition" />
              </NavLink>
              <NavLink to="/carrito" className="relative flex items-center">
                <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-blue-500 transition" />
                {productos.length >= 0 && (
                  <span className="absolute -top-4 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-1 shadow-lg">
                    {productos.length}
                  </span>
                )}
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className="text-gray-700 hover:text-blue-500 font-medium text-sm transition"
              >
                Iniciar Sesión
              </NavLink>
              <NavLink
                to="/register"
                className="text-gray-700 hover:text-blue-500 font-medium text-sm transition"
              >
                Registrarse
              </NavLink>
            </>
          )}
        </div>
      </div>

      {/* Mobile Search */}
      <div className="md:hidden px-4 py-3">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Buscar..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="absolute inset-y-0 left-3 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35M10 18a8 8 0 110-16 8 8 0 010 16z"
              />
            </svg>
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
