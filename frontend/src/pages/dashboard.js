import React, { useEffect, useState } from 'react'; // Importa React y sus hooks
import { useDispatch } from 'react-redux'; // Importa useDispatch de Redux
import { fetchProtectedInfo, onLogout } from '../api/auth'; // Importa tus funciones API
import { unauthenticateUser } from '../redux/slices/authSlice'; // Importa la acción de Redux
import Layout from '../components/layout'; // Importa el componente Layout
import PerfilUsuario from './perfil_usuario'; // Importa el componente PerfilUsuario

const Dashboard = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Función para cerrar sesión
  const logout = async () => {
    try {
      await onLogout();
      dispatch(unauthenticateUser());
      localStorage.removeItem('isAuth');
    } catch (error) {
      console.error(error.response || error.message);
    }
  };

  // Función para obtener la información protegida
  const protectedInfo = async () => {
    try {
      const response = await fetchProtectedInfo();
      setUser(response.data.usuario); // Ajusta la propiedad según la respuesta del backend
      setLoading(false);
    } catch (error) {
      console.error("Error al obtener datos protegidos:", error.response || error.message);
      logout();
    }
  };

  useEffect(() => {
    protectedInfo();
  }, []);

  return loading ? (
    <Layout>
      <h1>Cargando...</h1>
    </Layout>
  ) : (
    <div className="bg-gray-100">
      <Layout>
        {/* Pasa los datos del usuario al componente PerfilUsuario */}
        <PerfilUsuario onLogout={logout} user={user} />
      </Layout>
    </div>
  );
};

export default Dashboard;
