/**
 * Created by Mariana on 25.05.2017.
 */

const User = require('../models/users');
const jwtsecret = 'secretkey';
const jwt = require('jsonwebtoken');


module.exports = {
  registerUser: function (req, res) {
    console.log('params', req.body);
    if (!Object.keys(req.body).length) {
      res.status(400).send('send params');
    } else {
      User.findOne({mail: req.body.eMail}).then(function (user) {
        console.log('user', user);
        if (user) {
          res.status(422).send('email already in use');
        } else {
          let user = new User();
          user.name = req.body.username;
          user.password = req.body.password;
          user.mail = req.body.eMail;
          user.save().then(function (newUser) {
            res.status(201).send({newUser});
          }).catch(function (err) {
            console.trace(err);
            res.status(500).send(err);
          })
        }
      })
    }
  },
  login: function (req, res) {
    const user = req.user;
    const payload = {
      id: user.id,
      displayName: user.name,
      email: user.email
    };
    const token = jwt.sign(payload, jwtsecret); //здесь создается JWT
    var expiresDate = new Date();
    expiresDate.setDate(expiresDate.getDate() + 7);
    res.cookie('jwt', token, {expires: expiresDate});

    res.send({user: user.name, token: 'JWT ' + token});
  },
  logout: function (req, res) {
    console.log('here');
    res.clearCookie('jwt').send('logouted');
  }
}

;