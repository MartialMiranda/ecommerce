const db = require("../db");
const { hash } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const { SECRET } = require("../constants");

exports.getUsers = async (req, res) => {
  try {
    const { rows } = await db.query("select * from usuario");

    return res.status(200).json({
      success: true,
      usuario: rows,
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.register = async (req, res) => {
  const { nombre, email, contraseña, direccion, telefono } = req.body;
  try {
    const hashedPassword = await hash(contraseña, 10);

    await db.query(
      "insert into usuario(nombre, email,contraseña, direccion, telefono) values ($1 , $2, $3, $4, $5)",
      [nombre, email, hashedPassword, direccion, telefono]
    );

    return res.status(201).json({
      success: true,
      message: "The registraion was succefull",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      error: error.message,
    });
  }
};

exports.login = async (req, res) => {
  let usuario = req.usuario;

  let payload = {
    id: usuario.id,
    email: usuario.email,
    nombre: usuario.nombre,
    direccion: usuario.direccion,
    telefono: usuario.telefono,
  };

  try {
    const token = await sign(payload, SECRET, { expiresIn: '3d' });

    // Establecer la cookie con el token
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.SECRET === "production"
    });

    
    return res.status(200).json({
      success: true,
      message: "Logged in successfully",
      data: token,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      error: error.message,
    });
  }
};

exports.protected = async (req, res) => {
  try {
    return res.status(200).json({
      info: "protected info",
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.logout = async (req, res) => {
  try {
    return res.status(200).clearCookie("token", { httpOnly: true }).json({
      success: true,
      message: "Logged out succefully",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      error: error.message,
    });
  }
};

exports.getProfile = (req, res) => {
  try {
    const usuario = req.user; // `req.user` contiene los datos del usuario autenticado

    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    return res.status(200).json({
      success: true,
      usuario, // Devolver los datos del usuario
    });
  } catch (error) {
    console.error("Error al obtener el perfil:", error.message);
    return res.status(500).json({ message: "Error al obtener el perfil", error: error.message });
  }
};

