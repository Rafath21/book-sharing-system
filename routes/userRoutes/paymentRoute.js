const express=require("express");
const {processPayment,sendStripeApiKey} =require("../../controllers/userControllers/paymentController")

const router=express.Router();
const {isAuthenticated} =require("../../middlewares/auth");
router.route("/process").post(isAuthenticated,processPayment);
router.route("/stripeapikey").get(isAuthenticated,sendStripeApiKey);


module.exports=router;