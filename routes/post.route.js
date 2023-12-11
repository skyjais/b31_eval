const express=require("express")
const {auth}=require("../middlewares/auth.middleware")
const {PostModel}=require("../models/post.model")
const { userRouter } = require("./user.route")

const postRouter=express.Router()

postRouter.post("/add",auth,async(req,res)=>{
    try {
        const post=new PostModel(req.body)
        await post.save()
        res.status(200).send({"msg":"A new post added"})
    } catch (error) {
        res.status(400).send({"error":error})
    }
    

})

postRouter.get("/",auth,async(req,res)=>{
    try {
        console.log(req.body,"req.body")
        const posts=await PostModel.find({email:req.body.email})
        res.status(200).send(posts)
    } catch (error) {
        res.status(400).send({"error":error})
    }
})


postRouter.patch("/update/:postID",auth,async(req,res)=>{

    const {postID}=req.params
    try {
        const  post=await PostModel.findOne({_id:postID})
        if(req.body.userID===post.userID){
            await PostModel.findByIdAndUpdate({_id:postID},req.body)
            res.status(200).send({"msg":`Post with ID ${postID} has been updated`})
        }else{
            res.send({"msg":"You are not Authorised"})
        }
    } catch (error) {
        res.status(400).send({"error":error})
    }

})


postRouter.delete("/delete/:postID",auth,async(req,res)=>{

    const {postID}=req.params
    try {
        const  post=await PostModel.findOne({_id:postID})
        if(req.body.userID===post.userID){
            await PostModel.findByIdAndDelete({_id:postID})
            res.status(200).send({"msg":`Post with ID ${postID} has been deleted`})
        }else{
            res.send({"msg":"You are not Authorised"})
        }
    } catch (error) {
        res.status(400).send({"error":error})
    }

})


module.exports={postRouter}