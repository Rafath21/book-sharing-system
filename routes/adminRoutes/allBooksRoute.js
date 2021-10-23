const express=require('express');
const app=express();
const router=express.Router();
const {isAuthenticated,isAuthorized}=require("../../middlewares/auth")
const {allBooks,deleteBook} =require('../../controllers/adminControllers/allBooksController')

router.route("/").get(isAuthenticated,isAuthorized("admin"),allBooks)
.delete(isAuthenticated,isAuthorized("admin"),deleteBook);
module.exports=router;
