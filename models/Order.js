const mongoose=require('mongoose');
const OrderSchema=new mongoose.Schema({
    book:{
           type: mongoose.Schema.Types.ObjectId,
           ref:'Books',
    },
    shippingInfo:{
        address:{
            type:String,
            required:[true,"Please provide your address"]
        },
        city:{
            type:String,
            required:[true,"Please provide the city name"]
        },
        pincode: Number,
        phone:{
        type:Number,
        required:[true,"Please give your phone number"]
    }
    },
    boughtBy:{
        type:String,
       required:[true,"Please mention buyer's name"]
    },
    paymentInfo:{
        type:String,
        default:"unpaid"
    },
    paidAt:Date,
    OrderStatus:{
        type:"String",
        default:"Order Placed"
    }
})
OrderSchema.methods.updateOrderstatus=function(status){
    this.OrderStatus=status;
}
OrderSchema.methods.updatePaymentStatus=function(paymentInfo){
    this.paymentInfo=paymentInfo;
}
const Order=mongoose.model("Orders",OrderSchema);
module.exports=Order;