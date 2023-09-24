
const verifyIfIsAdmin = (req, res, next)=>{

    const role = req.decoded.role;

    if(role === "client") return res.status(403).json({error: "Acesso negado"});

    return next();
}


module.exports = verifyIfIsAdmin;