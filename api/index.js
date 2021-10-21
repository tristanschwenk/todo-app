const express = require('express')
const Cron = require('./cron')


const app = express()

const categoryRoute = require('./routes/category')
const notesRoute = require('./routes/notes')


app.use(express.json())

app.use("/category", categoryRoute)
app.use("/notes", notesRoute)

app.all("/", (req, res) => {
  res.send("Welcome to the API")
})

app.listen(3001, () => {
  console.log("Server is running");
  Cron.start()
})

