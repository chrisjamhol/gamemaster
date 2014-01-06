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

	Chapter.find = Q.nfbind(Chapter.find.bind(Chapter));
	Chapter.findOne = Q.nfbind(Chapter.findOne.bind(Chapter));
	StoryPoint.find = Q.nfbind(StoryPoint.find.bind(StoryPoint));
	StoryPoint.findOne = Q.nfbind(StoryPoint.findOne.bind(StoryPoint));
	Foe.find = Q.nfbind(Foe.find.bind(Foe));
	Foe.findOne = Q.nfbind(Foe.findOne.bind(Foe));
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
	Chapter.find({userId: userId}).then(
		function(chapters){deferred.resolve(chapters);},
		function(rejectReason){deferred.reject(rejectReason);}
	)
	.done();
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
	Chapter
	.findOne({_id: chapterId})
	.then(function(chapter){
		var deferred = Q.defer();
		var storypointPromises = [];
		chapter.storyPoints.map(function(storypointId){
			var deferred = Q.defer();
			StoryPoint
				.findOne({_id: storypointId})
				.then(function(storypoint){
					getFoes(storypoint._id)
					.then(function(foes){
						if(foes.length > 0){
							storypoint.foes = foes;
						}						
						deferred.resolve(storypoint);
					})
					.done();								
				},function(err){
					deferred.reject(err);
				})
				.done();
			storypointPromises.push(deferred.promise);
		});
		return Q.all(storypointPromises);	
	})
	.then(function(storypoints){
		deferred.resolve(storypoints);
	})	
	.done();
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
	StoryPoint
	.findOne({_id: storypointId})
	.then(function(storypoint){
		var deferred = Q.defer();
		var foePromises = [];
		storypoint.foes.map(function(foeId){
			var deferred = Q.defer();
			Foe
				.findOne({_id: foeId})
				.then(function(foe){
					deferred.resolve(foe);
				},function(err){
					deferred.reject(err);
				})
				.done();
			foePromises.push(deferred.promise);
		});
		return Q.all(foePromises);	
	})
	.then(function(foes){
		deferred.resolve(foes);
	})	
	.done();
	return deferred.promise;
};


/* Storyline */

var getStoryline = function(userid){
	var deferred = Q.defer();

	getChapters(userid)
	.then(function(chapters){
		var deferred = Q.defer();
		var chapterPromises = [];

		chapters.map(function(chapter){
			var deferred = Q.defer();
			getStroryPoints(chapter)
				.then(function(storyPoints){
					chapter.storyPoints = storyPoints;
					deferred.resolve(chapter);
				},function(err){
					deferred.reject(err);
				})
				.done();
			chapterPromises.push(deferred.promise);
		})
		.done();
		return Q.all(chapterPromises);
	})
	.then(function(chapters){
		deferred.resolve(chapters);		
	},function(err){
		deferred.reject(err);
	})
	.done();

	return deferred.promise;
};

module.exports = {
	init: init,

	addChapter: addChapter,
	getChapters: getChapters,
	
	addStoryPoint: addStoryPoint,
	getStoryPoints: getStoryPoints,

	addFoe: addFoe,
	getFoes: getFoes,
		
	addUser: addUser
};