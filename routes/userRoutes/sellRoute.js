const express=require("express");
const router=express.Router();
const {isAuthenticated} =require("../../middlewares/auth")
const {sellBooks}=require("../../controllers/userControllers/sellController");
const {soldBooks}=require("../../controllers/userControllers/soldBooksController");
router.route("/:id").get(isAuthenticated,soldBooks);
router.route("/:id").post(isAuthenticated,sellBooks);
module.exports=router;
