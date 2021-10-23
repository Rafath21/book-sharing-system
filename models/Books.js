const mongoose=require('mongoose');
let BookSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please provide a Book name"]
    },
    soldby:{ 
        type:String,
        required:[true,"Please give the username"]
    },
    soldbyId:{  
        type:String,
        required:[true]
    },
    img:{
        public_id:{
            type:String,
        required:[true],
        },
        url:{
            type:String,
        required:[true],
        }
    },
    postedOn:Date,
    price:{
        type:Number,
        required:[true,"Price is required"]
    },
    bookStatus:{
        type:String,
        default:"unsold"
    },
    shipsTo:{
        type:String,
        required:[true,"Please mention the locations where the book can be shipped."]
    },
    cardno:{
        type:String,
        required:[true,"Please give the card number on which buyer can pay the bill."]
    }
})
BookSchema.methods.updatebookStatus=function(status){
 this.bookStatus=status;
}
let Book=mongoose.model("Books",BookSchema);
module.exports=Book;