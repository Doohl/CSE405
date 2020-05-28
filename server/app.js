/**
 * A simple chat application for CSE 405.
 * 
 * To install:
 *  npm install
 * 
 * To test:
 *  npm test
 * 
 * To run:
 *  npm run
 */


const express = require('express');
const app = express();
const port = 5555;

app.use(express.static('web'));

app.listen(port, () => {
    console.log(`App serving static assets on ${port}`);
});