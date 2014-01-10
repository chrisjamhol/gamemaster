var Q = require('q');
var db = null;

exports.setDb = function(dbP){db = dbP;};

exports.getStoryline = function(req,res){
	db.getStoryline(req.params.userid)
		.then(function(storyline){
			res.json(storyline);
		},function(reject){
			console.log(reject);
		})
		.done();
};

// GET

exports.posts = function (req, res) {
	var posts = [];
	data.posts.forEach(function (post, i) {
		posts.push({
			id: i,
			title: post.title,
			text: post.text.substr(0, 50) + '...'
		});
	});
	res.json({
		posts: posts
	});
};

exports.post = function (req, res) {
	var id = req.params.id;
	if (id >= 0 && id < data.posts.length) {
		res.json({
			post: data.posts[id]
		});
	} else {
		res.json(false);
	}
};

// POST

exports.addPost = function (req, res) {
	data.posts.push(req.body);
	res.json(req.body);
};

exports.newChapter = function(req, res){
	db.newChapter(req.body,function(data){
		console.log(data);
	});
};

// PUT

exports.editPost = function (req, res) {
	var id = req.params.id;

	if (id >= 0 && id < data.posts.length) {
		data.posts[id] = req.body;
		res.json(true);
	} else {
		res.json(false);
	}
};

exports.saveChapterNames = function(req, res){
	db.saveChapterNames(req.body)
		.then(function(data){
			console.log(data);
			res.json({"status": "ok"});
		})
		.done();
};

exports.putStoryPointData = function(req, res){
	db.putStoryPointData(req.body)
		.then(function(storypoint){
			res.json(storypoint);
		})
		.done();
};

// DELETE

exports.deletePost = function (req, res) {
	var id = req.params.id;

	if (id >= 0 && id < data.posts.length) {
		data.posts.splice(id, 1);
		res.json(true);
	} else {
		res.json(false);
	}
};