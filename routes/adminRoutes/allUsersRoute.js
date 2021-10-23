const express=require('express');
const router=express.Router();
const {isAuthenticated,isAuthorized}=require("../../middlewares/auth")
const {allUsers,deleteUser,updateUser} =require('../../controllers/adminControllers/allUsersController');
router
.route('/')
.get(isAuthenticated,isAuthorized("admin"),allUsers)
.put(isAuthenticated,isAuthorized("admin"),updateUser)
.delete(isAuthenticated,isAuthorized("admin"),deleteUser);

module.exports=router;