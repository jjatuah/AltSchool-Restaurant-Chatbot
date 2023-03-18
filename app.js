const path = require("path");
const express = require("express");
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 7000

//Setting static folder
app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => console.log(`server running on port ${PORT}`))