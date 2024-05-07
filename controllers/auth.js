const User = require('../models/User');
const config = require('config');

const { validationResult } = require('express-validator'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


class AuthController{
    async registation(req, res){
        try{
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({ errors: errors.array(), message: 'Некорректные данные'});
            }
            const { email, password } = req.body;
            const candidate = await User.findOne({ email });
            if(candidate){
                return res.status(400).json({ 
                     message: 'Такой пользователь уже существует'
                })
            }
            const hashPassword = await bcrypt.hash(password, 8);
            const user = new User({ email, password: hashPassword });
            await user.save();
            return res.json({user});
        }catch(e){
            console.log(e);
            res.status(500).json({ message: 'Что то пошло не так'});
        }
    }
    async login(req, res){
        try{
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({ errors: errors.array(), message: 'Некорректные данные'});
            }
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if(!user){
                return res.status(404).json({ 
                     message: 'Неверный логин или пароль'
                })
            }
            const passwordCompare = await bcrypt.compare(password, user.password);
            if(!passwordCompare){
                return res.status(404).json({ 
                    message: 'Неверный логин или пароль'
               })
            }
            const token = jwt.sign(
                { userId: user.id },
                config.get("JWT_SECRET"),
                {expiresIn: '1h'}
            )
            return res.json({token, userId: user.id});
        }catch(e){
            console.log(e);
            res.status(500).json({ message: 'Что то пошло не так'});
        }
    }
    async me(req, res){
        try{
            const userId = req.params.id;
            const user = await User.findById({ _id: userId });
            user.password = null;
            return res.json({user});
        }catch(e){
            console.log(e);
            res.status(500).json({ message: 'Что то пошло не так'});
        }                    
    }
    async findAllUsers(req, res){
        const users = await User.find();
        return res.json(users);
    }

}


module.exports = new AuthController();