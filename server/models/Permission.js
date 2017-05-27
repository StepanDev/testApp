/**
 * Created by Mariana on 27.05.2017.
 */

const mongoose = require('mongoose'), Schema = mongoose.Schema;
const crypto = require('crypto');

const permissionSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    role: {
      type:String
      // required:''
    }
  }
);

module.exports = mongoose.model('Permission', permissionSchema);