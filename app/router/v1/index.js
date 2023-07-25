const app = require('express')();
const { verifyApiKey } = require('../../middleware/auth')


app.use('/auth', verifyApiKey, require('./auth'))
app.use('/user', verifyApiKey, require('./user'))

module.exports = app

