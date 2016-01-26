'use strict';

var path = require('path'),
    auth = require('../config/auth');

module.exports = function(app) {
  // User Routes
  var users = require('../controllers/users');
  app.post('/auth/users', users.create);
  app.get('/auth/users/:userId', users.show);
  app.get('/auth/users', users.find);
  app.get('/api/users', users.all);
  // Check if username is available
  // todo: probably should be a query on users
  app.get('/auth/check_username/:username', users.exists);
  //testing mobile login
  // Session Routes
  var session = require('../controllers/session');
  app.get('/auth/session', auth.ensureAuthenticated, session.session);
  app.post('/auth/session', session.login);
  app.del('/auth/session', session.logout);

  // Blog Routes
  var blogs = require('../controllers/blogs');
  app.get('/api/blogs', blogs.all);
  app.post('/api/blogs', auth.ensureAuthenticated, blogs.create);
  app.get('/api/blogs/:blogId', blogs.show);
  app.put('/api/blogs/:blogId', auth.ensureAuthenticated, auth.blog.hasAuthorization, blogs.update);
  app.del('/api/blogs/:blogId', auth.ensureAuthenticated, auth.blog.hasAuthorization, blogs.destroy);


  // Angular Routes
  app.get('/partials/*', function(req, res) {
    console.log('hit partial');
    var requestedView = path.join('./', req.url);
    console.log('requestView',requestedView);
    res.render(requestedView);
  });

  //Mobile testing
  app.get('/api/test',function(req,res){
    res.send('Hello whats up locally');
  })

  app.post('/api/logintest',function(req,res){
    console.log(req.body);
    res.json(req.body.email + " " + req.body.password);
  })

  app.get('/*', function(req, res) {
    console.log('possibly about');
    if(req.user) {
      res.cookie('user', JSON.stringify(req.user.user_info));
      console.log('req.user.user_info',req.user.user_info);
    }

    res.render('index.html');
  });

}
