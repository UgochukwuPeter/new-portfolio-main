const mongoose= require('mongoose');

const PostSchema = new  mongoose.Schema({
    imgBig: {type: String},
    imgthumb1:{type: String},
    imgThumb2:{type: String},
    imgThumb3:{type: String},
    pageTitle: {type: String, required: true, unique: true},
    pageTeam: {type: String},
    pagePurpose:{type: String},
    aboutPageDesc:{type: String},
    roleOnPage:{type: String},
    skill1: {type: String},
    skill2: {type: String},
    skill3: {type: String},
    skill4: {type: String},
    skill5: {type: String},
    skill6: {type: String},
    skill7: {type: String},
    skill8: {type: String},
    skill9: {type: String},
    skill10: {type: String},
    pageLink: {type: String},
  },{timestamps:true});
  
  module.exports = mongoose.model("Post", PostSchema);