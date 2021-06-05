var express  = require('express');
var app      = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');

// const { expressCspHeader, INLINE, NONE, SELF } = require('express-csp-header');
// app.use(expressCspHeader({
//     directives: {
//         'default-src': [NONE],
//         // 'script-src': [SELF, INLINE, 'somehost.com'],
//         // 'style-src': [SELF, 'mystyles.net'],
//         'img-src': [SELF],
//         // 'worker-src': [NONE],
//         // 'block-all-mixed-content': true
//     }
// }));


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/test', (req, res) => {
  console.log('OK!');
  res.send('ok');
})

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('www'));
}

app.get('*', (request, response) => {
  console.log('returning index.html');
	response.sendFile(path.join(__dirname,'www/index.html'));
});

app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
