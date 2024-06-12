const express = require('express');
const authorRouter = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
require('dotenv').config();

const authorModel = require('../models/authorModel');
const imageModel = require('../models/imageModel');


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

//Authors Routes

//All Authors
authorRouter.get('/authors', async (req, res) => {
    const allAuthors = await authorModel.find();
    return res.status(200).json(allAuthors);
})

//Author by ID
authorRouter.get('/authors/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const author = await authorModel.findById(id);
        return res.status(200).json(author);

    } catch (error) {
        return res.status(500).json({ message: 'Autore non trovato', error: error })
    }
})

//New Author
authorRouter.post('/authors', async (req, res) => {
    const obj = req.body;
    try {
        const newAuthor = authorModel(obj);
        const saveAuthor = await newAuthor.save();
        return res.status(200).json(saveAuthor);

    } catch (error) {
        res.status(500).json({ message: "Problemi nella creazione dell'autore", error: error })
    }
})

//Modify Author
authorRouter.put('/authors/:id', async(req, res) =>{
    const id = req.params.id;
    const obj = req.body;
    try {
        const editAuthor = await authorModel.findByIdAndUpdate(id, obj);
        return res.status(200).json(editAuthor);
    } catch (error) {
        res.status(500).json({Message: "Problemi nella modifica di un autore", error: error})
    }
})

//Delete Author
authorRouter.delete("/authors/:id", async(req, res) =>{
    const id = req.params.id;
    try {
        await authorModel.findByIdAndDelete(id);
        return res.status(200).json({message: "Autore eliminato"});
    } catch (error) {
        res.status(500).json({message: "Errore nella cancellazione dell'autore", error: error})
    }
})


//Upload Avatar
authorRouter.post("/authors/:id/avatar", cloud.single('avatar_file_cloud'), async (req, res, next) =>{
    const id = req.params.id;
    const avatar = req.file.path;
    console.log(file);
    try {
        let authorAvatar = await authorModel.findByIdAndUpdate(id, {avatar: avatar});
        return res.status(200).json(authorAvatar);
        
    } catch (error) {
        return res.status(500).json({message: "Problemi nel salvataggio dell'avatar", error: error})
    }
})


//Middlewares


//Export --> 
module.exports = authorRouter;