var express = require('express');
var router = express.Router();
var _ = require("lodash");
var express = require("express");
var bodyParser = require("body-parser");
var jwt = require('jsonwebtoken');
var app = express();

var passport = require("passport");
var passportJWT = require("passport-jwt");
app.use(passport.initialize());

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
jwtOptions.secretOrKey = 'tasmanianDevil';

var strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
  console.log('payload received', jwt_payload);
  // usually this would be a database call:
  var user = users[_.findIndex(users, {id: jwt_payload.id})];
  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
});

passport.use(strategy);


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {title: 'Express'});
});

router.post('/login', function (req, res) {
  if (req.body.name && req.body.password) {
    var name = req.body.name;
    var password = req.body.password;
  }
  var user = users[_.findIndex(users, {name: name})];
  if (!user) {
    res.status(401).json({message: 'no such user found'})
  } else {
    if (user.password == password) {
      var payload = {id: user.id};
      var token = jwt.sign(payload, jwtOptions.secretOrKey);
      res.json({message: "ok", token: token})
    } else {
      res.status(401).json({message: "passwords did not match"})
    }
  }
});

router.get("/secret", passport.authenticate('jwt', {session: false}), function (req, res) {
  res.json("Success! You can not see this without a token");
});

module.exports = router;
