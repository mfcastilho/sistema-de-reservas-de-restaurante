const jwt = require("jsonwebtoken");
require("dotenv").config();


const verifyToken = (req, res, next)=>{

    try {
        const { authorization } = req.headers;
        
        if(!authorization) return res.status(401).json({error: "Para acessar este recurso um token de autenticação válido deve ser enviado."});

        const token = authorization.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        res.locals.decoded = decoded;
        req.decoded = decoded;

        return next();
        
    } catch (error) {
        return res.status(500).json({error: "Para acessar este recurso um token de autenticação válido deve ser enviado."});
    }
}

module.exports = verifyToken;