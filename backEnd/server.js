const cookieParser = require('cookie-parser');
const express = require("express");
const cors = require('cors')
const app = express();
const port = 8000;

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

// This is where we import the  routes function from our users.routes.js file
require('./server/config/mongoose.config');

// This is where we import the routes function from our users.routes.js file
require('./server/routes/users.routes')(app);

// Environment Varible
require('dotenv').config();
const myFirstSecret = process.env.SECRET_KEY;




// This needs to at the bottom
app.listen(port, () => console.log(`Hey James, its me, your server. Im listening on port: ${port}`));