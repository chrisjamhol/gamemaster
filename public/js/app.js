var usermail = "chrisjamhol@gmail.com";

var gamemasterApp = angular.module('gamemasterApp', ['ui.router'])
    .config(['$stateProvider','$urlRouterProvider',
        function($stateProvider, $urlRouterProvider){
            $stateProvider
                .state('home',{
                    url: "/",
                    templateUrl: "index",
                    controller: 'IndexController'
                })
                .state('storyline',{
                    url: "/storyline",
                    templateUrl: "partials/storyline",
                    controller: 'storylineController'
                })
                .state('storyline.encounter',{
                    url: "/encounter",
                    //template: '<h1>hi</h1>',
                    templateUrl: "partials/storyline_encounter",
                    controller: 'encounterController',
                    onEnter: function(){console.log("entered state");}
                });
        }
    ]);