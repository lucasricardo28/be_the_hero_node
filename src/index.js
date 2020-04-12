const express = require('express');
const route = require('./route.js');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(route);
app.use(cors())

app.listen(3333)