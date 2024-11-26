import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const { isAuth } = useSelector((state) => state.auth);

  return (
    <nav className="bg-white shadow-md w-full z-50">
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
              placeholder="Search..."
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
        <div className="flex items-center space-x-4">
          <NavLink
            to="/categories"
            className="text-gray-700 hover:text-blue-500 font-medium text-sm transition"
          >
            Categories
          </NavLink>
          <NavLink
            to="/cart"
            className="relative text-gray-700 hover:text-blue-500 font-medium text-sm transition"
          >
            Cart
            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-2 shadow-md">
              3
            </span>
          </NavLink>
          {isAuth ? (
            <NavLink
              to="/profile"
              className="text-gray-700 hover:text-blue-500 font-medium text-sm transition"
            >
              Profile
            </NavLink>
          ) : (
            <>
              <NavLink
                to="/login"
                className="text-gray-700 hover:text-blue-500 font-medium text-sm transition"
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="text-gray-700 hover:text-blue-500 font-medium text-sm transition"
              >
                Register
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
            placeholder="Search..."
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
