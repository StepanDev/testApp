
const Permission = require('../models/Permission');

module.exports = {
  create: function (req, res) {
    let permissions = new Permission();
    permissions.user = req.body.user;
    permissions.role = req.body.role;
    console.log(req.body.action);
    permissions.actions = JSON.parse(req.body.action);
    console.log('parse',JSON.parse(req.body.action));
    permissions.save().then(function (newPermission) {
      res.status(201).send(newPermission);
    }).catch(function (err) {
      res.send(err.status || err);
    })
  }
};