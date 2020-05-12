const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');

const app = express();

mongoose.connect('mongodb+srv://andriellyll:drica2303@cluster0-2kqav.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

app.use(cors());
app.use(express.json()); // entender requisições com o corpo no formato json
app.use(routes);

app.listen(3333, () => console.log('Example app listening at http://localhost:3333'))