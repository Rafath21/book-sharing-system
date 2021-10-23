const express=require("express");
const router=express.Router();
const {placeorder}=require('../../controllers/userControllers/placeorderController');
const { isAuthenticated, isAuthorized } = require("../../middlewares/auth");
//keyword bookid should be passed
router.route("/:username").post(isAuthenticated,placeorder)
module.exports=router;