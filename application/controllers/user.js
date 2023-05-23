const bcrypt = require("bcrypt")
const User = require('../models/user')
const jwt = require('jsonwebtoken');
const upload = require("../config/multer")


const login = (req, res) => {
    res.send("Heyyy here!!!!");
}

const userLogin = async (req, res) => {
    const user = await User.findOne({
        $or: [
            {
                email: req.body.email
            }, {
                phone: req.body.phone
            }
        ]
    });
    console.log(`user details found ${user}`)
    if (user) {
        console.log("user available")
        let isVerified
        try {
            isVerified = await bcrypt.compare(req.body.password, user.password)
            console.log(isVerified)

        } catch (error) {
            console.log(error.message)
        }

        if (isVerified) {
            let jwtSecretKey = process.env.JWT_SECRET_KEY;
            let data = {
                userId: user._id,
                name: user.name,
                email: user.email,
                image: user.image
            }

            const token = jwt.sign({
                id: data.userId
            }, jwtSecretKey, {expiresIn: "1hr"})
            return res.status(200).cookie(String(data.userId), token, {
                path: "/",
                expires: new Date(Date.now() + 1000 * 30 * 120),
                httpOnly: true,
                sameSite: 'lax'
            }).json({message: "Logged in!", user: data, token})
        } else {
            return res.json({message: "Invalid password!"})
        }
    } else {
        console.log("User not avilable, create new user")
        res.json({message: "User not available"})
    }
}


const signUp = async (req, res) => {
    try {
        console.log(req.body)
        const ifUser = await User.findOne({
            $or: [
                {
                    email: req.body.email
                }, {
                    phone: req.body.phone
                }
            ]
        });
        if (! ifUser) {
            const user = new User(req.body);
            await user.save();
            return res.json({user: user});
        } else {
            return res.json({message: "user already available!, Please Login"})
        }

    } catch (err) {
        res.status(400).json({error: err.message});
    }
}

const getUser = async (req, res, next) => {
    try {
        const userId = req.userId
        console.log(userId)
        const user = await User.findById(userId, "-password ")
        if (! user) {
            return res.json({message: "user not authorised"})
        }
        return res.json({message: "user enjoy", user})
    } catch (error) {}
}

const uploadProfile = async (req, res) => {
    try {
        console.log("Hi file", req.file);
        let id = req.params.id;
        let file = req.file;

        const path = req.file.path.slice(7);
        const filepath = `http://localhost:5000/${path}`;

        await User.findByIdAndUpdate(id, {
            $set: {
                image: filepath
            }
        });

        console.log("updated");
        console.log(id);

        const user = await User.findById(id);
        console.log(user);

        res.json({message: "User updated", user});
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "An error occurred"});
    }
};


module.exports = {
    login,
    signUp,
    userLogin,
    getUser,
    uploadProfile
}
