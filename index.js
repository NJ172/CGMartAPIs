const express = require('express')
const app = express()
const winston = require('winston')
const cors = require('cors')

app.use(cors())
require('./startup/logging')()
require('./startup/routes')(app)
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')()
//throw new Error('Application crashed outside Express...');

const port = process.env.port || 3001
app.listen(port, ()=> winston.info(`Listening on port ${port}....`))