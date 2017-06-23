module.exports = {
    init: function (userId, data, cb) {
        //Query the user and add a credit record for the first time to it
        User.findOne({
            id: userId
        }).populate('credit').exec(function (err, user) {
            user.credit.add(data);
            user.save(cb);
        });
    },
    get: function (userId, cb) {
        //Query the user and its associated credit
        User.findOne({
            id: userId
        }).populate('credit').exec(cb);
    },
    edit: function (userId, data, cb) {
        //Query the user and edit its associated credit record
        User.findOne({
            id: userId
        }).populate('credit').exec(function (err, user) {
            Credit.update({
                id: user.credit[0].id
            }, data).exec(cb);
        });
    },
    addValue: function (userId, addedValue, cb) {
        //Query the user and edit its associated credit record
        //The difference of this function with the above function
        // is that it just adds to the initial and available value
        User.findOne({
            id: userId
        }).populate('credit').exec(function (err, user) {
            Credit.update({
                id: user.credit[0].id
            }, {
                initial: Number(user.credit[0].initial) + Number(addedValue),
                available: Number(user.credit[0].available) + Number(addedValue)
            }).exec(cb);
        });
    }
}