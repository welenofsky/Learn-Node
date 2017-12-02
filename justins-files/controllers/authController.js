const passport = require('passport');


// exports.login = passport.authenticate('local', {
//     failureRedirect: '/login',
//     failureFlash: 'Failed Login!',
//     successRedirect: '/',
//     successFlash: 'You are now logged in!'
// });

exports.login = function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) { return next(err); }
        if (!user) {
            req.flash('error', 'Failed Login!');
            return res.redirect('/login');
        }
        req.logIn(user, function (err) {
            if (err) { return next(err); }
            // Remember Me!
            if(req.body.remember) {
                const sevenDays = 604800000;
                req.session.cookie.expires = new Date(Date.now() + sevenDays);
                req.session.cookie.maxAge = sevenDays;                
            }

            req.flash('success', 'You are now logged in!');
            return res.redirect('/');
        });
    })(req, res, next);
};


exports.logout = (req, res) => {
    req.logout();
    req.flash('success', 'You are now logged out 👋');
    res.redirect('/');
};

exports.isLoggedIn = (req, res, next) => {
    // First check if user is authenticated
    if (req.isAuthenticated()) {
        next();
        return;
    }
    req.flash('error', 'Oops you must be logged in!');
    res.redirect('/login');
}