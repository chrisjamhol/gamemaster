'use strict';
gamemasterApp.controller('IndexController',
    ['$scope', '$http',
        function($scope,$http) {
            /*$http.get('/api/posts').
                success(function(data, status, headers, config) {
                    $scope.posts = data.posts;
            });*/
        }
    ]
);


gamemasterApp.controller('storylineController',
    ['$scope','$state',
        function storylineController($scope,$state){
            var storylineObj = {
                "0": {title:"first Encount", text: "the first encounter", link: "storyline.encounter?0"},
                "1": {title:"secon Encount", text: "the second encounter", link: "storyline.encounter?1"},
                "2": {title:"third Encount", text: "the third encounter", link: "storyline.encounter?2"}
            };
            $scope.getStoryline = function getStoryline(){
                return storylineObj;
            }
        }
    ]);

gamemasterApp.controller('encounterController',
    ['$scope',
        function encounterController($scope){
            console.log("encounctrl");
            $scope.encounterdata = {
                heading: 'The encunter',
                description: 'You see bla bla and bla bla lksdjfkdfsjsl sdklfj sdflkjdf df',
                rewards: {
                    xp: 500,
                    loot: ['dlkfjsdf','oirtuirpt','50g']
                }
            }
        }
    ]);
