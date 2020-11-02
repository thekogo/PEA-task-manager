const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const bodyParser = require('body-parser')
const request = require('request')
// const functions = require('firebase-functions');

const taskRouter = require('./routes/taskRouter')
const userRouter = require('./routes/userRouter')
const lineRouter = require('./routes/lineRouter')
const alertRouter = require('./routes/alertRouter')

const app = express();
const port = process.env.PORT || 8080;
const ATLAS_URI = 'mongodb+srv://thekogo:Ko.157953@cluster0-p6gte.gcp.mongodb.net/test?retryWrites=true&w=majority'


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/tasks', taskRouter)
app.use('/users', userRouter)
app.use('/webhook', lineRouter)
app.use('/alert', alertRouter)


const uri = ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false});

const connection = mongoose.connection;

connection.once('open', () => {
    console.log("Mongoose Connected");
});

app.get('/', (req, res) => {
    res.send("OK");
})


// exports.pea = functions.https.onRequest(app);

app.listen(port, () => {console.log(`start server on port ${port}`)})