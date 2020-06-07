const express = require('express');
const app = express();
const port = process.env.PORT || 80;

app.use(express.static('web'));

app.listen(port, () => {
    console.log(`App serving static assets on ${port}`);
});