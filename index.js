// index.js
// Entry point for your Node.js application

// Import required modules
const express = require('express');
const cors = require('cors');

// Initialize the app
const app = express();

// Enable CORS for remote testing by FCC
app.use(cors({ optionsSuccessStatus: 200 })); // Some legacy browsers choke on 204

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Route for the homepage
app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/views/index.html`);
});

// First API endpoint
app.get("/api/hello", (req, res) => {
  res.json({ greeting: 'hello API' });
});

// API endpoint to handle date and timestamp conversions
app.get("/api/:date?", (req, res) => {
  const input = req.params.date;

  // Check if input is a valid date string
  const isValidDate = Date.parse(input);

  // Check if input is a valid Unix timestamp (whole number)
  const isValidUnixNumber = /^[0-9]+$/.test(input);

  // Check if input is empty
  const isEmpty = !input;

  // Variables to store the output
  let unixOutput = 0;
  let utcOutput = "";

  // Determine the output based on the input
  if (isValidDate) {
    unixOutput = new Date(input);
    utcOutput = unixOutput.toUTCString();
    return res.json({ unix: unixOutput.valueOf(), utc: utcOutput });
  } 
  else if (isNaN(isValidDate) && isValidUnixNumber) {
    unixOutput = new Date(parseInt(input, 10));
    utcOutput = unixOutput.toUTCString();
    return res.json({ unix: unixOutput.valueOf(), utc: utcOutput });
  } 
  else if (isEmpty) {
    unixOutput = new Date();
    utcOutput = unixOutput.toUTCString();
    return res.json({ unix: unixOutput.valueOf(), utc: utcOutput });
  } 
  else {
    return res.json({ error: "Invalid Date" });
  }
});

// Start the server and listen for requests
const listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`);
});
