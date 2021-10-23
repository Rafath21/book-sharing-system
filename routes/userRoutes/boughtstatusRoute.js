//route for a single book's (details) that is being bought by the current user
const express=require('express');
const app=express();
const router=express.Router();
const {isAuthenticated} =require("../../middlewares/auth")
const {boughtStatus} =require('../../controllers/userControllers/boughtstatusController');
router.route('/:id').get(isAuthenticated,boughtStatus);
module.exports=router;

