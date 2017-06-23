module.exports.routes = {

  //HTML views
  '/': { view: 'homepage' },
  'get /login': { view: 'user/login' },
  'get /signup': { view: 'user/signup' },

  // Auth Endpoints
  'post /login': 'UserController.login',
  'post /signup': 'UserController.signup',
  'get /logout': 'UserController.logout',
  '/welcome': 'UserController.welcome',

  //Credits Endpoints
  '/user/:id/credit': 'CreditController.getCredit',
  '/user/:id/credit/init': 'CreditController.initCredit',
  '/user/:id/credit/add': 'CreditController.addCredit',

  //Credits Endpoints
  '/user/:id/meals': 'MealController.meals',
  '/user/:id/meal/order': 'MealController.orderMeal',
  '/user/:id/meal/:mealId/cancel': 'MealController.cancelMeal',

};
