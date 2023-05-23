const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
    console.log("vaidating token")
    const cookies = req.headers.cookie
    const token = cookies.split("=")[1]
    console.log("TOKEN RECIEVED", token)


    if (! token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        console.log("in validation")
        const decoded = jwt.verify(String(token), config.JWT_SECRET_KEY, (err, user) => {
            console.log("validation")
            console.log(user)
            if (err) {
                return res.status(400).json({message: "invalid token"})
            }
            console.log(user.id)

        });
        req.userId = decoded;
        next()


    } catch (err) {
        return res.status(401).send("Invalid Token");
    }

};

module.exports = {
    verifyToken
};
