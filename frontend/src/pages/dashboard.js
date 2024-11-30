import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchProtectedInfo, onLogout } from '../api/auth'
import Layout from '../components/layout'
import { unauthenticateUser } from '../redux/slices/authSlice'
import PerfilUsuario from './perfil_usuario'

const Dashboard = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const [protectedData, setProtectedData] = useState(null)

  // Función para cerrar sesión
  const logout = async () => {
    try {
      // Realizar el logout en el backend
      await onLogout()

      // Limpiar el estado de autenticación en el Redux store
      dispatch(unauthenticateUser())

      // Eliminar el flag de autenticación en el localStorage
      localStorage.removeItem('isAuth')

      // Redirigir al usuario al login o home, dependiendo de tu flujo
      // (por ejemplo, usando history.push o useNavigate en lugar de React Router v6)
    } catch (error) {
      console.log(error.response)
    }
  }

  // Función para obtener la información protegida
  const protectedInfo = async () => {
    try {
      const { data } = await fetchProtectedInfo()

      setProtectedData(data.info)
      setLoading(false)
    } catch (error) {
      logout()  // Si ocurre un error, cerramos sesión
    }
  }

  // useEffect para obtener la información protegida al cargar el componente
  useEffect(() => {
    protectedInfo()
  }, [])

  // Mostrar la interfaz de carga mientras se obtiene la información
  return loading ? (
    <Layout>
      <h1>Cargando...</h1>
    </Layout>
  ) : (
    <div className='bg-gray-100'>
      <Layout>
        {/* Se pasa la función logout como prop al componente PerfilUsuario */}
        <PerfilUsuario onLogout={logout} />        
      </Layout>
    </div>
  )
}

export default Dashboard
