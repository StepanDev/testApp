/**
 * Created by Mariana on 25.05.2017.
 */

const mongoose = require('mongoose');
const crypto = require('crypto');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: 'Укажите имя'
    },
    salt: String,
    passwordHash: String,
    mail: {
      type: String,
      required: 'Укажите e-mail',
      unique: true
    }
  },
  {
    timestamps: true
  }
);

userSchema.virtual('password')
  .set(function (password) {
    this._plainPassword = password;
    if (password) {
      this.salt = crypto.randomBytes(128).toString('base64');
      this.passwordHash = crypto.pbkdf2Sync(password, this.salt, 1, 128, 'sha1');
    } else {
      this.salt = undefined;
      this.passwordHash = undefined;
    }
  }).get(function () {
  return this._plainPassword;

});

userSchema.methods.checkPassword = function (password) {
  if (!password) return false;
  if (!this.passwordHash) return false;
  return crypto.pbkdf2Sync(password, this.salt, 1, 128, 'sha1') == this.passwordHash;
};

module.exports = mongoose.model('User', userSchema);
