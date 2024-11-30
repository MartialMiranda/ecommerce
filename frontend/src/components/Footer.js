import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-10 w-full mt-6">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About Section */}
        <div>
          <h3 className="text-xl font-bold mb-4">About Us</h3>
          <p className="text-gray-300">
            E-Commerce is your one-stop shop for the best deals on products.
            Find electronics, clothing, home essentials, and more at unbeatable
            prices.
          </p>
        </div>

        {/* Links Section */}
        <div>
          <h3 className="text-xl font-bold mb-4">Accesos rapidos</h3>
          <ul className="space-y-2">
            <li>
              <NavLink to="/" className="hover:underline">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/categories" className="hover:underline">
                Categories
              </NavLink>
            </li>
            <li>
              <NavLink to="/login" className="hover:underline">
                Login
              </NavLink>
            </li>
            <li>
              <NavLink to="/register" className="hover:underline">
                Register
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="text-xl font-bold mb-4">Contactanos</h3>
          <p className="text-gray-300">Email: support@ecommerce.com</p>
          <p className="text-gray-300">Phone: +591 75365814</p>
          <p className="text-gray-300">
            Direccion: 123 E-Commerce, Santa cruz, Bolivia
          </p>
        </div>

        {/* Social Media Section */}
        <div>
          <h3 className="text-xl font-bold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="text-blue-500 hover:text-blue-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 4.556c-.883.392-1.83.656-2.828.775a4.918 4.918 0 002.164-2.724 9.84 9.84 0 01-3.127 1.194A4.916 4.916 0 0016.616 3a4.92 4.92 0 00-4.897 4.896c0 .383.045.76.127 1.124A13.978 13.978 0 011.67 3.149a4.918 4.918 0 00-.667 2.466 4.92 4.92 0 002.19 4.107 4.903 4.903 0 01-2.229-.616v.062c0 2.386 1.697 4.373 3.946 4.825a4.936 4.936 0 01-2.224.084c.63 1.953 2.46 3.375 4.622 3.412a9.867 9.867 0 01-6.102 2.105c-.397 0-.788-.023-1.175-.068a13.947 13.947 0 007.557 2.212c9.054 0 14.002-7.498 14.002-13.986 0-.213-.005-.425-.014-.636a10.012 10.012 0 002.46-2.548z" />
              </svg>
            </a>
            <a href="#" className="text-blue-700 hover:text-blue-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19.633 3H4.367A1.37 1.37 0 003 4.37v15.263A1.37 1.37 0 004.367 21h15.266A1.37 1.37 0 0021 19.633V4.37A1.37 1.37 0 0019.633 3zm-8.276 15.105h-2.413v-6.83h2.413v6.83zm-1.208-7.717c-.802 0-1.454-.652-1.454-1.455 0-.802.652-1.454 1.454-1.454.802 0 1.454.652 1.454 1.454 0 .803-.652 1.455-1.454 1.455zm9.287 7.717h-2.413v-3.713c0-.889-.318-1.495-1.11-1.495-.604 0-.964.406-1.122.8-.058.138-.073.33-.073.522v3.886h-2.413s.031-6.309 0-6.83h2.413v.967c.321-.495.895-1.198 2.176-1.198 1.587 0 2.774 1.037 2.774 3.263v3.798z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
