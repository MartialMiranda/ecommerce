const { body } = require('express-validator')

const crearCategoriaValidation = [
  body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
  body('descripcion').notEmpty().withMessage('La descripción es obligatoria'),
  body('categoriaPadreId')
    .optional({ nullable: true })
    .isInt({ gt: 0 })
    .withMessage('El ID de la categoría padre debe ser un número entero positivo'),
]

module.exports = {
  crearCategoriaValidation,
}
