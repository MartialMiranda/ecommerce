import { useState } from 'react';
import { onRegistration, onLogin } from '../api/auth';
import Layout from '../components/layout';
import { useDispatch } from 'react-redux';
import { authenticateUser } from '../redux/slices/authSlice';

const Register = () => {
  const [values, setValues] = useState({
    nombre: '',
    email: '',
    contraseña: '',
    direccion: '',
    telefono: '',
  });
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const dispatch = useDispatch();

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await onRegistration(values);

      setError('');
      setSuccess(data.message);

      await onLogin({ email: values.email, contraseña: values.contraseña });

      dispatch(authenticateUser());
      localStorage.setItem('isAuth', 'true');
    } catch (error) {
      setError(error.response.data.errors[0].msg);
      setSuccess('');
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-screen bg-white mt-2">
        <div className="w-full max-w-lg bg-gray-50 shadow-md rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
            Registro
          </h2>
          <form onSubmit={onSubmit} className="space-y-4">
            {/* Nombre */}
            <div>
              <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
                Nombre Completo
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={values.nombre}
                onChange={onChange}
                placeholder="Jhon Doe"
                required
                className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
              />
            </div>

            {/* Correo */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
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

            {/* Contraseña */}
            <div>
              <label htmlFor="contraseña" className="block text-sm font-medium text-gray-700">
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

            {/* Dirección */}
            <div>
              <label htmlFor="direccion" className="block text-sm font-medium text-gray-700">
                Dirección
              </label>
              <input
                type="text"
                id="direccion"
                name="direccion"
                value={values.direccion}
                onChange={onChange}
                placeholder="Av. Example"
                required
                className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
              />
            </div>

            {/* Teléfono */}
            <div>
              <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">
                Teléfono
              </label>
              <input
                type="text"
                id="telefono"
                name="telefono"
                value={values.telefono}
                onChange={onChange}
                placeholder="75842541"
                required
                className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
              />
            </div>

            {/* Mensajes de error y éxito */}
            {error && <div className="text-red-500 text-sm text-center">{error}</div>}
            {success && <div className="text-green-500 text-sm text-center">{success}</div>}

            {/* Botón de registro */}
            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
              >
                Registrarse
              </button>
            </div>
          </form>

          {/* Inicia sesión */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              ¿Ya tienes una cuenta?{' '}
              <a href="/login" className="text-blue-600 hover:underline">
                Inicia sesión aquí
              </a>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
