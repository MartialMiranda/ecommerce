import {
  BrowserRouter,
  Navigate,
  Routes,
  Route,
  Outlet,
} from 'react-router-dom';
import Dashboard from './pages/dashboard';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import ProductoDetallesPage from './pages/ProductoDetallesPage';
import AgregarDireccion from './pages/AgregarDireccion';
import MisDirecciones from './pages/MisDirecciones';
import { useSelector } from 'react-redux';
import EditarDireccion from './pages/EditarDireccion';

const PrivateRoutes = () => {
  const { isAuth } = useSelector((state) => state.auth);

  return <>{isAuth ? <Outlet /> : <Navigate to="/login" />}</>;
};

const RestrictedRoutes = () => {
  const { isAuth } = useSelector((state) => state.auth);

  return <>{!isAuth ? <Outlet /> : <Navigate to="/dashboard" />}</>;
};

const App = () => {
  return (
    <div className="bg-white">
      <BrowserRouter>
        <Routes>
          {/* Página principal */}
          <Route path="/" element={<Home />} />

          {/* Detalles del producto (ruta pública) */}
          <Route path="/producto/:id" element={<ProductoDetallesPage />} />

          {/* Rutas privadas */}
          <Route element={<PrivateRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/agregar-direccion" element={<AgregarDireccion />} />
            <Route path="/mis-direcciones" element={<MisDirecciones />} />
            <Route path="/editar-direccion/:id" element={<EditarDireccion />} />
          </Route>

          {/* Rutas restringidas */}
          <Route element={<RestrictedRoutes />}>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
