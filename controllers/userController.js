const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../config/config')
const UserFromDB = require('../models/user')

const signup = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10)
    const hasPassword = await bcrypt.hash(req.body.password, salt)
    const newUser = new UserFromDB({ username: req.body.username, password: hasPassword, email: req.body.email, role: req.body.role })
    await newUser.save()
    res.status(201).send('User saved successfully')
  } catch (err) {
    console.error(err)
    res.status(500).send(err.message)
  }
}

const login = async (req, res) => {
  try {
    const user = await UserFromDB.findById(req.body.id)
    if (!user) { res.status(404).send('User not found') }

    const validPass = await bcrypt.compare(req.body.password, user.password)
    if (!validPass) { res.status(401).send('Invalid password') }

    const token = jwt.sign({ id: user.id, userName: user.userName }, config.TOKEN_SECRET)

    res.header('auth-token', token).send({ token })
  } catch (err) {
    res.status(500).send(err.message)
  }
}

module.exports = {
  signup,
  login
}
