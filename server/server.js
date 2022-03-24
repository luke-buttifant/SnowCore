const express = require("express");
const dotenv = require('dotenv').config();
const connectDB = require('./database/db')
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3001;
const { errorHandler } = require("./middlewares/errorMiddleware");

//Database Connection
connectDB()

const app = express();

app.use(express.json())
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: false }))

//User Routes
app.use('/api/users', require('./routes/UserRoutes'))

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
  });

 
  app.use(errorHandler)



  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
})