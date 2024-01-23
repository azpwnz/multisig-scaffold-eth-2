const express = require('express');
const cors = require('cors');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
// Middleware to allow cross-origin requests
app.use(cors());

let transactions = {};

app.listen(3005, () => {
  console.log('App listening on port 3005!');
});

app.post("/", function (request, response) {
  console.log("Received POST request", request.body); // your JSON

  response.send(request.body); // echo the result back

  const key = request.body.address + "_" + request.body.chainId;

  console.log("key:", key);

  if (!transactions[key]) {
    transactions[key] = {};
  }

  transactions[key][request.body.hash] = request.body;

  console.log("transactions", transactions);
});