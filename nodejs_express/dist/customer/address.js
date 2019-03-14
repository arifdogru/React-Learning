"use strict";

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;
var AddressSchema = new Schema({

  country: {
    name: {
      type: String,
      required: true
    }
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }

}, {
  timestamps: true
});

module.exports = _mongoose2.default.model("Address", UserSchema);
//# sourceMappingURL=address.js.map