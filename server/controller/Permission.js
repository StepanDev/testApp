/**
 * Created by Mariana on 27.05.2017.
 */
const Permission = require('../models/Permission');

module.exports = {
  create: function (req, res) {
    let permissions = new Permission();
    permissions.user = req.body.user;
    permissions.role = req.body.role;
    permissions.action = req.body.action;
    console.log('req', req.body.action);
    console.log(permissions);
    permissions.save().then(function (newPermission) {
      res.status(201).send(newPermission);
    }).catch(function (err) {
      res.send(err.status || err);
    })
  }
};