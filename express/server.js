const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 5000;

// middlewares
app.use(express.json());
app.use(cors());

// routes
const itemRoutes = require('./routes/item.route');
app.use(itemRoutes);

// start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
