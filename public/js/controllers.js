'use strict';

var httpErrorHandler = function(data, status, headers, config){
		console.log("error");
		console.log("status: "+status);
		console.log("data:"+data);
	}

gamemasterApp.controller('IndexController',
	['$scope', '$http',
		function($scope,$http) {

		}
	]
);

gamemasterApp.controller('loginController',
	['$scope','$state',
		function loginController($scope,$state){
			$scope.test = "hi";
		}
	]);


gamemasterApp.controller('chapterController',
	['$scope','$state','$http',
		function chapterController($scope,$state,$http){
			var userId = '52a1bc7b8177ae7018000001';

			$http.get('/api/getchapters/'+userId)
				.success(function(data, status, headers, config){
					$scope.chapters = data;
				})
				.error(httpErrorHandler);		
		}
	]);

gamemasterApp.controller('storypointController',
	['$scope','$http','EncounterData',
		function storypointController($scope,$http,EncounterData){
			$http.get('/api/getstorypoints/'+$scope.chapterId)
				.success(function(data, status, headers, config){
					$scope.storypoints = data; 	
					console.log(data);			
				})
				.error(httpErrorHandler);
			$scope.showEncounter = function(storypoint){
				console.log("clicked");
				console.log(angular.fromJson(storypoint.foes));
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