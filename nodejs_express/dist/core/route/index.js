"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _config = require("../config");

var _config2 = _interopRequireDefault(_config);

var _middleware = require("../middleware");

var _middleware2 = _interopRequireDefault(_middleware);

var _db = require("../config/db");

var _db2 = _interopRequireDefault(_db);

var _users = require("../../customer/users");

var _users2 = _interopRequireDefault(_users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express2.default)();

// conntect to the db
(0, _db2.default)(function (db) {
  // internal MIDDLEWARE
  router.use((0, _middleware2.default)({ config: _config2.default, db: db }));
  router.use("/users", (0, _users2.default)({ config: _config2.default, db: db }));
});

exports.default = router;
//# sourceMappingURL=index.js.map