backend
npm i bcryptjs cookie-parser cors dotenv express express-validator jsonwebtoken nodemo
n passport passport-jwt pg
nom run dev


frontend
npx create-react-app client --template redux
npm i axios react-router-dom
npm start




estructure:

ecommerce/
│
├── backend/
│   ├── controllers/
│   │   ├── usuarioController.js # Controlador para usuario
│   ├── models/
│   │   ├── dao.js          # Modelo para productos
│   │   ├── usuarioModel.js          # Modelo para usuario
│   ├── routes/
│   │   ├── usuarioRoutes.js    # Rutas para usuario
│   ├── server.js               # Servidor principal de Express
│   ├── package-lock.json
│   ├── package.json
│   └── .env                    # Variables de entorno
│
└── frontend/
    ├── public/
    │   ├── css/                # Archivos CSS
    │   │   └── bootstrap.css
    │   │   └── Site.css
    │   │   └── toastr.css
    │   ├── icons/              # Iconos svg
    │   └── js/                 # Archivos JavaScript
    │       └── bootstrap.js
    │       └── jquery-3.7.1.js
    │       └── toastr.js
    │       └── usuario.js       # js para usuario
    │       └── utiles.js       # Maneja la solicitux Ajax y GetUrlBackend
    ├── views/
    │   ├── login.html           # Vista para login
    │   ├── register.html        # Vista para registro
    │   ├── home.html            # Vista para la página principal
    └── index.html    


📦backend
 ┣ 📂node_modules
 ┣ 📂src
 ┃ ┣ 📂constants
 ┃ ┃ ┗ 📜index.js
 ┃ ┣ 📂controllers
 ┃ ┃ ┣ 📜auth.js
 ┃ ┃ ┣ 📜categoria.js
 ┃ ┃ ┗ 📜producto.js
 ┃ ┣ 📂db
 ┃ ┃ ┗ 📜index.js
 ┃ ┣ 📂middlewares
 ┃ ┃ ┣ 📜auth-middleware.js
 ┃ ┃ ┣ 📜file-upload-middleware.js
 ┃ ┃ ┣ 📜passport-middleware.js
 ┃ ┃ ┗ 📜validations-middleware.js
 ┃ ┣ 📂models
 ┃ ┃ ┣ 📜categoria.js
 ┃ ┃ ┣ 📜imagen_producto.js
 ┃ ┃ ┗ 📜producto.js
 ┃ ┣ 📂routes
 ┃ ┃ ┣ 📜auth.js
 ┃ ┃ ┣ 📜categoria.js
 ┃ ┃ ┗ 📜producto.js
 ┃ ┣ 📂uploads
 ┃ ┃ ┣ 📜imagenes-1732416439444-410757511.jpg
 ┃ ┃ ┣ 📜imagenes-1732416439446-223381772.jpg
 ┃ ┃ ┣ 📜imagenes-1732416629014-829389276.jpg
 ┃ ┃ ┣ 📜imagenes-1732416629015-414924089.jpg
 ┃ ┃ ┗ 📜imagenes-1732416878944-99624235.jpeg
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
 ┃ ┣ 📂public
 ┃ ┣ 📜buy.ico
 ┃ ┣ 📜cart.png
 ┃ ┗ 📜index.html
 ┣ 📂src
 ┃ ┣ 📂api
 ┃ ┃ ┗ 📜auth.js
 ┃ ┣ 📂app
 ┃ ┃ ┗ 📜store.js
 ┃ ┣ 📂components
 ┃ ┃ ┣ 📜Banner.js
 ┃ ┃ ┣ 📜Categorías.js
 ┃ ┃ ┣ 📜Footer.js
 ┃ ┃ ┣ 📜layout.js
 ┃ ┃ ┣ 📜navbar.js
 ┃ ┃ ┣ 📜ProductCard.js
 ┃ ┃ ┣ 📜ProductosDestacados.js
 ┃ ┃ ┗ 📜Slider.js
 ┃ ┣ 📂features
 ┃ ┃ ┗ 📂counter
 ┃ ┃ ┃ ┣ 📜Counter.js
 ┃ ┃ ┃ ┣ 📜Counter.module.css
 ┃ ┃ ┃ ┣ 📜counterAPI.js
 ┃ ┃ ┃ ┣ 📜counterSlice.js
 ┃ ┃ ┃ ┗ 📜counterSlice.spec.js
 ┃ ┣ 📂pages
 ┃ ┃ ┣ 📜dashboard.js
 ┃ ┃ ┣ 📜home.js
 ┃ ┃ ┣ 📜login.js
 ┃ ┃ ┗ 📜register.js
 ┃ ┣ 📂redux
 ┃ ┃ ┣ 📂slices
 ┃ ┃ ┃ ┗ 📜authSlice.js
 ┃ ┃ ┗ 📜store.js
 ┃ ┣ 📜App.js
 ┃ ┣ 📜index.js
 ┃ ┣ 📜input.css
 ┃ ┗ 📜output.css
 ┣ 📜.gitignore
 ┣ 📜package-lock.json
 ┣ 📜package.json
 ┣ 📜README.md
 ┗ 📜tailwind.config.js