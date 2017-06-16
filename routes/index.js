const express = require('express');
const router = express.Router();
const Product=require('../database/Product.model');
router.post('/getProducts', function(req, res, next) {
    Product.find(function(err,data){
        if(data.length>=0){
            res.send({
                errorCode:0,
                errorMessage:data
            });
        }else{
            console.log(err);
            return res.send({
                errorCode:1,
                errorMessage:'出错了'
            })
        }
    });
});

router.post("/addProduct",function(req,res,next){
   console.log('req',req.body.productName);
   const product=new Product({
       name:req.body.productName,
       category:req.body.productCategory
   });
   product.save(function(err,response){
       if (err) {
           console.log("Error:" + err);
           res.send({
               errorCode:1,
               errorMessage:'出错了'
           })
       }else {
           console.log("Res:" + res);
           res.send({
               errorCode:0,
               errorMessage:"insert success"
           });
       }
   })
});

router.put("/updateProduct/:id",function(req,res,next){
   const where={"_id":`${req.params.id}`};
   const data={
       name:req.body.productName,
       category:req.body.productCategory
   };
   Product.update(where,data,function(err,response){
       if (err) {
           console.log("Error:" + err);
           res.send({
               errorCode:1,
               errorMessage:'出错了'
           })
       }else {
           console.log("Res:" + res);
           res.send({
               errorCode:0,
               errorMessage:"update success"
           });
       }
   })
});

router.delete("/delete/:id",function(req,res){
   const where={"_id":`${req.params.id}`};
   Product.remove(where,function (err,response) {
       if(err){
           console.warn(err);
           res.send({
               errorCode:1,
               errorMessage:'出错了'
           })
       }else{
           res.send({
               errorCode:0,
               errorMessage:'delete success'
           })
       }
   });
});

module.exports = router;
