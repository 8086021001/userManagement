const express = require('express')
const router = express.Router()

const {verifyAdminToken} = require('../middlewares/adminauth')
const {loginAdmin, userDashbord, deleteUser, searchUser,fetchUserDetails,editUserDetails} = require('../controllers/admin')


router.post("/login", loginAdmin)
router.get("/getUser", userDashbord)
router.delete("/deleteUser/:id", deleteUser)
router.post('/search', searchUser)
router.get('/editUser/:id',fetchUserDetails)
router.put('/editUser/:id',editUserDetails)


module.exports = router
