"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _http = require("http");

var _http2 = _interopRequireDefault(_http);

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _compression = require("compression");

var _compression2 = _interopRequireDefault(_compression);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _morgan = require("morgan");

var _morgan2 = _interopRequireDefault(_morgan);

var _config = require("./core/config");

var _config2 = _interopRequireDefault(_config);

var _route = require("./core/route");

var _route2 = _interopRequireDefault(_route);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
app.server = _http2.default.createServer(app);

// TODO:
app.use((0, _compression2.default)());

app.use((0, _morgan2.default)(":date[iso] :method :status :url content-length: :res[content-length] response-time: :response-time ms :user-agent"));

// parse application/json
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json({ limit: _config2.default.bodyLimit }));

// api routes V...
app.use("/v1", _route2.default);
app.server.listen(_config2.default.port);
console.log("Started on port " + app.server.address().port + " at " + new Date().toISOString());

// Acces Control
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  // yıldız yerine sadece bir url verilerek diğer url lerden gelen istekler engellenebilir
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Accept-Encoding", "br, gzip, deflate");
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// --COMMON ERROR HANDLING--
// error handling -
app.use(function (req, res, next) {
  var error = new Error("Not found");
  error.status = 404;
  next(error);
});

// all unecpected errors handler
app.use(function (error, req, res, next) {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

exports.default = app;
//# sourceMappingURL=index.js.map