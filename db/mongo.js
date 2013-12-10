var mongoose = null;
var User = null, StoryPoint = null;

exports.init = function(mongoosePointer){
	mongoose = mongoosePointer;
	var userSchema = mongoose.Schema({
		mail: String
	});
	User = mongoose.model('User',userSchema);

	var foeSchema = mongoose.Schema({
		name: String,
		baseHp: Number,
		remainingHp: Number,
		speed: Number,
		def: Number,
		armor: Number,
		xp: Number,
		attrs: {
			Commun: Number,
			Const:Number,
			Cunning: -Number,
			Dext: Number,
			Magic: Number,
			Percep: Number,
			Strenght: Number,
			Willpow: Number
		},
		attacks: [mongoose.Schema.Types.Mixed],
		notes: String,
		alive: Boolean
	});
	Foe = mongoose.model('Foe',foeSchema);

	var storyPointSchema = mongoose.Schema({
			data:
				{
					story: String,
					xp: Number,
					loot: [String]
				},
			info:
				{
					userId: String,
					storytype: String,
					after: Number,
					until: Number
				},
			combat:
				{
					foes: [foeSchema]
				}
		});
	StoryPoint = mongoose.model('StoryPoint',storyPointSchema);
	return this;
}

exports.initGame = function(usermail){
	return new Game(usermail);
}

var Game = function(usermail){
	var user = getUser(usermail);
	//var storyline = getStoryline(user.id);
	//return {user: user, storyline: storyline};
}

var getUser = function(mail){
	return User.find({mail: mail});
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

exports.getStoryline = function(userid,callback){
	var storypoints = [];
	console.log("userid:"+userid);
	StoryPoint.find({'info.userId': ''+userid},function collectStoryPoints(err, storyPoints){
		callback(storyPoints);
	});
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