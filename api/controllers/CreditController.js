/**
 * CreditController
 *
 * @description :: Server-side logic for managing credits
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    //Get user record along with associated credit record
    getCredit: function (req,res) {
        var userId = req.param('id');
        CreditService.get(userId, function (err, user) {
            if (err) return res.negotiate(err);

            return res.json(user);
        });
    },
    //Initiate credit for the user
    initCredit: function (req, res) {
        var userId = req.param('id');
        var initialValue = req.query.value;
        CreditService.init(userId, {
            initial: initialValue,
            available: initialValue,
            spent: 0
        }, function (err) {
            if (err) return res.negotiate(err);

            res.send(200);
        });
    },
    //Add to initial credit value
    addCredit: function (req, res) {
        var userId = req.param('id');
        var addedValue = req.query.value;

        CreditService.addValue(userId, addedValue, function (err, updated) {
            if (err) return res.negotiate(err);

            return res.json(updated);
        });
    }
};

