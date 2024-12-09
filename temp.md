backend
npm i bcryptjs cookie-parser cors dotenv express express-validator jsonwebtoken nodemo
n passport passport-jwt pg
nom run dev


frontend
npx create-react-app client --template redux
npm i axios react-router-dom
npm start




estructure:

📦backend
 ┣ 📂node_modules
 ┣ 📂src
 ┃ ┣ 📂constants
 ┃ ┃ ┗ 📜index.js
 ┃ ┣ 📂controllers
 ┃ ┃ ┣ 📜auth.js
 ┃ ┃ ┣ 📜categoria.js
 ┃ ┃ ┣ 📜direccion_envio.js
 ┃ ┃ ┗ 📜producto.js
 ┃ ┣ 📂dao
 ┃ ┃ ┗ 📜baseDao.js
 ┃ ┣ 📂db
 ┃ ┃ ┗ 📜index.js
 ┃ ┣ 📂middlewares
 ┃ ┃ ┣ 📜auth-middleware.js
 ┃ ┃ ┣ 📜file-upload-middleware.js
 ┃ ┃ ┣ 📜passport-middleware.js
 ┃ ┃ ┗ 📜validations-middleware.js
 ┃ ┣ 📂models
 ┃ ┃ ┣ 📜categoria.js
 ┃ ┃ ┣ 📜detalle_pedido.js
 ┃ ┃ ┣ 📜direccion_envio.js
 ┃ ┃ ┣ 📜favorito.js
 ┃ ┃ ┣ 📜imagen_producto.js
 ┃ ┃ ┣ 📜pedido.js
 ┃ ┃ ┗ 📜producto.js
 ┃ ┣ 📂routes
 ┃ ┃ ┣ 📜auth.js
 ┃ ┃ ┣ 📜categoria.js
 ┃ ┃ ┣ 📜direccion_envio.js
 ┃ ┃ ┗ 📜producto.js
 ┃ ┣ 📂uploads
 ┃ ┃ ┣ 📜imagenes-1732416439444-410757511.jpg
 ┃ ┃ ┣ 📜imagenes-1732416439446-223381772.jpg
 ┃ ┣ 📂utils
 ┃ ┣ 📂validators
 ┃ ┃ ┣ 📜auth.js
 ┃ ┃ ┗ 📜categoria.js
 ┃ ┗ 📜index.js
 ┣ 📜.env
 ┣ 📜.gitignore
 ┣ 📜database.sql
 ┣ 📜package-lock.json
 ┣ 📜package.json
 ┗ 📜server.js

📦frontend
 ┣ 📂public
 ┃ ┣ 📜buy.ico
 ┃ ┣ 📜cart.png
 ┃ ┗ 📜index.html
 ┣ 📂src
 ┃ ┣ 📂api
 ┃ ┃ ┣ 📜auth.js
 ┃ ┃ ┣ 📜carrito.js
 ┃ ┃ ┣ 📜direcciones.js
 ┃ ┃ ┣ 📜productos.js
 ┃ ┃ ┗ 📜usuarios.js
 ┃ ┣ 📂components
 ┃ ┃ ┣ 📜Banner.js
 ┃ ┃ ┣ 📜Categorías.js
 ┃ ┃ ┣ 📜Footer.js
 ┃ ┃ ┣ 📜layout.js
 ┃ ┃ ┣ 📜navbar.js
 ┃ ┃ ┣ 📜ProductoCard.jsx
 ┃ ┃ ┣ 📜ProductoDetalles.jsx
 ┃ ┃ ┣ 📜ProductosDestacados.js
 ┃ ┃ ┣ 📜shoppingCart.jsx
 ┃ ┃ ┗ 📜Slider.jsx
 ┃ ┣ 📂features
 ┃ ┃ ┗ 📂counter
 ┃ ┃ ┃ ┣ 📜Counter.js
 ┃ ┃ ┃ ┣ 📜Counter.module.css
 ┃ ┃ ┃ ┣ 📜counterAPI.js
 ┃ ┃ ┃ ┣ 📜counterSlice.js
 ┃ ┃ ┃ ┗ 📜counterSlice.spec.js
 ┃ ┣ 📂pages
 ┃ ┃ ┣ 📜AgregarDireccion.jsx
 ┃ ┃ ┣ 📜AgregarProducto.jsx
 ┃ ┃ ┣ 📜dashboard.js
 ┃ ┃ ┣ 📜EditarDireccion.js
 ┃ ┃ ┣ 📜EditarProducto.js
 ┃ ┃ ┣ 📜home.js
 ┃ ┃ ┣ 📜login.js
 ┃ ┃ ┣ 📜MisDirecciones.jsx
 ┃ ┃ ┣ 📜MisProductos.jsx
 ┃ ┃ ┣ 📜perfil_usuario.js
 ┃ ┃ ┣ 📜ProductoDetallesPage.jsx
 ┃ ┃ ┗ 📜register.js
 ┃ ┣ 📂redux
 ┃ ┃ ┣ 📂slices
 ┃ ┃ ┃ ┣ 📜authSlice.js
 ┃ ┃ ┃ ┣ 📜carritoSlice.js
 ┃ ┃ ┃ ┣ 📜direccionEnvioSlice.js
 ┃ ┃ ┃ ┗ 📜productoSlice.js
 ┃ ┃ ┗ 📜store.js
 ┃ ┣ 📜App.js
 ┃ ┣ 📜index.js
 ┃ ┣ 📜input.css
 ┃ ┣ 📜output.css
 ┃ ┗ 📜styles.css
 ┣ 📜.gitignore
 ┣ 📜package-lock.json
 ┣ 📜package.json
 ┣ 📜README.md
 ┗ 📜tailwind.config.js