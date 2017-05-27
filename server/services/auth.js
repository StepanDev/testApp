/**
 * Created by Mariana on 26.05.2017.
 */
const passport = require('passport');
const User = require('../models/users');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy; // авторизация через JWT
const ExtractJwt = require('passport-jwt').ExtractJwt; // авторизация через JWT
const crypto = require('crypto');


const jwtOptions = {};
const cookieExtractor = function (req) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies['jwt'];
  }
  return token;
};

jwtOptions.jwtFromRequest = ExtractJwt.fromExtractors([cookieExtractor()]);
jwtOptions.secretOrKey = 'tasmanianDevil';


passport.use(new LocalStrategy(
  function (userMail, password, done) {
    User.findOne({mail: userMail})
      .then(function (user) {
        if (!user || !user.checkPassword(password)) {
          return done(null, false, {
            message: 'Нет такого пользователя или пароль неверен.'
          });
        }
        return done(null, user);
      })
      .catch(function (err) {
        console.trace(err);
        return done(err);
      });
  }
));

passport.serializeUser(function (user, done) {
  done(null, user.mail);
});

passport.deserializeUser(function (userMail, done) {
  User.findOne({mail: userMail}, function (err, user) {
    console.trace(err);
    done(err, user);
  });
});

passport.use('jwt', new JwtStrategy(jwtOptions, function (jwt_payload, done) {
  console.log('jwt', jwt_payload);
  User.findOne({mail: jwt_payload.email})
    .then(function (user) {
      user ? done(null, user) : done(null, false);
    })
    .catch(function (err) {
      console.trace(err);
      return done(err);
    });
}));