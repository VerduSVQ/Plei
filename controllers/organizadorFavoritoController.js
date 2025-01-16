// organizadorFavoritoController.js
const initModels = require("../models/init-models.js").initModels;
const sequelize = require('../config/sequelize.js');
const models = initModels(sequelize);
const OrganizadorFavorito = models.organizadorFavorito;
const { logMensaje } = require('../utils/logger.js');
const Respuesta = require('../utils/respuesta.js');

class OrganizadorFavoritoController {

  // Obtener organizadores favoritos de un usuario específico
  async getFavoritosByUser(req, res) {
    const idUsuario = req.params.id;
    try {
      const favoritos = await OrganizadorFavorito.findAll({ where: { idUsuario } });
      return res.json(Respuesta.exito(favoritos, 'Favoritos del usuario recuperados'));
    } catch (error) {
      logMensaje(error);
      return res.status(500).json(Respuesta.error(null, `Error al recuperar los datos: ${req.originalUrl}`));
    }
  }

  // Agregar un organizador a favoritos de un usuario
  async addFavorito(req, res) {
    const { idUsuario, idOrganizador } = req.body;
    if (idUsuario && idOrganizador) {
      try {
        await OrganizadorFavorito.create({ idUsuario, idOrganizador });
        return res.status(201).json(Respuesta.exito(null, 'Organizador agregado a favoritos'));
      } catch (error) {
        logMensaje(error);
        return res.status(500).json(Respuesta.error(null, 'Error al agregar el organizador a favoritos'));
      }
    } else {
      return res.status(400).json(Respuesta.error(null, 'No puede haber campos vacíos'));
    }
  }

  // Eliminar un organizador de favoritos de un usuario
  async deleteFavorito(req, res) {
    const { idUsuario, idOrganizador } = req.params;
    try {
      const favorito = await OrganizadorFavorito.findOne({ where: { idUsuario, idOrganizador } });
      if (favorito) {
        await favorito.destroy();
        return res.json(Respuesta.exito(null, 'Favorito eliminado con éxito'));
      } else {
        return res.status(404).json(Respuesta.error(null, 'Favorito no encontrado'));
      }
    } catch (error) {
      logMensaje(error);
      return res.status(500).json(Respuesta.error(null, 'Error al eliminar el favorito'));
    }
  }
}

module.exports = new OrganizadorFavoritoController();
