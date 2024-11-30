const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'ecommerce',
  password: 'root',
  port: 5432,
});

// Manejo de eventos de error en el pool
pool.on('error', (err) => {
  console.error('Error inesperado en el cliente de la base de datos:', err.message);
});

// Exportar la función para consultas
module.exports = {
  query: async (text, params) => {
    try {
      const result = await pool.query(text, params);
      return result;
    } catch (error) {
      console.error('Error ejecutando la consulta:', error.message);
      throw error; // Lanza el error para que pueda manejarse en el controlador
    }
  },
};
