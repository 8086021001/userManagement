const express = require("express")
const router = express.Router()
const {
    login,
    signUp,
    userLogin,
    getUser,
    uploadProfile
} = require("../controllers/user")
const {upload} = require("../config/multer")

const {verifyToken} = require("../middlewares/auth")


// const verifyToken = require("jsonwebtoken");

// console.log(verifyToken())

router.get("/", login)
router.post('/signUp', signUp)
router.post("/logIn", userLogin)
router.get("/home", verifyToken, getUser)
router.put("/update/:id", upload.single('image'), uploadProfile)


module.exports = router
