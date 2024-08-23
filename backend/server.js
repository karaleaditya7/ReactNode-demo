const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

app.use(bodyParser.json())
app.use(cors())

const port = 5000

mongoose.connect('mongodb://localhost:27017/myapp')

const nameScheme = new mongoose.Schema({
    firstName: String,
    lastName: String
})

const Name = mongoose.model('Name', nameScheme)


app.post('/add-name', async (req, res) => {
    const {firstName, lastName} = req.body

    try{
        const newName = new Name({firstName, lastName})
        await newName.save()
        res.status(201).send('Name addes successfully') 
    } catch (error) {
        res.status(500).send('Error adding name')
    }
})

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})