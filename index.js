const connectToMongo = require('./db.js');
const express = require('express');
var cors = require('cors')
const app = express();

app.use(cors());
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

connectToMongo();
// app.use(cors())
const port = 5000;
app.use(express.json());
app.use('/api/blog', require('./routes/blog'))
// app.use('/upload',express.static('upload'));


app.use('/api/auth', require('./routes/auth'))
app.use('/api/admin', require('./routes/admin'))

app.use('/uploads',express.static('uploads'));
app.listen(port, () => {
    console.log(`Blogpost listening on port ${port}`)
  })