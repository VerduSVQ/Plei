const express = require('express');
const router = express.Router();
const reporteController = require('../controllers/reporteController');

// Ruta para obtener todos los reportes
router.get('/', reporteController.getAllReportes);

// Ruta para obtener reportes de un usuario específico
router.get('/usuario/:id', reporteController.getReportesByCodigoReportado);

// Ruta para obtener informacion reporte  específico
router.get('/reporte/:id', reporteController.getReporteByCodReporte);

// Nueva ruta para verificar el código de reporte
router.get('/checkCodigo/:codReporte', reporteController.checkCodigoReporte);

// Ruta para crear un nuevo reporte
router.post('/', reporteController.createReporte);

// Ruta para actualizar un reporte por codReporte
router.put('/:codReporte', reporteController.updateReporte);

// Ruta para eliminar un reporte por codReporte
router.delete('/:codReporte', reporteController.deleteReporte);

module.exports = router;
