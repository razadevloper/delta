const User = require("../model/user");

module.exports.renderSignupForm = (req, res) => {
    res.render("users/signup.ejs");
};

module.exports.renderLoginForm = (req, res) => {
    res.render("users/login.ejs");
};

module.exports.signup = async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registredUser = await User.register(newUser, password);
        req.login(registredUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "Welcome To WanderLust!!");
            res.redirect("/listings");
        });
        // console.log(registredUser);
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup",)
    }
};


module.exports.login = async (req, res) => {
    req.flash("success", "Welcome back to wanderlust!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};


module.exports.logout = (req, res, next) => {
    req.logOut((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "You are logged out now");
        res.redirect("/listings");
    });
}