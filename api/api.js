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

exports.newChapter = function(req, res){
	db.newChapter(req.body)
		.then(function(chapters){
			res.json(true);
		})
		.done();
};

exports.newStoryPoint = function(req, res){
	db.newStoryPoint(req.body)
		.then(function(storypoint){
			res.json(true);
		})
		.done();
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

exports.saveLoot = function(req, res){
	db.saveLoot(req.body)
		.then(function(storypoint){
			res.json(true);
		})
		.done();
};

exports.addLootItem = function(req, res){
	db.addLootItem(req.params.storypointid)
		.then(function(storypoint){
			res.json(storypoint);
		})
		.done();
};

exports.saveFoe = function(req, res){
	db.saveFoe(req.body)
		.then(function(foe){
			res.json(foe);
		})
		.done();
};

exports.newFoeAttack = function(req, res){
	db.newFoeAttack(req.params.foeid)
		.then(function(attacks){
			res.json(attacks);
		})
		.done();
};

// DELETE

exports.deleteChapter = function(req, res){
	db.deleteChapter(req.params)
		.then(function(user){
			res.json(true);
		})
		.done();
};

exports.deleteStoryPoint = function(req, res){
	db.deleteStoryPoint(req.params)
		.then(function(chapter){
			res.json(true);
		})
		.done();
};

exports.deleteLootItem = function(req, res){
	db.deleteLootItem(req.params)
		.then(function(storypoint){
			res.json(storypoint);
		})
		.done();
};

exports.deleteFoe = function(req, res){
	db.deleteFoe(req.params)
		.then(function(foes){
			res.json(foes);
		})
		.done();
};

exports.deleteFoeAttack = function(req, res){
	db.deleteFoeAttack(req.params)
		.then(function(attacks){
			res.json(attacks);
		})
		.done();
};

exports.deletePost = function (req, res) {
	var id = req.params.id;

	if (id >= 0 && id < data.posts.length) {
		data.posts.splice(id, 1);
		res.json(true);
	} else {
		res.json(false);
	}
};