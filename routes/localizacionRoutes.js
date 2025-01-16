const express = require('express');
const router = express.Router();
const localizacionController = require('../controllers/localizacionController');

// Ruta para obtener todas las localizaciones
router.get('/', localizacionController.getAllLocalizaciones);

// Ruta para obtener una localización específica por ID
router.get('/:idLocalizacion', localizacionController.getLocalizacionById);

// Ruta para crear una nueva localización
router.post('/', localizacionController.createLocalizacion);

// Ruta para actualizar una localización por ID
router.put('/:idLocalizacion', localizacionController.updateLocalizacion);

// Ruta para eliminar una localización por ID
router.delete('/:idLocalizacion', localizacionController.deleteLocalizacion);

module.exports = router;
