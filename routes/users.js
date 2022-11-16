const router = require('express').Router();
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
let path = require('path');
let PokeModel = require('../models/pokemonModel');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'images');
    },
    filename: function(req, file, cb) {   
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if(allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

let upload = multer({ storage, fileFilter });

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