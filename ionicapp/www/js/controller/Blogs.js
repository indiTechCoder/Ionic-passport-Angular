'use strict';

angular.module('starter')
  .controller('BlogsCtrl', function ($scope, Blogs,Session, $location, $stateParams, $rootScope) {
    $scope.create = function() {
      var blog = new Blogs({
        title: this.title,
        content: this.content
      });
      blog.$save(function(response) {
        $location.path("blogs/" + response._id);
      });

      this.title = "";
      this.content = "";
    };

    $scope.remove = function(blog) {
      blog.$remove();

      for (var i in $scope.blogs) {
        if ($scope.blogs[i] == blog) {
          $scope.blogs.splice(i, 1);
        }
      }
    };

    $scope.update = function() {
      var blog = $scope.blog;
      blog.$update(function() {
        $location.path('blogs/' + blog._id);
      });
    };

    $scope.find = function() {
      console.log('Blogs injected',Blogs);
      Blogs.query(function(blogs) {
        $scope.blogs = blogs;

      });
    };

    $scope.findOne = function() {
      Blogs.get({
        blogId: $stateParams.blogId
      }, function(blog) {
        $scope.blog = blog;
      });
    };
  });
