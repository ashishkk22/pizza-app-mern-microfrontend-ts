const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const ImageKit = require('imagekit');
const authRouter = require('./routers/authRouter');

const imagekit = new ImageKit({
  urlEndpoint: process.env.NX_IMAGE_KIT_URL,
  publicKey: process.env.NX_IMAGE_KIT_PUBLIC_KEY,
  privateKey: process.env.NX_IMAGE_KIT_PRIVATE_KEY,
});

app.use(cookieParser());
app.use(
  cors({
    origin: [
      process.env.NX_CLIENT_LINK,
      'http://localhost:4203',
      'https://pizza-microfrontend.netlify.app',
      'https://auth-pizza.netlify.app',
    ],
    credentials: true,
    exposedHeaders: ['Access-Control-Allow-Private-Network'],
  })
);

app.use(morgan('dev'));
app.use(express.json());
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'https://auth-pizza.netlify.app');
  if (req.headers['access-control-request-private-network']) {
    res.header('Access-Control-Allow-Private-Network', 'true'); // Modify this line
  }
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Credentials', 'true');

  next();
});

const db_link = process.env.NX_MONGODB_URL;

mongoose
  .connect(db_link, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(function (db) {
    console.log('db is connected');
  })
  .catch(function (err) {
    console.log(err);
  });

const PORT = process.env.NX_PORT_API || 5000;

server.listen(PORT, () => {
  console.log('Listening on port `' + PORT + '`');
});

app.get('/auth', function (req, res) {
  var result = imagekit.getAuthenticationParameters();
  res.send(result);
});

app.use('/user', authRouter);
