/**
 * MealController
 *
 * @description :: Server-side logic for managing meals
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    //Get all meals for one specific user
    meals: function (req, res) {
        var userId = req.param('id');
        MealService.getMeals(userId, function (err, user) {
            if (err) return res.negotiate(err);

            return res.json(user);
        });
    },
    orderMeal: function (req, res) {
        var userId = req.param('id');
        MealService.addMeal(userId, {
            name: req.query.name,
            price: req.query.price
        }, function (err) {
            if (err) return res.negotiate(err);

            res.send(200);
        });
    },
    cancelMeal: function (req, res) {
        var userId = req.param('id');
        var mealId = req.param('mealId');
        MealService.removeMeal(userId, mealId, function (err) {
            if (err) return res.negotiate(err);

            res.send(200);
        });
    }
};

