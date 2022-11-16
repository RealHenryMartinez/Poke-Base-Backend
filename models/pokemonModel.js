
const mongoose = require('mongoose');

const pokemonSchema = new mongoose.Schema({
    username: {type: String, required: true},

    pokemonName: {type: String, required: true},

    photo: {type: String, required: true},

    foodOne: {type: String, required: true},

    foodTwo: {type: String, required: true},

    foodThree: {type: String, required: true},

    pokemonTypeOne: {type: String, required: true},

    pokemonTypeTwo: {type: String, required: true},

    pokemonRegion: {type: String, required: true},

    pokemonGender: {type: String, required: true},

    pokemonCatch: {type: String, required: true}


})

const PokeModel = mongoose.model('Pokemon', pokemonSchema);

module.exports = PokeModel;
