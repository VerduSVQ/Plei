// usuarioController.js
const initModels = require("../models/init-models.js").initModels;
const sequelize = require('../config/sequelize.js');
const models = initModels(sequelize);
const Usuario = models.usuario;
const { logMensaje } = require('../utils/logger.js');
const Respuesta = require('../utils/respuesta.js');

class UsuarioController {
  // Obtener todos los usuarios
  async getAllUsuario(req, res) {
    try {
      const usuarios = await Usuario.findAll();
      return res.json(Respuesta.exito(usuarios, 'Datos de usuarios recuperados'));
    } catch (error) {
      logMensaje(error);
      return res.status(500).json(Respuesta.error(null, `Error al recuperar datos: ${req.originalUrl}`));
    }
  }

  // Obtener un usuario por ID
  async getUsuarioById(req, res) {
    const { id } = req.params;
    try {
      const usuario = await Usuario.findByPk(id);
      if (!usuario) {
        return res.status(404).json(Respuesta.error(null, 'Usuario no encontrado'));
      }
      return res.json(Respuesta.exito(usuario, 'Usuario recuperado'));
    } catch (error) {
      logMensaje(error);
      return res.status(500).json(Respuesta.error(null, 'Error al obtener el usuario'));
    }
  }

  // Iniciar sesión de usuario
  async loginUsuario(req, res) {
    const { usuario, clave } = req.body;
    try {
      const usuarioLog = await Usuario.findOne({ where: { usuario } });
      if (!usuarioLog) {
        return res.status(404).json(Respuesta.error(null, 'Usuario no encontrado'));
      }
      if (usuarioLog.clave !== clave) {
        return res.status(401).json(Respuesta.error(null, 'Usuario o contraseña incorrecta'));
      }
      return res.status(200).json(Respuesta.exito(usuarioLog, 'Sesión iniciada correctamente'));
    } catch (error) {
      logMensaje(error);
      return res.status(500).json(Respuesta.error(null, 'Error al iniciar sesión'));
    }
  }

  // Crear un nuevo usuario
  async createUsuario(req, res) {
    const { nombre, usuario, clave } = req.body;
    // Verificar campos vacíos
    if (!nombre || !usuario || !clave) {
      return res.status(400).json(Respuesta.error(null, 'No puede haber campos vacíos'));
    }
    try {
      // Verificar si el nombre de usuario ya existe
      const usuarioExistente = await Usuario.findOne({ where: { usuario } });
      if (usuarioExistente) {
        return res.status(200).json(Respuesta.error(null, 'El nombre de usuario ya está en uso'));
      }
      // Crear nuevo usuario
      await Usuario.create({
        nombre,
        usuario,
        clave,
        rol: 'U',
        rangoAsistente: 0,
        rangoOrganizador: 0,
        activo: 1
      });
  
      return res.status(201).json(Respuesta.exito(null, 'Usuario creado con éxito'));
    } catch (error) {
      logMensaje(error);
      return res.status(500).json(Respuesta.error(null, 'Error al crear el usuario'));
    }
  }
  

  // Actualizar un usuario por ID
  async updateUsuario(req, res) {
    const { id } = req.params;
    const { nombre, usuario, clave, rol } = req.body;
    try {
      const usuarioUpdate = await Usuario.findByPk(id);
      if (!usuarioUpdate) {
        return res.status(404).json(Respuesta.error(null, 'Usuario no encontrado'));
      }
      usuarioUpdate.set({ nombre, usuario, clave, rol });
      await usuarioUpdate.save();
      return res.json(Respuesta.exito(usuarioUpdate, 'Usuario actualizado con éxito'));
    } catch (error) {
      logMensaje(error);
      return res.status(500).json(Respuesta.error(null, 'Error al actualizar el usuario'));
    }
  }

  async patchUsuario(req, res) {
    const { id } = req.params;
    const updates = req.body; // Campos a actualizar
    try {
      const usuario = await Usuario.findByPk(id);
      if (!usuario) {
        return res.status(404).json(Respuesta.error(null, 'Usuario no encontrado'));
      }

      // Actualizar los campos enviados en el body
      Object.keys(updates).forEach((key) => {
        usuario[key] = updates[key];
      });

      await usuario.save();

      return res.json(Respuesta.exito(usuario, 'Usuario actualizado parcialmente con éxito'));
    } catch (error) {
      logMensaje(error);
      return res.status(500).json(Respuesta.error(null, 'Error al actualizar parcialmente el usuario'));
    }
  }

  // Eliminar un usuario por ID
  async deleteUsuario(req, res) {
    const { id } = req.params;
    try {
      const usuario = await Usuario.findByPk(id);
      if (!usuario) {
        return res.status(404).json(Respuesta.error(null, 'Usuario no encontrado'));
      }
      await usuario.destroy();
      return res.json(Respuesta.exito(null, 'Usuario eliminado con éxito'));
    } catch (error) {
      logMensaje(error);
      return res.status(500).json(Respuesta.error(null, 'Error al eliminar el usuario'));
    }
  }
}

module.exports = new UsuarioController();
