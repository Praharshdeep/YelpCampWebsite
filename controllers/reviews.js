const Campground = require('../models/campground');
const Review = require('../models/review');

module.exports.newReview = async (req, res, next) => {
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id  //Before Pushing the review we gave the Key author the cuurent User Id which is in the req.user, a key added by passport containing the data of the logged user.
    campground.reviews.push(review); //then we push it
    await review.save();
    await campground.save();
    req.flash('success', 'Succesfully reviewed!!')
    res.redirect(`/campgrounds/${campground._id}`)
}

module.exports.deleteReview = async(req, res ,next) =>  {
    const {id, reviewId} = req.params;
    const campground = await Campground.findByIdAndUpdate(id, {$pull : {reviews : reviewId}});
    await Review.findByIdAndDelete(req.params.reviewId);
    req.flash('success', 'Succesfully deleted!!')
    res.redirect(`/campgrounds/${id}`);
}

