var db = null;

exports.init = function(mongoosePointer){
	db = require('./models/models.js').do(mongoosePointer);
}

var getUser = function(mail){
	return db.User.find({mail: mail});
}

exports.addUser = function(mail,callback){
	var user = new User({mail: mail})
						.save(function afterUserAdd(err,user){
							if(err){
								console.log(err);
							}
							callback(user);
						});
}

var checkIfMailExists = function(mail){
	return typeof(mail) !== "undefined" ? true : false;
}

var getStoryline = function(userid){
	var storypoints = [];
	StoryPoint.find({'info.userId': userid},function collectStoryPoints(err, storyPoint){
		storypoints.push(storyPoint);
	});
	return storypoints;
}

exports.addStoryPoint = function(storyData,callback){
	console.log(storyData);
	var storyPoint = new StoryPoint(storyData)
							.save(function afterStoryPointAdd(err,storyPoint){
								if(err){
									console.log(err);
								}
								callback(storyPoint);
							});
}