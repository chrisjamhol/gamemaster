var Q = require('q');
var User = null;
var Chapter = null;
var Foe = null;
var StoryPoint = null;

var init = function(mongoosePointer){
	var Models = require('./models/models.js').do(mongoosePointer);
	User = Models.User;
	Chapter = Models.Chapter;
	StoryPoint = Models.StoryPoint;
	Foe = Models.Foe;
	return this;
};

/* User */

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

/* Chapter */

var addChapter = function(chapterData,callback){
	var newChapter = new Chapter(chapterData).save(function afterChapterAdd(err,chapter){
		if(err){console.log(err);}
		else{callback(chapter);}
	});
};

var getChapters = function(userId){
	var deferred = Q.defer();

	return deferred.promise;
};

/* Storypoint */

var addStoryPoint = function(chapterId,storyData,callback){
	var storyPoint = new StoryPoint(storyData).save(function afterStoryPointAdd(err,storyPoint){
		if(err){console.log(err);}
		else{
			Chapter.findOne({chapterId: chapterId},function(err, chapter){
				chapter.storyPoints.push(storyPoint._id).save(function(err,chapter){
					if(err){console.log(err);}
					else {callback(storyPoint);}
				});
			});
		}
	});
};

var getStoryPoints = function(chapterId){
	var deferred = Q.defer();

	return deferred.promise;
};

/* Foe */

var addFoe = function(foeData,callback){
	var newFoe = new Foe(foeData).save(function afterFoeAdd(err,foe){
		if(err){console.log(err);}
		else{callback(foe);}
	});
};

var getFoes = function(storypointId){
	var deferred = Q.defer();

	return deferred.promise;
};


/* Storyline */

var getStoryline = function(userid){
	var deferred = Q.defer();
	Chapter
		.find({userId: userid})
		.populate('storyPoints')
		.exec(function(err,chapters){
			Foe
				.populate(chapters,{path: 'storyPoints.foes'},
					function(err,chapters){
						if(err) throw err;
						deferred.resolve(chapters);
					}
				);
		});
	return deferred.promise;
};

module.exports = {
	init: init,

	getStoryline: getStoryline,

	addChapter: addChapter,
	getChapters: getChapters,

	addStoryPoint: addStoryPoint,
	getStoryPoints: getStoryPoints,

	addFoe: addFoe,
	getFoes: getFoes,

	addUser: addUser
};