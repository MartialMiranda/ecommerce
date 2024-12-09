const express = require('express')
const app = express()
const { PORT, CLIENT_URL } = require('./constants')
const cookieParser = require('cookie-parser')
const passport = require('passport')
const cors = require('cors')
// Importar las rutas de categoría
const categoriaRoutes = require('./routes/categoria');
const db = require('./db');
const productoRoutes = require('./routes/producto');
const direccionEnvioRoutes = require('./routes/direccion_envio');
const usuarioRoutes = require('./routes/usuario');
//const carritoRoutes = require("./routes/carrito");
const carritoRoutes = require('./routes/carritoRoutes');
const pedidoRoutes = require('./routes/pedidoRoutes');

//import passport middleware
require('./middlewares/passport-middleware')

//initialize middlewares
app.use(express.json())
app.use(cookieParser())
app.use(cors({ origin: CLIENT_URL, credentials: true }))
app.use(passport.initialize())

//import routes
const authRoutes = require('./routes/auth')

//initialize routes
app.use('/api', authRoutes)
// Registrar la ruta de categoría
app.use('/api/categorias', categoriaRoutes);
// Registrar la ruta de producto
app.use('/api/productos', productoRoutes);
// Ruta para servir imágenes estáticas
app.use('/uploads', express.static('src/uploads'));
// Registrar la ruta de direccion_envio
app.use('/api/direcciones', direccionEnvioRoutes);
//obtener usuarios perfil
app.use('/api', usuarioRoutes);
//agregar un carrito
//app.use("/api/carrito", carritoRoutes);
//detalle cariito
app.use('/api/carrito', carritoRoutes);
app.use('/api/pedido', pedidoRoutes);

//app start
const appStart = () => {
  try {
    app.listen(PORT, () => {
      console.log(`The app is running at http://localhost:${PORT}`)
    })
  } catch (error) {
    console.log(`Error: ${error.message}`)
  }
}

appStart()
