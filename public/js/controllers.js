'use strict';

var httpErrorHandler = function(data, status, headers, config){
		console.log("error");
		console.log("status: "+status);
		console.log("data:"+data);
	}

gamemasterApp.controller('chapterController',
	['$scope','$state','$http',
		function chapterController($scope,$state,$http){
			var userId = '52a1bc7b8177ae7018000001';

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