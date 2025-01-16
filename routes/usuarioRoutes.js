
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

router.get('/', usuarioController.getAllUsuario);
router.get('/:id', usuarioController.getUsuarioById);
router.post('/login', usuarioController.loginUsuario);
router.post('/', usuarioController.createUsuario);
router.put('/:id', usuarioController.updateUsuario);
router.patch('/:id', usuarioController.patchUsuario);
router.delete('/:id', usuarioController.deleteUsuario);

module.exports = router;
