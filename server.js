// this port for our sever
const PORT = process.env.PORT || 4020
// import express framework
const express = require('express')
// create instance of express so we can define our routes
const app = express()

// import body parser - parses data from the frontend to backend
const bodyParser = require('body-parser')
// import cors
const cors = require('cors')
// import mongoose
const mongoose = require('mongoose')

// import user route
const userRouter = require('./routes/users')

// import dotenv
require('dotenv').config()

// import schema model
const PokeModel = require('./models/pokemonModel');

// using cors - allows the use of cross origin data sending
app.use(cors())
app.use(express.json())

/**
 * Handles db connection
 */
async function connectToDb() {
  try {
    // this line of code stop everything until its
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('we connected')
  } catch (error) {
    console.log(error)
    // add handler to deal with db connection error
  }
}
// run the function to connect
connectToDb()

/**
 * Define what data our score object will hold
 */
// middleware - parse the json data / payload from our frontend
app.use(bodyParser.json())

// importing post request from userRouter
app.use('/', userRouter)

// getting score from ALL USERS
app.get('/poke-cards', (req, res) => {
  // data from your API through a request in the body
  const data = req.body

  async function getAllPokemon() {
    try {
      // find will ALWAYS RETURN ARRAY
      const allPokemonCards = await PokeModel.find()

      // send back score data and a status 200 if everything goes alright
      res.status(200).send({
        message: 'Here is the list of pokemons',
        payload: allPokemonCards,
      })
    } catch (e) {
      // send back error mesage as an object
      res.status(400).send({
        message: 'error happened',
        data: e,
      })
    }
  }

  // needs to be calling the async function
  console.log(data)
  getAllPokemon()
})


// Update ONE document score with an ID and data that wants to be updated
app.put('/update-score', (req, res) => {
  // grab the new score info
  const data = req.body

  async function updateScore() {
    try {
      // create a new score in the database
      const newScore = await scoreModel.findByIdAndUpdate(
        // grab _id from body -> then add what data to update
        data._id,
        {
          score: data.score,
          username: data.username,
        },
      )

      // send back score data and status 201
      res.status(201).send({
        // display new username
        message: `Updated Player's username and score`,
        payload: newScore,
      })
    } catch (e) {
      console.log(e)
      // send back error mesage
      res.status(400).send({
        message: 'error happened - User was not created',
        data: e,
      })
    }
  }

  updateScore()
})


/*
// deleting ONE score document from leaderboard from an ID
app.delete('/delete-score', (req, res) => {
  // grab the new score info
  const data = req.body

  async function deleteScore() {
    try {
      // find the document with the ID input on an API for it to perform the delete action with .findByIdAndDelete
      const deletedScore = await scoreModel.findByIdAndDelete(data._id)

      // send back score data and status ok
      res.status(201).send({
        message: `Deleted Player`,
        payload: deletedScore,
      })
    } catch (e) {
      console.log(e)
      // send back error mesage
      res.status(400).send({
        message: 'error happened',
        data: e,
      })
    }
  }

  deleteScore()
})

// getting ONE score document from an ID
app.get('/get-score', (req, res) => {
  // grab the new score info
  const data = req.body

  async function getScore() {
    try {
      // find the document with the ID input on an API for it to perform the get action with .findByIdAndget
      const getScore = await scoreModel.findById(data._id)

      // send back score data and status ok
      res.status(201).send({
        message: `User's stats`,
        payload: getScore,
      })
    } catch (e) {
      console.log(e)
      // send back error mesage
      res.status(400).send({
        message: 'error happened',
        data: e,
      })
    }
  }

  getScore()
})
*/
// server listens on port 3000
app.listen(PORT, () => {
  console.log(`Server is running on port:`, PORT)
  console.log(`localhost:${PORT}`)
})
