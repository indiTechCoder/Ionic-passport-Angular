Angular-Passport + Ionic app
================

An AngularJS application that uses Passport, MongoDB. Demonstrating: 

* Authentication using Passport
* Account creation and server validation with Mongoose.
* CRUD interface for creating posts with MongoDB
* Client validations for account creation including a directive for validating if a username is available.
* Authorization middleware for checking if you are allowed to edit a post.
* Unit tests for client code
*Ionic app consuming Node server 


## How to use angular-passport

Before you continue, make sure you have MongoDB installed <http://www.mongodb.org/downloads/>. 

### Setup
Run `npm install`, followed by `bower install` to grab the dependencies.
### Setup Ionic
Run `cd ionic`, followed by `npm install` to grab the dependencies.
Run `ionic serve`, or  `ionic serve --lab` to grab the dependencies.
### Running the app
Run `grunt server` to start the app in development mode with livereload, or run `grunt server:dist` to run it in a minified and optimized production build.

### Testing
Run `grunt test` to start the karma test runner.


