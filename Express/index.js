const express = require('express')
const app = express()
require('./database.js')
const appRoute = require('./routes/app.route.js')


app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('static'))
app.use('/route', appRoute)

app.listen(5000, () => {
    console.log("Server started")
})