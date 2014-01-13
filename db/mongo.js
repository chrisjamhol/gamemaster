var Q = require('q');
var User = null;
var Chapter = null;
var Foe = null;
var StoryPoint = null;
var Helper = null;

var init = function(mongoosePointer){
	var Models = require('./models/models.js').do(mongoosePointer);
	User = Models.User;
	Chapter = Models.Chapter;
	StoryPoint = Models.StoryPoint;
	Foe = Models.Foe;
	Helper = Models.Helper;

	User.findQ = Q.nfbind(User.find.bind(User));
	User.findOneQ = Q.nfbind(User.findOne.bind(User));
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

var newChapter = function(chapterData){
	//newChapter
	var deferred = Q.defer();
	var newChapter = new Chapter({name: chapterData.chapterName})
		.save(function afterNewChapterSave(err,chapter){
			if(err) throw err;
			User
				.findOneQ({_id: chapterData.userId})
				.then(function(user){
					if(user.chapters.length > 0){
						user.chapters.splice(chapterData.pos,0,chapter._id);
					}else{
						user.chapters.push(chapter._id);
					}
					user.save(function(err,user){
						if(err) throw err;
						deferred.resolve(user.chapters);
					});
				})
				.done();
		});
	return deferred.promise;
};

var deleteChapter = function(chapterData){
	var deferred = Q.defer();
	User
		.findOneQ({_id: chapterData.userid})
		.then(function(user){
			user.chapters.splice(user.chapters.indexOf(chapterData.chapterid),1);
			user.save(function(user){
				Chapter
					.findOneQ({_id: chapterData.chapterid})
					.then(function(chapter){
						chapter.remove();
						deferred.resolve(user);
					})
					.done();
			});
		})
		.done();
	return deferred.promise;
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

var newStoryPoint = function(storyPointData){
	var deferred = Q.defer();
	var newStoryPoint = new StoryPoint({name: storyPointData.name}).save(function afterNewStoryPointSave(err,storyPoint){
		if(err) throw err;
		Chapter
			.findOneQ({_id: storyPointData.chapterId})
			.then(function(chapter){
				if(chapter.storyPoints.length > 0){
					chapter.storyPoints.splice(storyPointData.pos,0,storyPoint._id);
				}else{
					chapter.storyPoints.push(chapter._id);
				}
				chapter.save(function(err,chapter){
					if(err) throw err;
					deferred.resolve(chapter.storyPoints);
				});
			})
			.done();
	});
	return deferred.promise;
};

var putStoryPointData = function(changes){
	var deferred = Q.defer();
	StoryPoint
		.findOneQ({_id: changes.storypoint.id})
		.then(
			function(storypoint){
				console.log(storypoint);
				console.log(changes);
				storypoint[changes.change.key] = changes.change.val;
				storypoint.save();
				console.log(storypoint);
				deferred.resolve(storypoint);
			},function(err){
				deferred.reject(err);
			})
		.done();
	return deferred.promise;
};

var saveEncounterChange = function(changes){

};

var deleteStoryPoint = function(storyPointData){
	var deferred = Q.defer();
	console.log(storyPointData);
	Chapter
		.findOneQ({_id: storyPointData.chapterid})
		.then(function(chapter){
			chapter.storyPoints.splice(chapter.storyPoints.indexOf(storyPointData.storypointid),1);
			chapter.save(function(chapter){
				StoryPoint
					.findOneQ({_id: storyPointData.storypointid})
					.then(function(storypoint){
						storypoint.remove();
						deferred.resolve(chapter);
					})
					.done();
			});
		})
		.done();
	return deferred.promise;
};

var saveLoot = function(change){
	var deferred = Q.defer();
	StoryPoint
		.findOneQ({_id: change.storypointid})
		.then(function(storypoint){
			storypoint.loot = change.loot;
			storypoint.save();
			deferred.resolve(storypoint);
		})
		.done();
	return deferred.promise;
};

var deleteLootItem = function(params){
	var deferred = Q.defer();
	StoryPoint
		.findOneQ({_id: params.storypointid})
		.then(function(storypoint){
			storypoint.loot.splice(params.index,1);
			storypoint.save(function(err,storypoint){
				if(err) throw err;
				deferred.resolve(storypoint);
			});
		})
		.done();
	return deferred.promise;
};

var addLootItem = function(storypointid){
	var deferred = Q.defer();
	StoryPoint
		.findOneQ({_id: storypointid})
		.then(function(storypoint){
			storypoint.loot.push("");
			storypoint.save(function(err,storypoint){
				if(err) throw err;
				deferred.resolve(storypoint);
			});
		})
		.done();
	return deferred.promise;
};

/* Foe */

var saveFoe = function(foeData){
	var deferred = Q.defer();
	Foe
		.findOneQ({_id: foeData._id})
		.then(function(foe){
			Object.keys(foeData).forEach(function(key){
				foe[key] = foeData[key];
			});
			foe.save(function(err,newFoeData){
				if(err) throw err;
				deferred.resolve(newFoeData);
			});
		})
		.done();
	return deferred.promise;
};

var deleteFoe = function(foeData){
	var deferred = Q.defer();
	StoryPoint
		.findOneQ({_id: foeData.storypointid})
		.then(function(storypoint){
			storypoint.foes.splice(foeData.index,1);
			storypoint.save(function(err,storypoint){
				if(err) throw err;
				deferred.resolve(storypoint.foes);
			});
		})
		.done();
	return deferred.promise;
};

var deleteFoeAttack = function(attackData){
	var deferred = Q.defer();
	Foe
		.findOneQ({_id: attackData.foeid})
		.then(function(foe){
			foe.attacks.splice(attackData.attackindex,1);
			foe.save(function(err, foe){
				if(err) throw err;
				deferred.resolve(foe.attacks);
			});
		})
		.done();
	return deferred.promise;
};

var newFoeAttack = function(foeid){
	var deferred = Q.defer();
	Foe
		.findOneQ({_id: foeid})
		.then(function(foe){
			foe.attacks.push({name: "",value: "",description: ""});
			foe.save(function(err, foe){
				if(err) throw err;
				deferred.resolve(foe.attacks);
			});
		})
		.done();
	return deferred.promise;
};

/* Storyline */

var getStoryline = function(userid){
	var deferred = Q.defer();
	User
		.findOne({_id: userid})
		.populate('chapters')
		.exec(function(err,user){
			if(err) throw err;
			StoryPoint
				.populate(user,{path: 'chapters.storyPoints'},function(err,user){
					if(err) throw err;
					Foe
						.populate(user,{path: 'chapters.storyPoints.foes'},function(err,user){
								if(err) throw err;
								deferred.resolve(user.chapters);
							}
						);
				});
		});
	return deferred.promise;
};

/* helpers */



/* exports */
module.exports = {
	init: init,

	getStoryline: getStoryline,

	newChapter: newChapter,
	deleteChapter: deleteChapter,
	saveChapterNames: saveChapterNames,

	addStoryPoint: addStoryPoint,
	newStoryPoint: newStoryPoint,
	deleteStoryPoint: deleteStoryPoint,
	putStoryPointData: putStoryPointData,

	saveLoot: saveLoot,
	deleteLootItem: deleteLootItem,
	addLootItem: addLootItem,

	saveFoe: saveFoe,
	deleteFoe: deleteFoe,
	deleteFoeAttack: deleteFoeAttack,
	newFoeAttack: newFoeAttack,

	addUser: addUser
};