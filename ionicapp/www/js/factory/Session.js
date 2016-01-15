

angular.module('starter')
  .factory('Session', function ($resource) {
    return $resource('/auth/session/');
  });
