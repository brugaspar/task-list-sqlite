require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const app = express()

const routes = require('./routes')

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use('/api', routes)

const PORT = 3333 || 3000
app.listen(PORT, () => console.log(`\nServer running at http://localhost:${PORT}\n`))