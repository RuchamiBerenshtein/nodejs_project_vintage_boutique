const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const mongoDB = 'mongodb://localhost:27017/my_database'

const connectToDatabase = async () => {
  try {
    await mongoose.connect(mongoDB)
    console.log('MongoDB connected')
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
  }
}

module.exports = connectToDatabase
