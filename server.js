/**
 * Created by ТАНЯ on 19.03.15.
 */
var express  = require('express'),
  logger     = require('express-logger'),
  bodyParser = require('body-parser'),
  fs         = require('fs'),
  mime       = require('mime'),
  path       = require('path');

var app = express();

function serveFile (req, res) {
  var filePath = req.url.indexOf('/front') === -1 ? __dirname + '/front/index.html' : __dirname + req.url;

  fs.readFile(path.resolve(filePath), {encoding: 'utf-8'}, function (err, data) {
    if (!err) {
      res.writeHead(200, {'Content-Type': mime.lookup(filePath)});
      res.write(data);
      res.end();
    } else {
      console.log(err);
    }

  });
}

//app.use(logger({path: "/back/logs/log.txt"}));
app.use(bodyParser());

fs.readdirSync(__dirname + '/back/controllers').forEach(function (entity) {
  var routerFname = './back/controllers/' + entity + '/router';
  var router = require(routerFname);
  router.registerRoutes(app);
});

app.get(/^(\/)(front)(.*)$/, serveFile);

// any GET request
app.get(/^(\/)(?!api)(.*)$/, serveFile);

app.listen(5000);
console.log('petsening on port 5000...');

