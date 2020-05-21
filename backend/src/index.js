const express = require('express');
const routes = require('./routes');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json()); // entender requisições com o corpo no formato json
app.use(routes);

app.listen(3333, () => console.log('Example app listening at http://localhost:3333'));