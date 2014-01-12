'use strict';
//var userId = '52a1bc7b8177ae7018000001';	//work
var userId = '52a473a7f54eeca012000002';	//home

var httpErrorHandler = function(data, status, headers, config){
		console.log("error");
		console.log("status: "+status);
		console.log("data:"+data);
	}

gamemasterApp.controller('chapterController',
	['$scope','$state','$http',
		function chapterController($scope,$state,$http){
			$http.get('/api/getstoryline/'+userId)
				.success(function(data, status, headers, config){
					$scope.chapters = data;
				})
				.error(httpErrorHandler);
		}
	]);

gamemasterApp.controller('storypointController',
	['$scope','$http','EncounterData',
		function storypointController($scope,$http,EncounterData){
			$scope.showEncounter = function(storypoint){
				EncounterData.set(storypoint);
			}
		}
	]);

gamemasterApp.controller('encounterController',
	['$scope','$state','$http','EncounterData',
		function encounterController($scope,$state,$http,EncounterData){
			$scope.$watch( EncounterData.get, function ( encData ) {
				$scope.encounter = encData;
			});
		}
	]);

gamemasterApp.controller('editStorylineController',
	['$scope','$state','$http','EncounterDataEdit',
		function editStorylineController($scope,$state,$http,EncounterDataEdit){
			$http.get('/api/getstoryline/'+userId)
				.success(function(data, status, headers, config){
					$scope.chapters = data;
					console.log(data);
				})
				.error(httpErrorHandler);

			$scope.showEncounter = function(storypoint){
				EncounterDataEdit.set(storypoint);
			}

			$scope.newChapter = function(index){
				var chapterName = prompt("Chapter Name:");
				if(chapterName){
					var newChapterData = {
						chapterName: chapterName,
						userId: userId,
						pos: index
					};

					$http.post('/api/newchapter',newChapterData)
						.success(function(chapter){
							$http.get('/api/getstoryline/'+userId)
								.success(function(data, status, headers, config){
									$scope.chapters = data;
								})
								.error(httpErrorHandler);
						})
						.error(httpErrorHandler);
				}
			}

			$scope.removeChapter = function(chapter){
				$http.delete('/api/deletechapter/'+userId+"/"+chapter._id)
					.success(function(user){
						$http.get('/api/getstoryline/'+userId)
								.success(function(data, status, headers, config){
									$scope.chapters = data;
								})
								.error(httpErrorHandler);							
					})
					.error(httpErrorHandler);
			}

			$scope.newStoryPoint = function(chapter,index){
				var storyPointName = prompt("StoryPoint Name:");
				if(storyPointName){
					var newStoryPointData = {
						name: storyPointName,
						chapterId: chapter._id,
						pos: index
					};

					$http.post('/api/newstorypoint',newStoryPointData)
						.success(function(storypoint){
							$http.get('/api/getstoryline/'+userId)
								.success(function(data, status, headers, config){
									$scope.chapters = data;
								})
								.error(httpErrorHandler);
						})
						.error(httpErrorHandler);
				}
			}

			$scope.removeStoryPoint = function(chapter,storypoint){
				$http.delete('/api/deletestorypoint/'+storypoint._id+"/"+chapter._id)
					.success(function(chapter){
						$http.get('/api/getstoryline/'+userId)
								.success(function(data, status, headers, config){
									$scope.chapters = data;
								})
								.error(httpErrorHandler);							
					})
					.error(httpErrorHandler);
			}

			$scope.saveChapterChange = function(chapter){
				var postdata = {
					'chapter': {'name': chapter.name,
								'id': chapter._id},
					'storyPoints': []
				};

				chapter.storyPoints.forEach(function(storypoint,key){
					postdata.storyPoints[key] = {
						'id': storypoint._id,
						'name': storypoint.name
					};
				});

				$http.put('/api/putchapternames/',JSON.stringify(postdata))
					.success(function(data,status){
						console.log(data);
						console.log(status);
					})
					.error(httpErrorHandler);
			}

		}
	]);

gamemasterApp.controller('editEncounterController',
	['$scope','$state','$http','EncounterDataEdit',
		function editEncounterController($scope,$state,$http,EncounterDataEdit){
			$scope.$watch( EncounterDataEdit.get, function ( encData ) {
				$scope.encounter = encData;
				console.log(encData);
			});

			$scope.saveEncounterChange = function(changed,encounter){
				var changedData = {
					change: {
						key: changed,
						val: encounter[changed]
					},
					storypoint: {
						id: encounter._id
					}
				};

				$http.put('/api/putstorypointdata/',changedData)
					.success(function(data, status, headers, config){

					})
					.error(httpErrorHandler);
			}

			$scope.putStoryPointData
		}
	]);
