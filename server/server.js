"use strict";

const app = require('./app');
const port = 3003;

// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
