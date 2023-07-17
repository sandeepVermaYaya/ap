const app = require('express')();
const { verifyApiKey } = require('../../middleware/auth')

app.use('/auth', verifyApiKey, require('./auth'))


module.exports = app

