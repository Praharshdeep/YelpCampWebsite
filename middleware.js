//Middleware Function used everywhere is defined here to avoid multiwriting them.
//we describe here the middlewares which we can use to check whether the user is logged in or not on every single step where we wanted to
const { campgroundSchema, reviewSchema } = require('./schemas.js');//CampGround and eviewSchema re required
const ExpressError = require('./utils/ExpressError');
const Campground = require('./models/campground');
const Review = require('./models/review');

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {  //.isAuthenticated() is a function automatically added on the req object by passport which chexs if a user is logged in or not.
        req.session.returnTo = req.originalUrl;   //Session cookie stores the original url so that we can redirect back to the same page where we used this login
        req.flash('error', 'You must be signed in first!');
        return res.redirect('/login');
    }
    next();
} 
module.exports.validateCampground = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    if (!campground.author.equals(req.user._id)) {  //campground.author stores a id of the author and req.user is a key given to us by passport so that we can use it to see if their is a user and then we can check if the author's id is equal to the currentuser's id
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/campgrounds/${id}`);
    }
    next();
}

module.exports.isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review.author.equals(req.user._id)) { //Similar as above 
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/campgrounds/${id}`);
    }
    next();
}

module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }}