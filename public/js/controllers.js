'use strict';

/* Controllers */

function IndexCtrl($scope, $http) {
    $http.get('/api/posts').
        success(function(data, status, headers, config) {
            $scope.posts = data.posts;
    });
}

function storylineController($scope){
    var storylineObj = {
        "0": {"title":"first Encount", "text": "the first encounter"},
        "1": {"title":"secon Encount", "text": "the second encounter"},
        "2": {"title":"third Encount", "text": "the third encounter"}
    };
    $scope.getStoryline = function getStoryline(){
        return storylineObj;
    }

}

function encounterController($scope){

}
