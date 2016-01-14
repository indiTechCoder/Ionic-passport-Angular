'use strict';

angular.module('angularPassportApp')
  .controller('PlaynowCtrl', function ($scope, User, Games, $location, $routeParams, $rootScope) {
    $scope.master = {};
    $scope.gameState = 'browse';
    
    $scope.currentUser = $rootScope.currentUser;
    $scope.setGameState = function (gs) { //gs should either 'browse', 'lobby', 'ongoing'
      $scope.gameState = gs;
    }
    $scope.checkState = function () {
      console.log('scope.gameState',$scope.gameState);
    }

    $scope.changeTab = function(tab) {
	    $scope.view_tab = tab;
	  }
  	$scope.update = function(game) {
  		game.host = $rootScope.currentUser.username;
        $scope.master = angular.copy(game);

      };
  	$scope.reset = function() {
       $scope.game = {};
    };

    $scope.selectGame = function (g) {
      $scope.selectedGame = g;
    }

    $scope.enterGame = function (g){
      console.log('game entered: ',g);
      $scope.gameState = 'lobby';
    }

    $scope.populateUsersAndGames = function() {
      User.query(function(users) {
        $scope.users = users;
        console.log('$scpoe.users',$scope.users);
        $scope.usernameList = [];
        angular.forEach($scope.users, function (item){
          $scope.usernameList.push(item.username);
        })
      });

      Games.query(function(games) {
        $scope.games = games;
        console.log('$scpoe.users',$scope.games);
        $scope.gameslist = [];
        angular.forEach($scope.games, function (item){
          $scope.gameslist.push(item.name);
        })
      });
    }
    $scope.create = function () {
      var game = new Games({
        name : this.game.name,
        host : $rootScope.currentUser.username
      })
      console.log('new game: ',game);
      game.$save(function(response) {
        console.log('response: ',response);
        //$location.path("/games/" + response._id);
      });
      this.game.name = "";
    }    

  });
