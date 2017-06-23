/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    login: function(req, res) {
        return res.login({
            email: req.param('email'),
            password: req.param('password'),
            successRedirect: '/',
            invalidRedirect: '/login'
        });
    },
    logout: function (req, res) {
        req.session.me = null;

        if (req.wantsJSON) {
            return res.ok('Logged out successfully!');
        }

        return res.redirect('/');
    },
    signup: function (req, res) {
        User.signup({
            name: req.param('name'),
            email: req.param('email'),
            password: req.param('password')
        }, function (err, user) {
           if (err) return res.negotiate(err);

           req.session.me = user.id;

           if (req.wantsJSON) {
               return res.ok('Signup successful!');
           }

           return res.redirect('/welcome')
        });
    },
    welcome: function (req, res) {
        return res.view('user/welcome');
    }
};

