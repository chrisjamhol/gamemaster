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

	Chapter.findQ = Q.nfbind(Chapter.find.bind(Chapter));
    Chapter.findOneQ = Q.nfbind(Chapter.findOne.bind(Chapter));
    StoryPoint.findQ = Q.nfbind(StoryPoint.find.bind(StoryPoint));
    StoryPoint.findOneQ = Q.nfbind(StoryPoint.findOne.bind(StoryPoint));
    Foe.findQ = Q.nfbind(Foe.find.bind(Foe));
    Foe.findOneQ = Q.nfbind(Foe.findOne.bind(Foe));

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

var newChapter = function(chapterData,callback){
	var newChapter = new Chapter(chapterData).save(function afterChapterAdd(err,chapter){
		if(err){console.log(err);}
		else{callback(chapter);}
	});
};

var saveChapterNames = function (changes){
	var deferred = Q.defer();
	Chapter
		.findOneQ({_id: changes.chapter.id})
		.then(
			function(chapter){
				var deferred = Q.defer();
				var storypointPromise = [];
				chapter.name = changes.chapter.name;
				chapter.save();
				changes.storyPoints.forEach(function(storypoint,key){
					var deferred = Q.defer();
					StoryPoint
						.findOneQ({_id: storypoint.id})
						.then(function(storypointDb){
								storypointDb.name = storypoint.name;
								storypointDb.save();
								deferred.resolve(storypointDb);
							})
						.done();
					storypointPromise.push(deferred.promise);
				});
				return Q.all(storypointPromise);
			},
			function(err){deferred.reject(err);}
		)
		.then(
			function(storypoints){deferred.resolve({"status": "ok"});},
			function(err){deferred.reject(err);}
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

	return deferred.promise;
};

var putStoryPointData = function(changes){
	var deferred = Q.defer();
	StoryPoint
		.findOneQ({_id: changes.storypoint.id})
		.then(
			function(storypoint){
				storypoint[changes.change.key] = storypoint[changes.change.val];
				storypoint.save();
				deferred.resolve(storypoint);
			},function(err){
				deferred.reject(err);
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

	newChapter: newChapter,
	saveChapterNames: saveChapterNames,

	addStoryPoint: addStoryPoint,
	getStoryPoints: getStoryPoints,

	addFoe: addFoe,
	getFoes: getFoes,

	addUser: addUser
};