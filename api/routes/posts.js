const router = require('express').Router();
const Post = require("../models/Post");
const verify = require('../verifyToken');

//CREATE NEW POST
router.post("/",verify, async(req, res)=>{
    if( req.user.isAdmin ){
       const newPost = new Post(req.body);
       try{
            const savedPost = await newPost.save();
            res.status(200).json(savedPost);
       }catch(err){
        res.status(500).json(err)
       }
       }else{
        res.status(403).json("You are not  allowed");
       }
});
//UPDATE POST
router.put("/:id",verify, async(req, res)=>{
    if( req.user.isAdmin ){
       try{
            const updatedPost = await Post.findByIdAndUpdate(req.params.id,{$set: req.body}, {new: true});
            res.status(200).json(updatedPost);
       }catch(err){
        res.status(500).json(err)
       }
       }else{
        res.status(403).json("You are not  allowed");
       }
});
//DELETE POST
router.delete("/:id",verify, async(req, res)=>{
    if( req.user.isAdmin ){
       try{
        await Post.findByIdAndDelete(req.params.id);
            res.status(200).json("Post has been deleted");
       }catch(err){
        res.status(500).json(err)
       }
       }else{
        res.status(403).json("You are not  allowed");
       }
});
//GET ALL POST
router.get("/", async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts.reverse());
    } catch (err) {
        res.status(500).json(err);
    }
});
//GET ANY POST
router.get("/find/:id", async(req, res)=>{
    try{
     const post = await Post.findById(req.params.id);
         res.status(200).json(post);
    }catch(err){
     res.status(500).json(err)
    }
});

module.exports =  router;