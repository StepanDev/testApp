const Permission = require('../models/Permission');

function checkPermission(req,res,next) {
  Permission.findOne({user:user}).then(function (userPerm) {
    
  }).catch(function (err) {
      res.status(403).send('forbidden');
  })
}

module.exports = {
  checkPermission:checkPermission
};