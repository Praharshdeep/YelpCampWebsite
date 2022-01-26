if(process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}
const express = require("express"); //1
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const joi = require('joi');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const session = require("express-session");
const flash = require('connect-flash');

const catchAsync = require('./utils/catchAsync');
const ExpressError = require('./utils/ExpressError');

const { campgroundSchema, reviewSchema } = require('./schemas.js');

const Campground = require('./models/campground');
const Review = require('./models/review');
const User = require('./models/user');

const campgroundsRoutes = require('./routes/campground')
const reviewsRoutes = require('./routes/reviews')
const userRoutes = require('./routes/user')

//Sterp - 2
mongoose.connect('mongodb://localhost : 27017/yelpCamp', { //This is how we connect our node to our Database
    useNewUrlParser: true,                                 //
    useCreateIndex: true,                                  //
    useUnifiedTopology: true,                              //
    useFindAndModify: false                                //
})                                                         //
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express(); //2

//Ejs setting
app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

//Middleware inbuilt
app.use(express.urlencoded({ extended: true }))
//method.override middleware
app.use(methodOverride('_method'));
//Seving Static Assests for js and css files
app.use(express.static(path.join(__dirname, 'public')))

//Session coookie Configuration...
const sessionConfig = {
    secret: "this should be a better secret",
    saveUninitialized: true,
    resave: false,
    cookie: {
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
}

//session and flash middlewares
app.use(session(sessionConfig));
app.use(flash());

//Passport App Middleware
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser());

//Flash middleware to make a new variable called success and error so they are session variable
//and we can use them whenever we want yo
//Flash messages are stored in session as flah objects with erroe and succes as keys containing arrays of msgs as values
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    console.log(req.user)//To set CurrenUser...to manipulate the navbar or used in various purposes.
    res.locals.success = req.flash('success');//flash msgfor success
    res.locals.error = req.flash('error');//flash msg for err
    next();
})

//Router Middlewares
app.use('/',userRoutes);
app.use('/campgrounds', campgroundsRoutes);
app.use('/campgrounds/:id/reviews', reviewsRoutes)


//Home Page
app.get('/', (req, res) => {
    res.render('home')
})

//Any other Random Page
app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 400))
})

//Error Handler
app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = "Something Went Wrong!"
    res.status(statusCode).render('error', { err });
})

//Step-3
app.listen(3000, () => {
    console.log("Serving on port 3000!")
})