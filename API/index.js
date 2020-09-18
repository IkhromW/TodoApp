const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const { userRouter }  = require('./route')
const port = 2002;

app.get('/', (req,res) => {
    res.status(200).send(`<h1>LATIHAN 2 API<h1>`)
})
app.use(bodyParser())
app.use(cors())
app.use('/users',userRouter);

app.listen(port, () => {
    console.log(`app start at port : ${port}`);
    
})
