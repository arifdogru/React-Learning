"use strict";

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;
var UserSchema = new Schema({

  name: {
    first: {
      type: String,
      required: true
    },
    last: {
      type: String,
      required: true
    },
    middle: String
  },

  email: {
    type: String
  },

  gsm: {
    type: String,
    required: true
  },

  phone: String,

  password: {
    type: String,
    required: true
  },
  address: {
    type: Schema.Types.ObjectId,
    ref: "Address",
    required: true
  }

}, {
  timestamps: true
});

module.exports = _mongoose2.default.model("User", UserSchema);
//# sourceMappingURL=user.js.map