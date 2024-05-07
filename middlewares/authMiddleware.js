const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = async function(req, res, next){
    if(req.method == "OPTION"){
        return next();
    }
    try{
        const token = req.headers.authorization.split(' ')[1];
        
        if(!token){
            return res.status(403).json({ message: 'Пользователь не авторизован'});
        }
        const decoded = await jwt.verify(token, config.get("JWT_SECRET"));
        req.user = decoded;
        next();
    }catch(e){  
        res.status(403).json({ message: 'Пользователь не авторизован'});
    }
}