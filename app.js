/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var MongoStore = require('connect-mongo')(express);
var flash = require('connect-flash');
var settings = require('./settings');
var partials = require('express-partials');

var app = express();

// all environments
app.configure(function(){
	app.set('port', process.env.PORT || 3000);
	app.set('views', path.join(__dirname, 'views'));
	app.set('view engine', 'ejs');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.json());
	app.use(express.urlencoded());
	app.use(express.methodOverride());
	app.use(express.cookieParser());
	app.use(partials());
	app.use(flash());
    app.use(express.session({
		secret: settings.cookieSecret,
		store: new MongoStore({
			db: settings.db
		})
	}));
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
});

//视图支持
/*app.dynamicHelpers({
	user: function(req, res){
		return req.session.user;
	},
	error: function(req, res){
		var err = req.flash('error');
		if(err.length){
			return err;
		}else{
			return null;
		}
	},
	success: function(req, res){
		var succ = req.flash('success');
		if(succ.length){
			return succ;
		}else{
			return null;
		}
	}
});*/

//development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//routes(app);

app.get('/', routes.index);
app.get('/u/:user', routes.user);
app.post('/post', routes.post);
app.get('/reg', routes.reg);
app.post('/reg', routes.doReg);
app.get('/login', routes.login);
app.post('/login', routes.doLogin);
app.get('/logout', routes.logout);
app.get('/users', user.list);
app.all('/getCaptcha', user.createCaptcha);
app.get('/checkCaptcha', user.checkCaptcha);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
