const path = require("path");
const express = require('express');
const mongoose = require('mongoose');

const userRoute = require('./routes/user');

const app = express();
const PORT = 8000;

mongoose.connect('mongodb://localhost:27017/wastemanagement')
.then(e => console.log('MongoDB Connected'));

app.set('view engine','ejs')
app.set("views",path.resolve("./views"));
app.use(express.static(path.join(__dirname, 'public'))); // to handle images
app.use(express.urlencoded({ extended: false})); // to handle form data



app.get('/',(req,res) => {
    res.render("home")
});

app.use("/user",userRoute);

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));
