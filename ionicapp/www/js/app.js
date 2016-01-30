// Ionic Starter blog

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','ngResource','ngCookies'])
.constant('ApiEndpoint', {
  url: 'http://localhost:8101/api',
  authurl: 'http://localhost:8101/auth'
})
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
  if (window.cordova && window.cordova.plugins.Keyboard) {
    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    cordova.plugins.Keyboard.disableScroll(true);

  }
  if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('blog', {
    url: '/blog',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('blog.blogs', {
    url: '/blogs',
    views: {
      'menuContent': {
        templateUrl: 'templates/blogs.html',
        controller: 'BlogsCtrl'
      }
    }
  })

  .state('blog.create', {
    url: '/create',
    views: {
      'menuContent': {
        templateUrl: 'templates/create.html',
        controller: 'BlogsCtrl'
      }
    }
  })

  .state('blog.blogId', {
    url: '/:blogId',
    views: {
      'menuContent': {
        templateUrl: 'templates/create.html',
        controller: 'BlogsCtrl'
      }
    }
  })

  .state('blog.blogId.edit', {
   url: '/:blogId/edit',
   views: {
    'menuContent': {
     templateUrl: 'templates/edit.html',
     controller: 'BlogsCtrl'
   }
 }
})

  .state('blog.login', {
    url: '/login',
    views: {
      'menuContent': {
        templateUrl: 'templates/login.html',
        controller : 'AppCtrl'
      }
    }
  })
  .state('blog.signup', {
    url: '/signup',
    views: {
      'menuContent': {
        templateUrl: 'templates/signup.html',
        controller : 'AppCtrl'
      }
    }
  });;
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/blog/login');
})


  .run(function ($rootScope, $location, Auth) {

    //watching the value of the currentUser variable.
    $rootScope.$watch('currentUser', function(currentUser) {
      // if no currentUser and on a page that requires authorization then try to update it
      // will trigger 401s if user does not have a valid session
      if (!currentUser && (['/', '/login', '/logout', '/signup'].indexOf($location.path()) == -1 )) {
        Auth.currentUser();
      }
    });

    // On catching 401 errors, redirect to the login page.
    $rootScope.$on('event:auth-loginRequired', function() {
      $location.path('/login');
      return false;
    });
  });
