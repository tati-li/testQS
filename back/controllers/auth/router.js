var controller = require('./controller');
//
function registerRoutes(app) {
   app.post( '/api/user',   controller.findByCreds);
   app.post( '/api/login',  controller.login);
   app.post( '/api/logout', controller.logout);
   app.post( '/api/registration', controller.registration);
   app.get( '/api/alluser', controller.findAll);
}

exports.registerRoutes = registerRoutes;