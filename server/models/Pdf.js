const mongoose =  require("mongoose");

const PdfSchema = new mongoose.Schema({
    name:{
        type:String
    },
    path:{
        type:String,
        required:true
    },
    userId:{
        type:mongoose.Schema.ObjectId,
        required:true,
        ref:"User"
    }
},{timestamps:true});

module.exports = mongoose.model("Pdf",PdfSchema);