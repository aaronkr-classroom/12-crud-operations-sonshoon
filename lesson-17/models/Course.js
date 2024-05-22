// models/Course.js
"use strict";

const Subscriber = require("./Subscriber");

/**
 * Listing 17.6 (p. 249)
 * 새로운 스키마와 모델의 생성
 */
const mongoose = require("mongoose"),
  courseSchema = mongoose.Schema({
    _id:{
      type: String,
      required:true,
      unique:true
    },
    title:{
      type: String,
      required:true,
      unique:true
    },
    description:{
      type: String,
      required:true
    },
    price:{
      type: Number,
      required:true,
      min:0
    },
    courseImg:{
      type: String,
  
    },
    item:[]
  });


  courseSchema.methods.getInfo =function(){
    return `Title ${this.title} Description ${this.description} `
  }
courseSchema.methods.findSamePrice=function(){
  return this.model("Course")
  .find({price:this.price})
  .exec();
}

courseSchema.methodsfindLowerPrice = function(price){
  return this.model("Course")
  .find({price:{$it:price}})
  .exec();
}

courseSchema.methods.discount = function(price){
  const discount=this.price*((100-price)/100);
  return callback(null,discount);
}

courseSchema.virtual("Subscriber", {
  ref:"subscriber",
  localField:"_id",
  foreignField:"course"
});
courseSchema.set("toObject",{virtuals:true});
courseSchema.set("toJsons",{virtuals:true});


module.exports = mongoose.model("Course", courseSchema);
