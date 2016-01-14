'use strict';

var mongoose = require('mongoose'),
  Game = mongoose.model('GameSession');

/**
 * Find game by id
 */
exports.game = function(req, res, next, id) {
  game.load(id, function(err, game) {
    if (err) return next(err);
    if (!game) return next(new Error('Failed to load game ' + id));
    req.game = game;
    next();
  });
};

/**
 * Create a game
 */
exports.create = function(req, res) {
  var game = new Game(req.body);
  game.creator = req.user;
  game.save(function(err) {
    if (err) {
      res.json(500, err);
    } else {
      res.json(game);
    }
  });
};

/**
 * Update a game
 */
exports.update = function(req, res) {
  var game = req.game;
  game.title = req.body.title;
  game.content = req.body.content;
  game.save(function(err) {
    if (err) {
      res.json(500, err);
    } else {
      res.json(game);
    }
  });
};

/**
 * Delete a game
 */
exports.destroy = function(req, res) {
  var game = req.game;

  game.remove(function(err) {
    if (err) {
      res.json(500, err);
    } else {
      res.json(game);
    }
  });
};

/**
 * Show a game
 */
exports.show = function(req, res) {
  res.json(req.game);
};

/**
 * List of games
 */
exports.all = function(req, res) {
  Game.find().sort('-created').populate('creator', 'username').exec(function(err, games) {
    if (err) {
      res.json(500, err);
    } else {
      res.json(games);
    }
  });
};
