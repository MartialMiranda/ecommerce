import { useState } from 'react';
import { onLogin } from '../api/auth';
import Layout from '../components/layout';
import { useDispatch } from 'react-redux';
import { authenticateUser } from '../redux/slices/authSlice';

const Login = () => {
  const [values, setValues] = useState({
    email: '',
    contraseña: '',
  });
  const [error, setError] = useState(false);

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const dispatch = useDispatch();
  const onSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const data = await onLogin(values); // Esto enviará la solicitud al backend
      const userData = data.data; // Obtén los datos del usuario del backend
      localStorage.setItem('token', userData.token); // Almacena el token en localStorage
      dispatch(authenticateUser(userData)); // Almacena los datos del usuario en Redux
      localStorage.setItem('isAuth', 'true'); // Marca al usuario como autenticado
      setError('');
    } catch (error) {
      setError(error.response?.data?.errors[0]?.msg || 'An error occurred');
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-screen bg-white mt-2">
        <div className="w-full max-w-md bg-gray-50 shadow-md rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
            Iniciar Sesión
          </h2>
          <form onSubmit={onSubmit} className="space-y-6">
            {/* Campo de correo electrónico */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Correo Electrónico
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={values.email}
                onChange={onChange}
                placeholder="test@gmail.com"
                required
                className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
              />
            </div>

            {/* Campo de contraseña */}
            <div>
              <label
                htmlFor="contraseña"
                className="block text-sm font-medium text-gray-700"
              >
                Contraseña
              </label>
              <input
                type="password"
                id="contraseña"
                name="contraseña"
                value={values.contraseña}
                onChange={onChange}
                placeholder="••••••••"
                required
                className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
              />
            </div>

            {/* Error */}
            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}

            {/* Botón de inicio de sesión */}
            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
              >
                Iniciar Sesión
              </button>
            </div>
          </form>

          {/* Registro */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              ¿No tienes una cuenta?{' '}
              <a
                href="/register"
                className="text-blue-600 hover:underline"
              >
                Regístrate aquí
              </a>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
