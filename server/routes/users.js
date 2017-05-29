const express = require('express');
const router = express.Router();
// const _ = require("lodash");
// const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken');
// const app = express();

const passport = require("passport");
// const passportJWT = require("passport-jwt");
//
// const ExtractJwt = passportJWT.ExtractJwt;
// const JwtStrategy = passportJWT.Strategy;


const UserController = require('../controller/UserController');


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {title: 'Express'});
});

router.post('/login', passport.authenticate('local'), UserController.login);

router.post('/logout', UserController.logout);

router.get("/secret", passport.authenticate('jwt', {session: true}), function (req, res) {
  res.json("Success! You can not see this without a token");
});



router.post('/register', UserController.registerUser);

module.exports = router;

