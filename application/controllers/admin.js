const jwt = require('jsonwebtoken');
const {createAdminToken} = require("../middlewares/adminauth");
const user = require('../models/user');


const admin = {
    email: "admin@gmail.com",
    password: "admin123"
}
const loginAdmin = (req, res) => {
    if (req.body.email === admin.email && req.body.password === admin.password) {
        let data = {
            id: "admin",
            user: admin.email
        }
        console.log(data)
        let token = createAdminToken(data)
        console.log(token)
        return res.status(200).cookie(String(data.id), token, {
            path: "/",
            expires: new Date(Date.now() + 1000 * 30 * 120),
            httpOnly: true,
            sameSite: 'lax'
        }).json({message: "Logged in!", user: data, token})
    } else {
        return res.json({message: "invalid credentials"})
    }
}

const userDashbord = async (req, res) => {
    try {
        const users = await user.find({isDeleted: false});
        return res.status(200).json({users: users})
    } catch (error) {
        return res.json({message: error.message})
    }
}

const deleteUser = async (req, res) => {
    try {
        console.log(req.params)
        const id = req.params.id
        const User = await user.findByIdAndUpdate(id, {
            $set: {
                isDeleted: true
            }
        })
        console.log(User)
        const users = await user.find({isDeleted: false});
        return res.json({message: "user updated", users: users})
    } catch (error) {
        return res.json({message: "user not dleted"})
    }
}

const searchUser = async (req, res) => {
    try {
        const search = req.body.search
        const User = await user.aggregate([
            {
                '$match': {
                    'isDeleted': false

                }
            }, {
                '$match': {
                    $or: [
                        {
                            email: new RegExp(search, 'i')
                        }, {
                            name: new RegExp(search, 'i')
                        }
                    ]

                }
            }
        ])
        res.json({users: User})
    } catch (err) {
        console.log(err);
    }
}


const fetchUserDetails=async(req,res)=>{
    try{
        const id=req.params.id
  const User=await user.findById(id)
res.json(User)
    }catch(err){
      console.log(err);
    }

}

const editUserDetails=async(req,res)=>{
    try{
const id=req.params.id
const {name,email}=req.body
console.log(name,email)
await user.findByIdAndUpdate(id,{
    $set:{
        name:name,
        email:email
    }
})
res.json({success:true})
    }catch(err){

    }
}


module.exports = {
    loginAdmin,
    userDashbord,
    deleteUser,
    searchUser,
    fetchUserDetails,
    editUserDetails
}
