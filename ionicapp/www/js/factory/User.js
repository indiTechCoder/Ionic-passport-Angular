'use strict';

angular.module('starter')
  .factory('User', function ($resource) {
    return $resource('/auth/users/:id/', {
    },
      {
        'update': {
          method:'PUT'
        }
      });
  });
