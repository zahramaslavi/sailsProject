module.exports = {
    getMeals: function (userId, cb) {
        //Here we query the user record
        // along with all associated meals
        User.findOne({
            id: userId
        }).populate('meals').exec(cb);
    },
    addMeal: function (userId, data, cb) {
        //Here we query the user record
        // along with all associated meals and credit
        //for adding meal we have to edit the associated credit record too
        //Then we add the meal to the associated meals
        User.findOne({
            id: userId
        }).populate('meals').populate('credit').exec(function (err, user) {

            CreditService.edit(userId, {
                available: Number(user.credit[0].available) - Number(data.price),
                spent: Number(user.credit[0].spent) + Number(data.price)
            }, function (err, credit) {
                if(err) sails.log.debug(err);
            });

            user.meals.add({
                name: data.name,
                price: data.price
            });
            user.save(cb);
        });
    },
    removeMeal: function (userId, mealId, cb) {
        //Here we query the user record
        // along with all associated meals and credit
        //for removing meal we have to edit the associated credit record too
        //Then we remove the meal from the associated meals
        User.findOne({
            id: userId
        }).populate('meals', {id: mealId}).populate('credit').exec(function (err, user) {
            CreditService.edit(userId, {
                available: Number(user.credit[0].available) + Number(user.meals[0].price),
                spent: Number(user.credit[0].spent) - Number(user.meals[0].price)
            }, function (err, credit) {
                if(err) sails.log.debug(err);
            });

            Meal.destroy({id: mealId}).exec(cb);
        });
    }
}