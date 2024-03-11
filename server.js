const dotenv = require('dotenv').config();

const pgp = require('pg-promise')();
const express = require('express');
const bodyParser = require('body-parser');

const db = pgp(process.env.DB_CONN);

const app = express();

app.use(bodyParser.json());

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});