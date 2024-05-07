const { Router } = require('express');
const { check } = require('express-validator'); 

const AuthController = require('../controllers/auth');


const router = Router();

router.post('/registation',
[ 
    check('email', 'Некорректный email').isEmail(),
    check('password', 'Минимальная длина пароля 6 символов, а максимальная 24').isLength({ min: 6, max: 24 }),
], AuthController.registation);

router.post('/login',
[ 
    check('email', 'Некорректный email').isEmail(),
    check('password', 'Минимальная длина пароля 6 символов, а максимальная 24').isLength({ min: 6, max: 24 }),
], AuthController.login);

router.get('/me/:id', AuthController.me);
router.get('/users', AuthController.findAllUsers);

module.exports = router;