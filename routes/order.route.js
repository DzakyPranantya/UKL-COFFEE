const express = require(`express`)
const orderController = require(`../controllers/order.controller`)
const auth = require('../controllers/auth.controller')
const app = express()
app.use(express.json())

app.get('/', orderController.findAll)
app.post('/', auth.authorize, orderController.addOrder)

module.exports = app