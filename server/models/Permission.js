const mongoose = require('mongoose'), Schema = mongoose.Schema;
const crypto = require('crypto');

const permissionSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      unique:true,
      required: true
    },
    role: {
      type: String
    },
    actions: Object
  }
);

module.exports = mongoose.model('Permission', permissionSchema);