
/**
 * This schema is used to structure the document that the database is storing
 */
const mongoose = require('mongoose');

const pokemonSchema = new mongoose.Schema({


// it is required as true as this is the data that needs to be stored -> if not, then the server would give an error as the data is not provided
    username: {type: String, required: true},

    pokemonName: {type: String, required: true},

    photo: {type: String, required: true},

    foodOne: {type: String, required: true},

    foodTwo: {type: String, required: true},

    foodThree: {type: String, required: true},

    pokemonTypeOne: {type: String, required: true},

    pokemonTypeTwo: {type: String},

    pokemonRegion: {type: String, required: true},

    pokemonGender: {type: String, required: true},

    pokemonCatch: {type: String, required: true}


})

const PokeModel = mongoose.model('Pokemon', pokemonSchema);

module.exports = PokeModel;
