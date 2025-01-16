const express = require('express');
const router = express.Router();
const asistenciaController = require('../controllers/asistenciaController');


// Ruta para obtener todas las asistencias de un usuario específico
router.get('/evento/:idEvento', asistenciaController.getAsistenciasByEvento);
router.get('/:id', asistenciaController.getAsistenciasUsuario);
// Ruta para comprobar si el usuario ya está apuntado a un evento específico
router.get('/:idEvento/:idUser', asistenciaController.checkAsistencia);


// Ruta para registrar una nueva asistencia (crear relación entre usuario y evento)
router.post('/:idEvento/:idUser', asistenciaController.createAsistencia);

// Ruta para eliminar una asistencia específica (por usuario y evento)
router.delete('/:idUser/:idEvento', asistenciaController.deleteAsistencia);

module.exports = router;
