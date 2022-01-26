const express = require('express');
const router = express.Router({mergeParams : true});
const catchAsync = require('../utils/catchAsync');
const Campground = require('../models/campground');
const Review = require('../models/review');
const { campgroundSchema, reviewSchema } = require('../schemas.js');
const ExpressError = require('../utils/ExpressError');
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware');
const { newReview } = require('../controllers/reviews');
const review = require('../controllers/reviews')


router.post('/',isLoggedIn, validateReview, catchAsync(review.newReview))

router.delete('/:reviewId',isLoggedIn ,isReviewAuthor, catchAsync(review.deleteReview))

module.exports = router;