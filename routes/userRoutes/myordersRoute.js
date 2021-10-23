//a controller that gets me all my orders with their status
//route for a single book's (details) that is being bought by the current user
const express=require('express');
const app=express();
const router=express.Router();
const {isAuthenticated} =require("../../middlewares/auth")
const {myOrders} =require('../../controllers/userControllers/myordersController');
router.route('/:username').get(isAuthenticated,myOrders);
module.exports=router;

