'use strict';

angular.module('angularPassportApp')
  .controller('NavbarCtrl', function ($scope, Auth, $location) {
    $scope.menu = [{
      "title": "Blogs",
      "link": "blogs"
    }
    ];

    $scope.authMenu = [{
      "title": "Create New Blog",
      "link": "blogs/create"
    },{
      "title": "Play Now",
      "link": "playnow"
    },{
      "title": "Guide",
      "link": "guide"
    },{
      "title": "Contact Us",
      "link": "contactus"
    }
    ];

    $scope.logout = function() {
      Auth.logout(function(err) {
        if(!err) {
          $location.path('/login');
        }
      });
    };
  });
