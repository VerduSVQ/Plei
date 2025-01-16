// eventoController.js

const initModels = require("../models/init-models.js").initModels;
const sequelize = require('../config/sequelize.js');
const models = initModels(sequelize);
const Evento = models.evento;
const { logMensaje } = require('../utils/logger');
const Respuesta = require('../utils/respuesta');
const { Op } = require('sequelize'); // Importar operadores de Sequelize

class EventoController {

  // Obtener todos los eventos
  async getAllEvento(req, res) {
    try {
      const eventos = await Evento.findAll();
      return res.json(Respuesta.exito(eventos, 'Datos de eventos recuperados'));
    } catch (error) {
      logMensaje(error);
      return res.status(500).json(Respuesta.error(null, 'Error al recuperar los datos: ' + req.originalUrl));
    }
  }

  // Obtener un evento por ID
  async getEvento(req, res) {
    try {
      const { id } = req.params;
      const evento = await Evento.findOne({ where: { id } });
  
      if (!evento) {
        return res.status(404).json(Respuesta.error(null, 'Evento no encontrado'));
      }
  
      return res.json(Respuesta.exito(evento, 'Datos del evento recuperados'));
    } catch (error) {
      logMensaje(error);
      return res.status(500).json(Respuesta.error(null, `Error al recuperar los datos del evento: ${req.originalUrl}`));
    }
  }

async getAllEventoActivo(req, res) {
  try {
    const eventos = await Evento.findAll({ where: { activo: 1 } });

    if (!eventos || eventos.length === 0) {
      return res.status(404).json(Respuesta.error(null, 'No se encontraron eventos activos'));
    }

    return res.json(Respuesta.exito(eventos, 'Datos de los eventos activos recuperados'));
  } catch (error) {
    logMensaje(error);
    return res.status(500).json(Respuesta.error(null, `Error al recuperar los datos de los eventos activos: ${req.originalUrl}`));
  }
}


  // Obtener eventos filtrados por rango
  async getAllEventoFiltrado(req, res) {
    const rangoF = req.params.rango;
    try {
      const eventos = await Evento.findAll({ 
        where: { 
          rango: { 
            [Op.lte]: rangoF 
          }
        }
      });
      return res.json(Respuesta.exito(eventos, 'Eventos filtrados por rango recuperados'));
    } catch (error) {
      logMensaje(error);
      return res.status(500).json(Respuesta.error(null, 'Error al recuperar los datos filtrados: ' + req.originalUrl));
    }
  }

  // Obtener eventos por usuario
  async getEventoUser(req, res) {
    const idUsuario = req.params.id;
    try {
      const eventos = await Evento.findAll({ where: { idUser: idUsuario } });
      return res.json(Respuesta.exito(eventos, 'Eventos recuperados para el usuario'));
    } catch (error) {
      logMensaje(error);
      return res.status(500).json(Respuesta.error(null, 'Error al recuperar los eventos del usuario: ' + req.originalUrl));
    }
  }

  // Crear un nuevo evento
  async createEvento(req, res) {
    const { foto, nombre, ciudad, genero, idUser, idLoc, fecha ,activo} = req.body;
    let {rango}=req.body
    if (nombre && idUser && foto && ciudad && genero && idLoc && activo) {
      if(!rango){
        rango=0}
      try {
        // Si no se proporciona una fecha, se usa la fecha actual
        const fechaEvento = fecha || new Date();
        
        await Evento.create({ foto, nombre, ciudad, genero, idUser, idLoc, rango, fecha: fechaEvento ,activo});
        return res.status(201).json(Respuesta.exito(null, 'Evento creado con éxito'));
      } catch (error) {
        logMensaje(error);
        return res.status(500).json(Respuesta.error(null, 'Error al crear el evento'));
      }
    } else {
      return res.status(400).json(Respuesta.error(null, 'No puede haber campos vacíos'));
    }
  }

  // Actualizar un evento
  async updateEvento(req, res) {
    const { id, nombre, ciudad, genero, foto, fecha, rango, idLoc } = req.body;
  
    try {
      const eventoUpdate = await Evento.findByPk(id);
      
      if (eventoUpdate) {
        // Realizar la actualización solo si hay un cambio en el valor
        eventoUpdate.set({
          nombre: nombre || eventoUpdate.nombre,
          ciudad: ciudad || eventoUpdate.ciudad,
          genero: genero || eventoUpdate.genero,
          foto: foto || eventoUpdate.foto,
          fecha: fecha || eventoUpdate.fecha,
          rango: rango !== undefined ? rango : eventoUpdate.rango,  // Actualiza solo si se pasa un valor
          idLoc: idLoc !== undefined ? idLoc : eventoUpdate.idLocalizacion,  // Igualmente para idLoc
        });
  
        await eventoUpdate.save();
        return res.json(Respuesta.exito(eventoUpdate, 'Evento actualizado con éxito'));
      } else {
        return res.status(404).json(Respuesta.error(null, 'Evento no encontrado'));
      }
    } catch (error) {
      console.error("Error al actualizar el evento:", error);
      return res.status(500).json(Respuesta.error(null, 'Error al actualizar el evento'));
    }
  }
  
  


  // Método PATCH para actualizar parcialmente un evento
  async patchEvento(req, res) {
    const { id } = req.params;
    const { nombre, ciudad, genero, foto, fecha, rango, activo } = req.body;
    
    try {
      const evento = await Evento.findByPk(id);
      
      if (!evento) {
        return res.status(404).json(Respuesta.error(null, 'Evento no encontrado'));
      }

      // Actualizamos solo los campos que fueron enviados en el cuerpo de la solicitud
      evento.set({
        nombre: nombre || evento.nombre,
        ciudad: ciudad || evento.ciudad,
        genero: genero || evento.genero,
        foto: foto || evento.foto,
        fecha: fecha || evento.fecha,
        rango: rango || evento.rango,
        activo: activo !== undefined ? activo : evento.activo // El campo activo puede ser 0 o 1
      });

      await evento.save();
      
      return res.json(Respuesta.exito(evento, 'Evento actualizado parcialmente con éxito'));
    } catch (error) {
      logMensaje(error);
      return res.status(500).json(Respuesta.error(null, 'Error al actualizar el evento parcialmente'));
    }
  }

  // Eliminar un evento
  async deleteEvento(req, res) {
    const { id } = req.params;
    try {
      const evento = await Evento.findByPk(id);
      if (evento) {
        await evento.destroy();
        return res.json(Respuesta.exito(null, 'Evento eliminado con éxito'));
      } else {
        return res.status(404).json(Respuesta.error(null, 'Evento no encontrado'));
      }
    } catch (error) {
      logMensaje(error);
      return res.status(500).json(Respuesta.error(null, 'Error al eliminar el evento'));
    }
  }
}

module.exports = new EventoController();
