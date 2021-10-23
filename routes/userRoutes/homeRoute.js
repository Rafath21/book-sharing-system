const express=require("express");
const router=express.Router();
const {protect}=require("../../middlewares/auth");
const {getBooks}=require("../../controllers/userControllers/getbooksController");
router.route("/").get(getBooks);
module.exports=router;