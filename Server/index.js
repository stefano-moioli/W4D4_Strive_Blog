const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const upload = multer ({ dest: 'uploads/' });
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const sgMail = require('@sendgrid/mail')
const passport = require("passport");
require('dotenv').config();


const app = express();
const port = 3001;
const dbName = 'dbW4D4_backend'

app.use(cors());
app.use(express.json());

//Models
const authorModel = require('./models/authorModel');

//Cloudinary
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

  const cloud = multer({storage: storageCloud}) // Definisco lo storage e volendo posso aggiungere i filtri


//Endpoints
const authorsEndpoint = require('./routes/authors');
app.use(authorsEndpoint);

const authenticationEndpoind = require ("./routes/auth");
app.use("/", authenticationEndpoind);

const meEndpoint = require ("./routes/me");
app.use(meEndpoint);

//Middlewares
const { errorHandler, pageNotFoundHandler } = require('./middlewares/error');
app.use(errorHandler);
app.use(pageNotFoundHandler);

const googleStrategy = require('./middlewares/OAuthMiddleware');
passport.use("google", googleStrategy);


async function connect() {
    try {
        await mongoose.connect(process.env.MONGODB_URL + dbName);
        app.listen(port, () => console.log(`Server attivo sulla porta ${port}`));

    } catch (error) {
        console.log(error);
    }
}
connect();