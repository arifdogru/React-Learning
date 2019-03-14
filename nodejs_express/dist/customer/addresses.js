"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _user = require("./user");

var _user2 = _interopRequireDefault(_user);

var _address = require("./address");

var _address2 = _interopRequireDefault(_address);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
  * @author Arif Dogru
  */

exports.default = function (_ref) {
  var config = _ref.config,
      db = _ref.db;

  var router = (0, _express.Router)();

  // ADD User
  // v1/addresses
  router.post("/", function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _address2.default.findById(req.body.address).then(function (address) {
                if (!address) {
                  return res.status(404).json({
                    message: "Address not found"
                  });
                }
                var newUser = new _user2.default({
                  country: req.body.country,
                  user: req.body.user
                });
              }).catch(function (err) {
                console.log(err);
                res.status(500).json({
                  error: err
                });
                console.log(err);;
                newUser.save().then(function (result) {
                  var response = {
                    message: "User created succesfully with these informations.",
                    user: {
                      _id: result._id,
                      name: result.name,
                      email: result.email,
                      gsm: result.gsm,
                      address: result.address
                    },
                    request: {
                      decription: "GET_USER",
                      type: "GET",
                      url: "http://localhost:3000/V1/addresses/" + result._id
                    }
                  };

                  address.users.push(newUser);
                  address.save(function (err) {
                    if (err) {
                      res.status(500).send(err);
                    }
                    res.status(201).json(response);
                    // console.log(response);
                    // TODO: log
                  });
                  // console.log(response);
                  // TODO: log
                }).catch(function (err) {
                  console.log(err);
                  res.status(500).json({
                    error: err
                  });
                  console.log(err);
                  // TODO: log
                });
              });

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function (_x, _x2, _x3) {
      return _ref2.apply(this, arguments);
    };
  }());
};
//# sourceMappingURL=addresses.js.map