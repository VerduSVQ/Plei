// asistenciaController.js
const initModels = require("../models/init-models.js").initModels;
const sequelize = require('../config/sequelize.js');
const models = initModels(sequelize);
const Asistencia = models.asistencia;
const { logMensaje } = require('../utils/logger');
const Respuesta = require('../utils/respuesta');

class AsistenciaController {


  // Obtener asistencias de un evento específico
  async getAsistenciasByEvento(req, res) {
    const idEvento = req.params.idEvento;
    try {
      const asistencias = await Asistencia.findAll({ where: { idEvento } });
      return res.json(Respuesta.exito(asistencias, 'Asistencias del usuario recuperadas'));
    } catch (error) {
      logMensaje(error);
      return res.status(500).json(Respuesta.error(null, `Error al recuperar los datos: ${req.originalUrl}`));
    }
  }
  async getAsistenciasUsuario(req, res) {
    const idUser = req.params.id;
    try {
      const asistencias = await Asistencia.findAll({ where: { idUser } });
      return res.json(Respuesta.exito(asistencias, 'Asistencias del usuario recuperadas'));
    } catch (error) {
      logMensaje(error);
      return res.status(500).json(Respuesta.error(null, `Error al recuperar los datos: ${req.originalUrl}`));
    }
  }

  // Crear una nueva asistencia (registrar asistencia de un usuario a un evento)
  async createAsistencia(req, res) {
    const { idUser, idEvento } = req.params;
  
    if (idUser && idEvento) {
      try {
        // Verificar si ya existe una asistencia para el usuario y evento
        const asistenciaExistente = await Asistencia.findOne({
          where: { idEvento, idUser },
        });
  
        if (asistenciaExistente) {
          // Si ya existe, devolver un mensaje indicando duplicado
          return res.status(409).json(Respuesta.error(null, 'Ya estás apuntado a este evento.'));
        }
  
        // Crear una nueva asistencia si no existe
        await Asistencia.create({ idEvento, idUser });
        return res.status(201).json(Respuesta.exito(null, 'Asistencia registrada con éxito'));
      } catch (error) {
        logMensaje(error);
        return res.status(500).json(Respuesta.error(null, 'Error al registrar la asistencia'));
      }
    } else {
      return res.status(400).json(Respuesta.error(null, 'No puede haber campos vacíos'));
    }
  }
  

  async checkAsistencia(req, res) {
    const { idEvento, idUser } = req.params;
  
    try {
      // Buscamos si existe una entrada de asistencia con los ids de evento y usuario
      const asistencia = await Asistencia.findOne({
        where: { idEvento, idUser }
      });
  
      if (asistencia) {
        // Si ya está apuntado
        return res.status(200).json({ ok: true, mensaje: 'Ya estás apuntado a este evento.' });
      } else {
        // Si no está apuntado
        return res.status(404).json({ ok: false, mensaje: 'No estás apuntado a este evento.' });
      }
    } catch (error) {
      return res.status(500).json({ ok: false, mensaje: 'Error al comprobar la asistencia.' });
    }
  }
  

  // Eliminar una asistencia (cancelar la asistencia de un usuario a un evento)
  async deleteAsistencia(req, res) {
    const { idUser, idEvento } = req.params;
    try {
      const asistencia = await Asistencia.findOne({ where: { idUser, idEvento } });
      if (asistencia) {
        await asistencia.destroy();
        return res.json(Respuesta.exito(null, 'Asistencia eliminada con éxito'));
      } else {
        return res.status(404).json(Respuesta.error(null, 'Asistencia no encontrada'));
      }
    } catch (error) {
      logMensaje(error);
      return res.status(500).json(Respuesta.error(null, 'Error al eliminar la asistencia'));
    }
  }
}

module.exports = new AsistenciaController();
