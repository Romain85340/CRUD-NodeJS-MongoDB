const jwt = require("jsonwebtoken")

module.exports = 
(req, res, next) => {

    try{
        const token = req.header("authorization");
        jwt.verify( token, process.env.SECRET_TOKEN, (err, verify) => {
            if(err) {
                return res.status(401).send("Acces refusé")
            }
            next ()
        })
    }   catch (err) {
        res.status(400).send("Le token est invalid")
    }
}