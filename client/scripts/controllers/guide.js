'use strict';

angular.module('angularPassportApp')
  .controller('GuideCtrl', function ($scope, Blogs, $location, $routeParams, $rootScope, $http) {
    console.log('hello from guide controller');
    $scope.message = "the message";
    $http.get('http://examine.com/supplements/Noopept')
    	.then(function (res){
    		$scope.content = res.data;
    		console.log($scope.content);
    	})
  } );
