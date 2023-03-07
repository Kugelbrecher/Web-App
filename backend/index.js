const express = require("express");
// const bodyParser = require("body-parser"); // no longer need body-parser in express 4.+
const cookieParser = require("cookie-parser");
require('dot-env')
const auth = require("./src/auth");
const articles = require("./src/articles");
const profile = require("./src/profile");
const following = require("./src/following");
const upCloud = require("./src/uploadCloudinary");
const cors = require('cors');
const corsOptions = {origin: 'http://127.0.0.1:3000', credentials:true};


const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
upCloud.setup(app)

auth(app);
articles(app);
profile(app);
// following(app);


// Get the port from the environment, i.e., Heroku sets it
const port =  3001;
app.listen(port, () => console.log(`Server is listening on port ${port}`));

