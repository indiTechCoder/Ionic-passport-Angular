'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var GameSessionSchema = new Schema({
  name: {
    type: String,
    index: true,
    required: true
  },
  host: {
    type: String,
    default: '',
    trim: true
  },
  slug: {
    type: String,
    lowercase: true,
    trim: true
  },
  created: Date,
  updated: [Date],
  creator: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

/**
 * Pre hook.
 */

GameSessionSchema.pre('save', function(next, done){
  if (this.isNew)
    this.created = Date.now();

  this.updated.push(Date.now());

  next();
});

/**
 * Statics
 */
GameSessionSchema.statics = {
  load: function(id, cb) {
    this.findOne({
      _id: id
    }).populate('creator', 'username').exec(cb);
  }
};

/**
 * Methods
 */

GameSessionSchema.statics.findByTitle = function (name, callback) {
  return this.find({ name: name }, callback);
}

GameSessionSchema.methods.expressiveQuery = function (creator, date, callback) {
  return this.find('creator', creator).where('date').gte(date).run(callback);
}

/**
 * Plugins
 */

function slugGenerator (options){
  options = options || {};
  var key = options.key || 'name';

  return function slugGenerator(schema){
    schema.path(key).set(function(v){
      this.slug = v.toLowerCase().replace(/[^a-z0-9]/g, '').replace(/-+/g, '');
      return v;
    });
  };
};

GameSessionSchema.plugin(slugGenerator());

/**
 * Define model.
 */

mongoose.model('GameSession', GameSessionSchema);