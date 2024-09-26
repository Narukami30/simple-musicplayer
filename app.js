const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const musicRoutes = require('./routes/music');

const app = express();
const port = 3000;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.set('view engine', 'ejs');


app.use('/', musicRoutes);
app.listen(process.env.PORT || 8080, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT || 8080}`);
});