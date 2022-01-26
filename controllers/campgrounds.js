const Campground = require('../models/campground');
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geoCoder = mbxGeocoding({ accessToken : mapBoxToken})

module.exports.index = async (req, res, next) => {
    const campgrounds = await Campground.find({})
    res.render("campground/index", { campgrounds })
}

module.exports.renderNewForm = (req, res, next) => {
    res.render('campground/new');
}

module.exports.createCampground = async (req, res, next) => {
    const campground = new Campground(req.body.campground);
    campground.images = req.files.map(f => ({url: f.path, filename: f.filename}))
    campground.author = req.user._id;//First we make the account by req.body given by the form and then1
    await campground.save();
    // console.log(campground);
    req.flash('success', 'Succesfully created a new Campground!')
    res.redirect(`/campgrounds/${campground._id}`)
}

module.exports.showCampground = async (req, res, next) => {
    const { id } = req.params;
    const campground = await Campground.findById(req.params.id).populate({
        path: 'reviews',   //We have to populate the Author part only so we decided to go inside the reviews to access the author part  
        populate: {
            path: 'author' //Now to use author only we have to do this <--- use curly Braces //Use 'populate' inside 'populate' after the 'path' 
        }
    }).populate('author'); //Originally we use .populate('reviews').populate("author")....but both of these are associated to campground because they are Campground Schema Keys 
    // console.log(campground);
    if(!campground){
        req.flash('error', "Cannot find that campground!")
        res.redirect('/campgrounds');
    }
    res.render('campground/show', { campground })
}

module.exports.renderEditForm = async (req, res, next) => {
    const { id } = req.params;
    const campground = await Campground.findById(id)
    if(!campground){
        req.flash('error', "Cannot find that campground!")
        res.redirect('/campgrounds');
    }
    res.render('campground/edit', { campground })
}

module.exports.editCampground = async (req, res, next) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
    const imgs = req.files.map(f => ({url: f.path, filename: f.filename}))
    campground.images.push(...imgs)
    await campground.save()
    req.flash('success', 'Succesfully updated a Campground!')
    res.redirect(`/campgrounds/${campground._id}`)
}

module.exports.deleteCampground = async (req, res, next) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect('/campgrounds');
}