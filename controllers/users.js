const User = require("../models/user");

module.exports.renderRegister = (req, res) => {
    res.render('users/register');
}

module.exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = new User({ email, username })
        const registeredUser = await User.register(user, password);//passport built in function automaticlly ends up saving the hashed version password
        req.login(registeredUser, err => { //we need this to keep logged in immediately after registering(need new user and a err callback)
            if (err) return next(err);
            req.flash('success', 'Welcome to Yelp Camp!');
            res.redirect('/campgrounds');
        })
    }
    catch (e) {
        req.flash('error', e.message)
        res.redirect('/register')
    }
}

module.exports.renderLogin = (req, res) => {
    res.render('users/login')
}

module.exports.login = (req, res) => {
    req.flash('success', 'welcome back!');
    const redirectUrl = req.session.returnTo || '/campgrounds';//here we decide what is the value of the return to key in the session cookie
    delete req.session.returnTo;//we delete it further because we dont wannt to redirect to this again
    res.redirect(redirectUrl);//now redirect to euther campgrounds or the url obtained from returnTo object
    //It saves us from redirecting to the same page again and again after we call isLoggedIn function which always redirects us to the campgrounds page
    //here we can simply use the returnTo address to save us from this.
}

module.exports.logout = (req, res) => {
    req.logout();//built in function in passport automatically adds up to the req object
    req.flash('success', "Goodbye!");
    res.redirect('/campgrounds');
}