const express = require('express');
require('dotenv').config();

const app = express();
const port = process.env.URL_PORT; // Use process.env.PORT or a default port like 4000

// Creating an app listening
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
