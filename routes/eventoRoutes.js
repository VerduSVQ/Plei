
const express = require('express');
const router = express.Router();
const eventoController = require('../controllers/eventoController');

router.get('/', eventoController.getAllEvento);
router.get('/:id', eventoController.getEvento);
router.get('/estado/activo', eventoController.getAllEventoActivo);
router.get('/rango/:rango', eventoController.getAllEventoFiltrado);
router.patch('/:id', eventoController.patchEvento);
router.get('/MisEventos/:id', eventoController.getEventoUser);
router.post('/', eventoController.createEvento);
router.put('/:id', eventoController.updateEvento);
router.delete('/:id', eventoController.deleteEvento);


module.exports = router;