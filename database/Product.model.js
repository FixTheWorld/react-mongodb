/**
 * Created by changjin.zhang on 6/15/2017.
 */
const mongoose=require('mongoose');
const db=require("./db");
const Schema=mongoose.Schema;
const Product=new Schema({
    name:String,
    category:String
});
const modelProduct=db.model('product',Product,'product');
module.exports=modelProduct;