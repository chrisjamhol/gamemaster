var initApp = angular.module('initApp', [])
	.controller('initController',['$scope',function ($scope){
		$scope.players = [];

		$scope.addPlayer = function(){
			$scope.players.push({'roll': $scope.newPlayer.roll, 'name': $scope.newPlayer.name});
			document.getElementById('newPlayerRoll').value = "";
			document.getElementById('newPlayerName').value = "";
		};

		$scope.hideEdit = function(playerroll,playername){
			document.getElementById('edit_' + playerroll + '_' + playername).style.display = 'none';
		};

		$scope.reset = function(){
			$scope.players.length = 0;
		};

		$scope.showEdit = function(playerroll,playername){
			console.log('edit_' + playerroll + '_' + playername);
			document.getElementById('edit_' + playerroll + '_' + playername).style.display = 'block';
		}

		$scope.deletePlayer = function(playerToKill){
			angular.forEach($scope.players, function(player, index){
				if(player.roll == playerToKill.roll && player.name == playerToKill.name){
					$scope.players.splice(index,1);
				}
			});
		}
	}])
	.filter("toArray",function(){
		return function(obj) {
                 var result = [];
                 angular.forEach(obj, function(val, key) {result.push(val);});
                 return result;
              };
    });