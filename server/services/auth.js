/**
 * Created by Mariana on 26.05.2017.
 */
const passport = require('passport');
const User = require('../models/users');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy; // авторизация через JWT
const ExtractJwt = require('passport-jwt').ExtractJwt; // авторизация через JWT
const crypto = require('crypto');


passport.use(new LocalStrategy(
  {

    usernameField: 'email',
    passwordField: 'password'
  },
  function (userMail, password, done) {
    console.log('local');
    User.findOne({mail: userMail})
      .then(function (user) {
        console.log('user founded', user);
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
  console.log('serialize user', user);
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  console.log('serialize user', user);
  User.findById(id, function (err, user) {
    console.trace(err);
    done(err, user);
  });
});


const cookieExtractor = function (req) {
  console.log('in cookies');
  let token = null;
  if (req && req.cookies) {
    token = req.cookies['jwt'];
  }
  console.log(token);
  return token;
};

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
  secretOrKey: 'tasmanianDevil'
};


passport.use('jwt', new JwtStrategy(jwtOptions, function (jwt_payload, done) {
  console.log('jwt', jwt_payload);
  User.findById(jwt_payload.id)
    .then(function (user) {
      user ? done(null, user) : done(null, false);
    })
    .catch(function (err) {
      console.trace(err);
      return done(err);
    });
}));