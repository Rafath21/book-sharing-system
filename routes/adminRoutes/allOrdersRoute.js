const express=require('express');
const app=express();
const router=express.Router();
const {isAuthenticated,isAuthorized}=require("../../middlewares/auth")
const {allOrders,deleteOrder} =require('../../controllers/adminControllers/allOrdersController')
router.route("/").get(isAuthenticated , isAuthorized("admin"),allOrders).delete(isAuthenticated, isAuthorized("admin"),deleteOrder);
module.exports=router;
