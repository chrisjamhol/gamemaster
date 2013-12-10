var User = StoryPoint = Foe = null;

var init = function(mongoosePointer){
	var Models = require('./models/models.js').do(mongoosePointer);
	User = Models.User;
	StoryPoint = Models.StoryPoint;
	Foe = Models.Foe;
	return this;
};

var getUser = function(mail){
	return db.User.find({mail: mail});
};

var addUser = function(mail,callback){
	var user = new User({mail: mail})
						.save(function afterUserAdd(err,user){
							if(err){
								console.log(err);
							}
							callback(user);
						});
};

var checkIfMailExists = function(mail){
	return typeof(mail) !== "undefined" ? true : false;
};

var addStoryPoint = function(storyData,callback){
	var storyPoint = new StoryPoint(storyData)
							.save(function afterStoryPointAdd(err,storyPoint){
								if(err){
									console.log(err);
								}
								callback(storyPoint);
							});
};

var getStoryline = function(userid,callback){
	var storypoints = [];
	console.log("userid:"+userid);
	StoryPoint.find({'info.userId': ''+userid},function collectStoryPoints(err, storyPoints){
		callback(storyPoints);
	});
};

module.exports = {
	init: init,
	addStoryPoint: addStoryPoint,
	getStoryline: getStoryline,
	addUser: addUser
};