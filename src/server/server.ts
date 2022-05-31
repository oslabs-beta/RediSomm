const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');

app.use(express.json());
app.use(express.static('../../.Webpack/renderer/assets'));

app.listen(PORT);
