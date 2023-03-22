const path = require('path');
const express = require('express');

const app = express();
app.use(express.static(path.join(__dirname, 'public'))); // serves static files from the public folder


const PORT = 3000 || process.env.PORT; // uses 3000 as a default port unless there exists a preconfigured port environment variable
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));