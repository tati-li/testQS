var controller = require('./controller');

function registerRoutes(app) {
  app.get(    '/api/pets',            controller.findAll);
  app.get(    '/api/pets/id/:id',     controller.findById);
  app.get(    '/api/pets/name/:name', controller.findByName);
  app.post(   '/api/pets',            controller.addItem);
  app.put(    '/api/pets/:id',        controller.updateItem);
  app.delete( '/api/pets/:id',        controller.deleteItem);
}

exports.registerRoutes = registerRoutes;