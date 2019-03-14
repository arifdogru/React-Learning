"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _index = require("./index");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Turn usePushEach on for all models
_mongoose2.default.plugin(function (schema) {
  schema.options.usePushEach = true;
});

// return the database connection

exports.default = function (callback) {
  var db = _mongoose2.default.connect(_index2.default.mongoURL, { useNewUrlParser: true });
  _mongoose2.default.Promise = global.Promise;
  _mongoose2.default.set("useCreateIndex", true);
  _mongoose2.default.set("useNewUrlParser", true);
  _mongoose2.default.set("useFindAndModify", false);
  _mongoose2.default.set("debug", true);
  callback(db);
};
//# sourceMappingURL=db.js.map