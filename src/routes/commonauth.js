const express = require('express');
const router = express.Router();
const { Registration, Login, GetUser, GetAllUsers, UpdateUser } = require('./../controllers/common/CommonAuth');

router.post('/register', Registration);
router.post('/login', Login);
router.get('/user/:id', GetUser);
router.get('/users', GetAllUsers);
router.put('/user/:id', UpdateUser);

module.exports = router; 