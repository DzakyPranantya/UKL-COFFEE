const express = require(`express`)
const coffeeController = require(`../controllers/coffee.controller`)
const auth = require('../controllers/auth.controller')
const app = express()
app.use(express.json())

app.get('/', coffeeController.getAll)
app.get('/:keyword', coffeeController.findCoffee)
app.get('/string/:keyword', coffeeController.findCoffeeString)

app.post('/', auth.authorize, coffeeController.addCoffee)
app.put('/:id', auth.authorize, coffeeController.updateCoffee)
app.delete('/:id', auth.authorize, coffeeController.deletCoffee)

module.exports = app