const express = require('express');
const path = require('path');
const cors = require('cors');
const socket = require('socket.io');

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  cors({ origin: 'http://localhost:3000', methods: 'GET, POST, PUT, DELETE' })
);

app.use((req, res, next) => {
  req.io = io;
  next();
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));

const testimonialsRoutes = require('./routes/testimonials.routes');
const seatsRoutes = require('./routes/seats.routes');
const concertsRoutes = require('./routes/concert.routes');

app.use('/api', testimonialsRoutes);
app.use('/api', seatsRoutes);
app.use('/api', concertsRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.use((req, res) => {
  res.status(404).send({ message: '404 not found...' });
});

const server = app.listen(8000, () => {
  console.log('Server is runnng on port: 8000');
  console.log('Start working NOW!!');
});

const io = socket(server);

io.on('connection', socket => {
  console.log('client with ID:', socket.id, ' has just logged');
  socket.on('disconnect', () => {
    console.log('client ID: ', socket.id, ' has just left');
  });
});
