const express = require("express");
const dotenv = require('dotenv').config();
const connectDB = require('./database/db')
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3001;
const { errorHandler } = require("./middlewares/errorMiddleware");
const emailService = require('./email/emailService')
const monthlyData = require('./monthlyData/monthlyData')
const cron = require('node-cron');

//Database Connection
connectDB()
cron.schedule('6 13 * * *', () => {
  emailService()
  console.log('Run every ?? Cake is a lie..');

});
//save data about users
cron.schedule('* 59 23 31 * * *', () => {
  monthlyData.creataDataSet();
  
  console.log('Run every month');

});

const app = express();

app.use('/public', express.static('public'));

app.use(express.json())
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: false }))


//User Routes
app.use('/api/users', require('./routes/UserRoutes'))

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
  });

//Favourite Resorts Routes
app.use('/api/favourite', require('./routes/FavouriteRoutes'))
app.use('/api/weather', require('./routes/weatherRoutes'))

 //Admin dashbaord Routes
app.use('/api/dashboard', require('./routes/adminDashBoard'))
 
  app.use(errorHandler)

  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
})