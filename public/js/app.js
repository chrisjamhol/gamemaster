var usermail = "chrisjamhol@gmail.com";

var encounterData = function(){
	var data = {};
	this.set = function(newData){this.data = newData;};
	this.get = function(){return this.data;};
	this.reset = function(){newData.length = 0;};
};

var gamemasterApp = angular.module('gamemasterApp', ['ui.router'])
	.config(['$stateProvider','$urlRouterProvider',
		function($stateProvider, $urlRouterProvider){
			$stateProvider
				.state('login',{
					url: "/login",
					templateUrl: "index",
					controller: 'LoginController',
					onEnter: function(){console.log("entering login");}
				})
				.state('home',{
					url: "/home",
					templateUrl: "index",
					controller: 'IndexController',
					onEnter: function(){console.log("entered index controller scope");}
				})
				.state('storyline',{
					url: "/storyline",
					views: {
						'storylineView': {
							templateUrl: "partials/storyline",						
							controller: 'chapterController'
						},
						'encounterView': {
							templateUrl: "partials/encounter",
							controller: 'encounterController'
						}
					}
					
				});
		}
	]);