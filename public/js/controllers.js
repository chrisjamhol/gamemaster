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

gamemasterApp.controller('loginController',
    ['$scope','$state',
        function loginController($scope,$state){
            $scope.test = "hi";
        }
    ]);


gamemasterApp.controller('storylineController',
    ['$scope','$state','$http',
        function storylineController($scope,$state,$http){
            var storylineObj = {
                "0": {title:"first Encount", text: "the first encounter", link: "storyline.encounter?0"},
                "1": {title:"secon Encount", text: "the second encounter", link: "storyline.encounter?1"},
                "2": {title:"third Encount", text: "the third encounter", link: "storyline.encounter?2"}
            };
            $scope.getStoryline = function getStoryline(){
                var userIdTmp = '52a473a7f54eeca012000002';
                var userId = userIdTmp;
                $http.get('/api/getStoryline/'+userId)
                    .success(function(data, status, headers, config){
                        console.log(status);
                        console.log(data);
                    })
                    .error(function(data, status, headers, config){
                        console.log("error");
                        console.log("status: "+status);
                        console.log("data:"+data);
                     });
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
