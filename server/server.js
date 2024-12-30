const express = require('express');
const app = express();
const sequelize = require("./db/db.js")
const userRouter = require("./route/user.route.js")
const dotenv = require('dotenv');
dotenv.config();



app.use(express.json());


app.use('/user', userRouter);

app.listen(`${process.env.PORT}`, async (req, res) => {
    try {
        console.log(`server is running on ${process.env.PORT}`)
        await sequelize.authenticate();
        console.log('Database connected');
    } catch (error) {
        console.log(error)
    }
})