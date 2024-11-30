const passport = require('passport')
const { Strategy } = require('passport-jwt')
const { SECRET } = require('../constants')
const db = require('../db')

const cookieExtractor = (req) => {
  console.log("Cookies recibidas:", req.cookies);
  let token = null;
  if (req && req.cookies) token = req.cookies['token'];
  console.log("Token extraído:", token);
  return token;
};



const opts = {
  secretOrKey: SECRET,
  jwtFromRequest: cookieExtractor,
}

passport.use(
  new Strategy(opts, async (payload, done) => {
      console.log("Payload recibido:", payload);
      try {
          const { rows } = await db.query(
              'SELECT id, email FROM usuario WHERE id = $1',
              [payload.id]
          );
          if (!rows.length) {
              return done(null, false);
          }
          return done(null, { id: rows[0].id, email: rows[0].email });
      } catch (error) {
        console.error("Error en autenticación:", error.message);
        return done(error, false); // Pasar el error al callback
    }
    
  })
);


