// localizacionController.js
const initModels = require("../models/init-models.js").initModels;
const sequelize = require('../config/sequelize.js');
const models = initModels(sequelize);
const Localizacion = models.localizacion;
const { logMensaje } = require('../utils/logger');
const Respuesta = require('../utils/respuesta');

class LocalizacionController {

  // Obtener todas las localizaciones
  async getAllLocalizaciones(req, res) {
    try {
      const localizaciones = await Localizacion.findAll();
      return res.json(Respuesta.exito(localizaciones, 'Datos de localizaciones recuperados'));
    } catch (error) {
      logMensaje(error);
      return res.status(500).json(Respuesta.error(null, `Error al recuperar los datos: ${req.originalUrl}`));
    }
  }

  // Obtener una localización por ID
  async getLocalizacionById(req, res) {
    const { idLocalizacion } = req.params;
    try {
      const localizacion = await Localizacion.findByPk(idLocalizacion);
      if (localizacion) {
        return res.json(Respuesta.exito(localizacion, 'Localización recuperada con éxito'));
      } else {
        return res.status(404).json(Respuesta.error(null, 'Localización no encontrada'));
      }
    } catch (error) {
      logMensaje(error);
      return res.status(500).json(Respuesta.error(null, `Error al recuperar los datos: ${req.originalUrl}`));
    }
  }

  // Crear una nueva localización
  async createLocalizacion(req, res) {
    const { nombre, ciudad, provincia, lat, lng } = req.body;
    if (nombre && ciudad && provincia && lat && lng) {
      try {
        await Localizacion.create({ nombre, ciudad, provincia, lat, lng });
        return res.status(201).json(Respuesta.exito(null, 'Localización creada con éxito'));
      } catch (error) {
        logMensaje(error);
        return res.status(500).json(Respuesta.error(null, 'Error al crear la localización'));
      }
    } else {
      return res.status(400).json(Respuesta.error(null, 'No puede haber campos vacíos'));
    }
  }

  // Actualizar una localización por ID
  async updateLocalizacion(req, res) {
    const { idLocalizacion } = req.params;
    const { nombre, ciudad, provincia, coordenadas } = req.body;
    try {
      const localizacion = await Localizacion.findByPk(idLocalizacion);
      if (localizacion) {
        localizacion.set({ nombre, ciudad, provincia, coordenadas });
        await localizacion.save();
        return res.json(Respuesta.exito(localizacion, 'Localización actualizada con éxito'));
      } else {
        return res.status(404).json(Respuesta.error(null, 'Localización no encontrada'));
      }
    } catch (error) {
      logMensaje(error);
      return res.status(500).json(Respuesta.error(null, 'Error al actualizar la localización'));
    }
  }

  // Eliminar una localización por ID
  async deleteLocalizacion(req, res) {
    const { idLocalizacion } = req.params;
    try {
      const localizacion = await Localizacion.findByPk(idLocalizacion);
      if (localizacion) {
        await localizacion.destroy();
        return res.json(Respuesta.exito(null, 'Localización eliminada con éxito'));
      } else {
        return res.status(404).json(Respuesta.error(null, 'Localización no encontrada'));
      }
    } catch (error) {
      logMensaje(error);
      return res.status(500).json(Respuesta.error(null, 'Error al eliminar la localización'));
    }
  }
}

module.exports = new LocalizacionController();
