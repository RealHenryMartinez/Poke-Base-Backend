
const mongoose = require('mongoose');

const pokemonSchema = new mongoose.Schema({
    username: {type: String, required: true},

    pokemonName: {type: String, required: true},

    photo: {type: String, required: true},

})

const PokeModel = mongoose.model('Pokemon', pokemonSchema);

module.exports = PokeModel;
