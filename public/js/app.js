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
					controller: 'LoginController'
				})
				.state('home',{
					url: "/home",
					templateUrl: "index",
					controller: 'IndexController'
				})
				.state('storyline',{
					url: "/storyline",
					views: {
						'mainLeftView': {
							templateUrl: "partials/storyline",
							controller: 'chapterController'
						},
						'mainRightView': {
							templateUrl: "partials/encounter",
							controller: 'encounterController'
						}
					}

				})
                .state('edit',{
                    url: "/edit",
                    views: {
                        'mainLeftView': {
                           templateUrl: "partials/edit_storyline",
                            controller: "editStorylineController"
                        },
                        'mainRightView': {
                            templateUrl: "partials/edit_encounter",
                            controller: 'editEncounterController'
                        }
                    }

                });
		}
	]);