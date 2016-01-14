'use strict';

angular.module('angularPassportApp')
  .factory('Games', function ($resource) {
    return $resource('api/games/:gameId', {
      gameId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  });
