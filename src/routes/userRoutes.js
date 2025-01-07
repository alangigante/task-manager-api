const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const checkPasswordExpiration = require('../services/checkPasswordExpiration');


router.post('/register', userController.register);
router.post('/confirm', userController.confirmUser);
router.put('/password', checkPasswordExpiration, userController.updatePassword);
router.put('/:id', userController.update);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);

module.exports = router;
