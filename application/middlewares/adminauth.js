const jwt = require('jsonwebtoken')


const createAdminToken = (user) => {
    const payload = {
        id: user.id,
        name: user.email
    }
    const token = jwt.sign(payload, process.env.SECRET_KEY_ADMIN, {

        expiresIn: '1h' // expires in 1 hour

    })
    return token
}

const verifyAdminToken = (req, res, next) => {
    const Token = req.header('auth-token');
    if (! Token) 
        return res.status(401).send('Access denied')

    

    try {
        const verified = jwt.verify(Token, process.env.SECRET_KEY_ADMIN)
        req.user = verified
        next()
    } catch (err) {
        console.log(err);
        res.status(400).send('Invalid Token')
    }
}


module.exports = {
    createAdminToken,
    verifyAdminToken
}
