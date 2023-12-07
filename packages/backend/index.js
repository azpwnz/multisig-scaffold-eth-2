const express = require('express');
const app = express();

app.get('/', (request, response) => {
  response.send('Hello World!');
});

app.listen(3005, () => {
  console.log('Example app listening on port 3005!');
});