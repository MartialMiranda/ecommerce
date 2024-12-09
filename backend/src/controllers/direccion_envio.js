// src/controllers/direccion_envio.js
const DireccionEnvio = require('../models/direccion_envio');

const DireccionEnvioController = {
    getAll: async (req, res) => {
        //console.log('Request headers:', req.headers);
        try {
            // Con tu configuración de Passport, req.user ya está disponible
            const usuarioId = req.user.id;
            
            //console.log('Obteniendo direcciones para usuario:', usuarioId);
            
            const direcciones = await DireccionEnvio.getAll(usuarioId);
            
            //console.log('Direcciones encontradas:', direcciones);
            
            res.json(direcciones);
        } catch (error) {
            console.error('Error al obtener direcciones:', error);
            res.status(500).json({ 
                error: 'Error al obtener direcciones de envío',
                detalle: error.message 
            });
        }
    },
    
    create : async (req, res) => {
        const { direccion, ciudad, estado, pais } = req.body;
        const usuario_id = req.user.id; // Obtén el id del usuario autenticado
      
        try {
          const nuevaDireccion = await DireccionEnvio.create({
            usuario_id,
            direccion,
            ciudad,
            estado,
            pais,
          });
      
          return res.status(201).json(nuevaDireccion);
        } catch (error) {
          console.error(error);
          return res.status(500).json({ error: 'Error al crear la dirección' });
        }
    },
    
    update: async (req, res) => {
        const { id } = req.params;
        try {
            // Verificar que la dirección pertenezca al usuario
            const direccionExistente = await DireccionEnvio.getById(id);
            
            if (!direccionExistente || direccionExistente.usuario_id !== req.user.id) {
                return res.status(403).json({ error: 'No autorizado para modificar esta dirección' });
            }
            
            const direccionActualizada = await DireccionEnvio.update(id, req.body);
            
            res.json(direccionActualizada);
        } catch (error) {
            console.error('Error al actualizar dirección:', error);
            res.status(500).json({ 
                error: 'Error al actualizar la dirección de envío',
                detalle: error.message 
            });
        }
    },
    
    delete: async (req, res) => {
        const { id } = req.params;
        try {
            // Verificar que la dirección pertenezca al usuario
            const direccionExistente = await DireccionEnvio.getById(id);
            
            if (!direccionExistente || direccionExistente.usuario_id !== req.user.id) {
                return res.status(403).json({ error: 'No autorizado para eliminar esta dirección' });
            }
            
            const resultado = await DireccionEnvio.delete(id);
            
            res.json(resultado);
        } catch (error) {
            console.error('Error al eliminar dirección:', error);
            res.status(500).json({ 
                error: 'Error al eliminar la dirección de envío',
                detalle: error.message 
            });
        }
    },
    
    getById: async (req, res) => {
        const { id } = req.params;
        try {
            const direccion = await DireccionEnvio.getById(id);
            
            // Verificar que la dirección pertenezca al usuario
            if (!direccion || direccion.usuario_id !== req.user.id) {
                return res.status(403).json({ error: 'No autorizado para ver esta dirección' });
            }
            
            res.json(direccion);
        } catch (error) {
            console.error('Error al obtener dirección:', error);
            res.status(500).json({ 
                error: 'Error al obtener la dirección de envío',
                detalle: error.message 
            });
        }
    }
};

module.exports = DireccionEnvioController;