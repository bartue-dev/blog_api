require("dotenv").config();
const express = require("express");
const credentials = require("./middleware/credentials");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const cookieParser = require("cookie-parser");
const router = require("./routes")
const app = express();


// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// middleware allows urlencoded data
app.use(express.urlencoded({extended:true}))

// middleware json
app.use(express.json());

// middleware for cookies
app.use(cookieParser());

//routes
app.use("/register", router.registerRoute);



const PORT = process.env.PORT || 3500
app.listen(PORT, () => console.log(`Server listening to PORT ${PORT}`));
