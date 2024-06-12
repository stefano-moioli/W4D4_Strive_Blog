const express = require('express');
const blogPostRouter = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
require('dotenv').config();

const blogPostModel = require('../models/blogPostModel');
const commentModel = require('../models/commentModel');

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET_KEY
});


const storageCloud = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'cloud-upload',
      format: async (req, file) => 'png', // supports promises as well
      public_id: (req, file) => file.originalname
    },
  });

  const cloud = multer({storage: storageCloud})


blogPostRouter.get('/blogPosts', async (req, res) => {
    const allBlogPosts = await blogPostModel.find();
    return res.status(200).json(allBlogPosts);
})

blogPostRouter.get('/blogPosts/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const blogPost = await blogPostModel.findById(id);
        return res.status(200).json(blogPost);
    }
    catch (error) {
    // return res.status(500).json({ message: 'post non trovato', error: error })
    next(error);
    }
})

blogPostRouter.post('/blogPosts', async (req, res, next) =>{
    const obj = req.body;
    try {
        const newPost =  blogPostModel(obj);
        const savePost = await newPost.save();
        return res.status(200).json(savePost);
        
    } catch (error) {
    // return res.status(500).json({ message: 'errore nel caricamento del post', error: error })
    next(error);
    }
})

blogPostRouter.put('/blogPosts/:id', async (req, res, next) =>{
    const id = req.params.id;
    const obj = req.body;
    try {
        const editPost = await blogPostModel.findByIdAndUpdate(id, obj);
        return res.status(200).json(editPost);
    } catch (error) {
    // return res.status(500).json({ message: 'errore nella modifica del post', error: error })
    next(error);
    }
})

blogPostRouter.delete('/blogPosts/:id', async (req, res, next) =>{
    const id = req.params.id;
    try {
        await blogPostModel.findByIdAndDelete(id);
        return res.status(200).json({message: 'Post eliminato'});
    } catch (error) {
        next(error)
    // return res.status(500).json({ message: 'errore nella cancellazione del post', error: error })
    }
})

blogPostRouter.post("/blogPosts/:id/cover", cloud.single('cover_file_cloud'), async (req, res, next) =>{
    const id = req.params.id;
    const cover = req.file.path;
    console.log(file);
    try {
        let coverBlogPost = await blogPostModel.findByIdAndUpdate(id, {cover: cover});
        return res.status(200).json(coverBlogPost);
        
    } catch (error) {
        return res.status(500).json({message: "Problemi nel salvataggio dell'avatar", error: error})
    }
})

blogPostRouter.get("blogPosts/:id/comments", async (req, res, next) => {
    try {
      let comments = await blogPostModel.find({
        blogPost: req.params.id,
      }).populate({
        path: "author",
        model: "Author",
        select: ["name", "lastName", "avatar"],
      })
      res.send(comments)
    } catch (error) {
      next(error)
    }
  })

  blogPostRouter.get("blogPosts/:id/comments/:commentId", async (req, res, next) => {
    try {
      let comments = await commentModel.find({
        blogPost: req.params.id,
        _id: req.params.commentId
      }).populate({
        path: "author",
        model: "Author",
        select: ["name", "lastName", "avatar"],
      })
      res.send(comments)
    } catch (error) {
      next(error)
    }
  })

 blogPostRouter.put("blogPosts/:id", async (req, res, next) => {
    try {
      let blog = await blogPostModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      })
      res.send(blog)
    } catch (error) {
      next(error)
    }
  })

 blogPostRouter.put("blogPosts/:id/comments/:commentId", async (req, res, next) => {
    try {
      let comment = await commentModel.findOneAndUpdate({
        blogPost: req.params.id,
        _id: req.params.commentId
      }, req.body, {new: true}).populate({
        path: "author",
        model: "Author",
        select: ["name", "lastName", "avatar"],
      })
      res.send(comment)
    } catch (error) {
      next(error)
    }
  })

  blogPostRouter.delete("blogPosts/:id/comments/:commentId", async (req, res, next) => {
    try {
      await commentModel.findOneAndDelete({
        blogPost: req.params.id,
        _id: req.params.commentId
      })
      res.send(204)
    } catch (error) {
      next(error)
    }
  })
  

module.exports = blogPostRouter;