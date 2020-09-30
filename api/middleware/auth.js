var jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
    try {
        const token = req.headers['auth-token'];
        const decod = jwt.verify(token, 'secret',)
        req.userData = decod
        next();
    } catch (error) {
        res.status(401).json({
            error: "invalid token"
        })
    }

}