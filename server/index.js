const express = require("express")
const mongoose = require("mongoose")
const config = require("config")
const authRouter = require("./routes/auth.routes")
const app = express()

const PORT = config.get('serverPort')


app.use(express.json())
app.use("/api/auth", authRouter)


// const corsOptions = { 
//     origin: 'http://localhost:3000',
//     optionsSuccessStatus: 200
// }

const start = async () => {
    try {
        await mongoose.connect(config.get("mongoDB"), { useNewUrlParser: true, useUnifiedTopology: true })

        app.listen(PORT, () => {
            console.log('Server started on port ', PORT)
        })
    } catch (e) {

    }
}

start()


