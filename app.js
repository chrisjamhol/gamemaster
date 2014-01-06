var Q = require('q');
var mongoose = require('mongoose');
	mongoose.connect('mongodb://localhost/gamemaster');
var db = require('./db/mongo.js').init(mongoose);

//db.addUser('chrisjamhol@gmail.com',function(user){console.log(user);});
// db.addChapter({
//     userId: "52a1bc7b8177ae7018000001",
//     name: "second chapter",
//     after: "52a83a3f3980b1281a000003",
//     storyPoints: []
// },function(chapter){console.log(chapter);});

//52b6cec4ae2f742003000001

// db.addStoryPoint('52b6cec4ae2f742003000001',{
//		after: '52b6cf5c48a16d6801000001',
//		name: 'second Storypoint',
//		story: 'storyline bla blaksjd df',
//		xp: 500,
//		loot: ['loot1','lootitem2','loot'],
//		foes: []
// },function(storypoint){console.log(storypoint);});

db.addFoe({
	"name": "Spider",
	"baseHp": 150,
//	"remainingHp": 150,
//	"speed": 20,
//	"def": 10,
//	"armor": 0,
//	"xp": 20,
//	"attrs": {
//		"Commun": 0,
//		"Const": 1,
//		"Cunning": 1,
//		"Dext": 5,
//		"Magic": 0,
//		"Percep": 3,
//		"Strenght": 3,
//		"Willpow": 0
//	},
//	"attacks": [
//		{"name":"Bite", "value":"1d6+2", "description": ""},
//		{"name":"Netz", "value":"1d6", "description":"stunn if tn 12 for max 3 Rounds !if Strenght(Might) > 10"}
//	],
//	"notes": "creepy",
	"alive": true
},function(foe){
	console.log(foe.name);
});

var express = require('express'),
  routes = require('./routes/routes.js'),
  api = require('./api/api.js');

api.setDb(db);

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set('view options', {
	layout: false
  });
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/public'));
  app.use(app.router);
});


app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);
app.get('/partials/:name', routes.partials);

// JSON API
app.get('/api/getchapters/:userid',api.getChapters);
app.get('/api/getstorypoints/:chapterid',api.getStoryPoints);

app.post('/api/post', api.addPost);
app.put('/api/post/:id', api.editPost);
app.delete('/api/post/:id', api.deletePost);

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);

// Start server

app.listen(3000, function(){
	console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
	console.log();
});


