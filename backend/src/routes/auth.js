const { Router } = require('express')
const {
  getUsers,
  register,
  login,
  protected,
  logout,
  getProfile,
} = require('../controllers/auth')
const {
  validationMiddleware,
} = require('../middlewares/validations-middleware')
const { registerValidation, loginValidation } = require('../validators/auth')
const { userAuth } = require('../middlewares/auth-middleware')
const router = Router()

router.get('/get-users', getUsers)
router.get('/protected', userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.json({ success: true, usuario: user });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
});
router.get('/perfil', userAuth, getProfile);
router.post('/register', registerValidation, validationMiddleware, register)
router.post('/login', loginValidation, validationMiddleware, login)
router.get('/logout', logout)

module.exports = router