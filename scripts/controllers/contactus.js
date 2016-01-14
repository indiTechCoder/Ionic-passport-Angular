'use strict';

angular.module('angularPassportApp')
  .controller('ContactusCtrl', function ($scope, Blogs, $location, $routeParams, $rootScope) {
    console.log('hello from contact us controller');
    $scope.message = "the message";
    
  } );
