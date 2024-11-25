const { check } = require('express-validator')
const db = require('../db')
const { compare } = require('bcryptjs')

//password
const contraseña = check('contraseña')
  .isLength({ min: 6, max: 15 })
  .withMessage('contraseña has to be between 6 and 15 characters.')

//email
const email = check('email')
  .isEmail()
  .withMessage('Please provide a valid email.')

//check if email exists
const emailExists = check('email').custom(async (value) => {
  const { rows } = await db.query('SELECT * from usuario WHERE email = $1', [
    value,
  ])

  if (rows.length) {
    throw new Error('Email already exists.')
  }
})

//login validation
const loginFieldsCheck = check('email').custom(async (value, { req }) => {
  const usuario = await db.query('SELECT * from usuario WHERE email = $1', [value])

  if (!usuario.rows.length) {
    throw new Error('Email does not exists.')
  }

  const validPassword = await compare(req.body.contraseña, usuario.rows[0].contraseña)

  if (!validPassword) {
    throw new Error('Wrong password')
  }

  req.usuario = usuario.rows[0]
})

module.exports = {
  registerValidation: [email, contraseña, emailExists],
  loginValidation: [loginFieldsCheck],
}
