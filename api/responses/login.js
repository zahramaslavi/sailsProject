/*
* res.login([inputs])
*
* @param {string} inputs.username
* @param {string} inputs.password
*
* @description :: Log the requesting user in using a passport strategy
* */

module.exports = function login(inputs) {
    inputs = inputs || {};

    //Get access to 'req' and 'res'
    var req = this.req;
    var res = this.res;

    User.attemptLogin({
        email: inputs.email,
        password: inputs.password
    }, function (err, user) {
        if (err) return res.negotiate(err);
        if(!user) {
            if (req.wantsJSON || !inputs.invalidRedirect) {
                return res.badRequest('Invalid username/password combination.')
            }

            return res.redirect(inputs.invalidRedirect);
        }

        req.session.me = user.id;

        if (req.wantsJSON || !inputs.successRedirect) {
            return res.ok();
        }

        return res.redirect(inputs.successRedirect);
    });
}