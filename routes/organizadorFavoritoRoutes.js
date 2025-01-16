const express = require('express');
const router = express.Router();
const organizadorFavoritoController = require('../controllers/organizadorFavoritoController');


// Ruta para obtener los favoritos de un usuario específico
router.get('/:id', organizadorFavoritoController.getFavoritosByUser);

// Ruta para agregar un nuevo organizador favorito
router.post('/', organizadorFavoritoController.addFavorito);

// Ruta para eliminar un organizador de los favoritos de un usuario
router.delete('/:idUsuario/:idOrganizador', organizadorFavoritoController.deleteFavorito);

module.exports = router;
