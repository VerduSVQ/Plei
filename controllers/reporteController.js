// reporteController.js
const initModels = require("../models/init-models.js").initModels;
const sequelize = require('../config/sequelize.js');
const models = initModels(sequelize);
const Reporte = models.reporte;
const { logMensaje } = require('../utils/logger');
const Respuesta = require('../utils/respuesta');

class ReporteController {

  // Obtener todos los reportes
  async getAllReportes(req, res) {
    try {
      const reportes = await Reporte.findAll();
      return res.json(Respuesta.exito(reportes, 'Datos de reportes recuperados'));
    } catch (error) {
      logMensaje(error);
      return res.status(500).json(Respuesta.error(null, `Error al recuperar los datos: ${req.originalUrl}`));
    }
  }

  // Obtener reportes por usuario reportado
  async getReportesByCodigoReportado(req, res) {
    const codigoReportado = req.params.id;
    try {
      const reportes = await Reporte.findAll({ where: { codigoReportado } });
      return res.json(Respuesta.exito(reportes, 'Datos de reportes recuperados'));
    } catch (error) {
      logMensaje(error);
      return res.status(500).json(Respuesta.error(null, `Error al recuperar los datos: ${req.originalUrl}`));
    }
  }

   // Obtener  informacion de un reporte
   async getReporteByCodReporte(req, res) {
    const codReporte = req.params.id;
    try {
      const reporte = await Reporte.findByPk({ where: { codReporte } });
      return res.json(Respuesta.exito(reportes, 'Datos de reportes recuperados'));
    } catch (error) {
      logMensaje(error);
      return res.status(500).json(Respuesta.error(null, `Error al recuperar los datos: ${req.originalUrl}`));
    }
  }

  // Verificar si un codReporte ya existe
async checkCodigoReporte(req, res) {
  const codReporte = req.params.codReporte; // Código del reporte a verificar
  try {
    const existe = await Reporte.findOne({ where: { codReporte } });
    if (existe) {
      return res.json(Respuesta.exito(true, 'El código de reporte ya existe'));
    } else {
      return res.json(Respuesta.exito(false, 'El código de reporte no existe'));
    }
  } catch (error) {
    logMensaje(error);
    return res.status(500).json(Respuesta.error(null, 'Error al verificar el código de reporte'));
  }
}

  // Crear un nuevo reporte
  async createReporte(req, res) {
    const { codReporte, mensaje, codigoReportado, activo} = req.body;
    if (codReporte && mensaje && codigoReportado && activo !== undefined) {
      try {
        await Reporte.create({ codReporte, mensaje, codigoReportado,activo});
        return res.status(201).json(Respuesta.exito(null, 'Reporte creado con éxito'));
      } catch (error) {
        logMensaje(error);
        return res.status(500).json(Respuesta.error(null, 'Error al crear el reporte'));
      }
    } else {
      return res.status(400).json(Respuesta.error(null, 'No puede haber campos vacíos'));
    }
  }

  // Actualizar un reporte existente
  async updateReporte(req, res) {
    const data = req.body;
    try {
      const reporteUpdate = await Reporte.findByPk(data.codReporte);
      if (reporteUpdate) {
        reporteUpdate.set({
          mensaje: reporteUpdate.mensaje,
          codigoReportado: reporteUpdate.codigoReportado,
          activo: data.activo
        });
        await reporteUpdate.save();
        return res.json(Respuesta.exito(reporteUpdate, 'Reporte actualizado con éxito'));
      } else {
        return res.status(404).json(Respuesta.error(null, 'Reporte no encontrado'));
      }
    } catch (error) {
      logMensaje(error);
      return res.status(500).json(Respuesta.error(null, 'Error al actualizar el reporte'));
    }
  }

  // Eliminar un reporte
  async deleteReporte(req, res) {
    const { codReporte } = req.params;
    try {
      const reporte = await Reporte.findByPk(codReporte);
      if (reporte) {
        await reporte.destroy();
        return res.json(Respuesta.exito(null, 'Reporte eliminado con éxito'));
      } else {
        return res.status(404).json(Respuesta.error(null, 'Reporte no encontrado'));
      }
    } catch (error) {
      logMensaje(error);
      return res.status(500).json(Respuesta.error(null, 'Error al eliminar el reporte'));
    }
  }
}

module.exports = new ReporteController();
