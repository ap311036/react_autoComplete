// LOAD MODULES =================================================================
let express    = require('express');
let serveIndex = require('serve-index');
let serveStatic = require('serve-static');
let path = require('path');
let app = express();
let router = express.Router();
let port = process.env.PORT || 7000;

// SETUP EXPRESS APPLICATION ====================================================
app.use('/', router);
app.use('/', serveIndex('./', {
    'icons': true,
    'view': 'details',
    'filter': function (filename, index, files, dir) {
        if (filename == 'node_modules' || filename == 'server.js' || /\.ejs$/.test(filename) || filename == 'gruntfile.js') {
            return false;
        } else {
            return true;
        }
    }
}));
app.use(serveStatic(__dirname, {
    'index': ['default.html', 'default.htm'],
}));

app.listen(port);

router.use('/', function (req, res, next) {
    console.log('%s %s', req.method, req.url || req.path);
    next();
});