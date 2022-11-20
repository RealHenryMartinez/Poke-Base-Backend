const router = require('express').Router();
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
let path = require('path');
let PokeModel = require('../models/pokemonModel');

// stores the data in the local storage -> first need to define what data is stored from the file itself
const storage = multer.diskStorage({
    // the file should be stored in the images folder as stated here
    destination: function(req, file, cb) {
        cb(null, 'images');
    },
    // the name of the file should be decrypted and the file data should be the same as the file it is stored
    filename: function(req, file, cb) {   
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    }
});

// the file should be filtered to only images that are supported in the function here
const fileFilter = (req, file, cb) => {
    // defining the allowed file types
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];

    // conditional to check if the file is supported -> and if not, don't put it in the folder
    if(allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

// upload the file to the storage and call the filter function when this variable storage is called
let upload = multer({ storage, fileFilter });

// route to add photo and the text data to the database
router.route('/addPokemon').post(upload.single('photo'), (req, res) => {
    const username = req.body.username;
    const pokemonName = req.body.pokemonName;
    const foodOne = req.body.foodOne;
    const foodTwo = req.body.foodTwo;
    const foodThree = req.body.foodThree;

    const pokemonRegion = req.body.pokemonRegion;
    const pokemonTypeOne = req.body.pokemonTypeOne;
    const pokemonTypeTwo = req.body.pokemonTypeTwo;
    const pokemonGender = req.body.pokemonGender;
    const pokemonCatch = req.body.pokemonCatch;
    const photo = req.file.filename;

    const newUserData = {
        username,
        pokemonName,
        photo,
        foodOne,
        foodTwo,
        foodThree,
        pokemonRegion,
        pokemonGender,
        pokemonCatch,
        pokemonTypeOne,
        pokemonTypeTwo
    }

    const newUser = new PokeModel(newUserData);

    newUser.save()
           .then(() => res.json('Pokemon Added'))
           .catch(err => res.status(400).json('Error: ' + err));
});

// export the routers that use Router()
module.exports = router;