require('dotenv').config()

const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const router = require('./routers/index')
const errorHandler = require('./middleware/ErrorHandlerMiddleware')
const fileupload = require('express-fileupload')
const path = require('path')
const methodOverride = require('method-override');

const PORT = process.env.PORT || 5002

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileupload({}))
app.use('/api', router)

app.use(errorHandler)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()

        app.listen(PORT, "0.0.0.0", function () {
            console.log('сервер начал работу')
        });
    } catch (e) {
        console.error('Ошибка при запуске сервера:', e)
    }
}

start()
