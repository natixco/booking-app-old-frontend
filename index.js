const express = require('express');
const app = express();
const path = require('path');

// app.use(express.static(path.join(__dirname, '/dist/bookly')));

// app.use('/*', (req, res) => {
//   res.sendFile(path.join(__dirname + '/dist/bookly/index.html'))
// })


// app.use(express.static(__dirname + '/dist/bookly'));

app.use(express.static(path.join(__dirname, '/dist/bookly')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/dist/bookly/index.html'))
})

app.listen(4200, function() {
	console.log(`Client server listening on: 4200`);
})