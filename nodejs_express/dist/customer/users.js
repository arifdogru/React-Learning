"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _user = require("./user");

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
* @author Alper Akalin
*/

exports.default = function (_ref) {
  var config = _ref.config,
      db = _ref.db;

  var router = (0, _express.Router)();

  // ADD User
  // v1/users
  router.post("/", function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
      var newUser;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              newUser = new _user2.default({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                gsm: req.body.gsm,
                phone: req.body.phone

              });
              _context.next = 3;
              return newUser.save().then(function (result) {
                var response = {
                  message: "User created succesfully with these informations.",
                  user: {
                    _id: result._id,
                    name: result.name,
                    email: result.email,
                    gsm: result.gsm,
                    phone: result.phone
                  },
                  request: {
                    decription: "GET_USER",
                    type: "GET",
                    url: "http://localhost:3000/V1/users/" + result._id
                  }
                };

                res.status(201).json(response);
              }).catch(function (err) {
                console.log(err);
                res.status(500).json({
                  error: err
                });
                console.log(err);
                // TODO: log
              });

            case 3:
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

  // UPDATE user by id
  // dinamik olarak belirli alanları günceller
  // v1/users/:id
  router.patch("/:userId", function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {
      var id, updateOperations, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, ops;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              id = req.params.userId;
              updateOperations = {};
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context2.prev = 5;

              for (_iterator = req.body[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                ops = _step.value;

                updateOperations[ops.propName] = ops.value;
              }
              _context2.next = 13;
              break;

            case 9:
              _context2.prev = 9;
              _context2.t0 = _context2["catch"](5);
              _didIteratorError = true;
              _iteratorError = _context2.t0;

            case 13:
              _context2.prev = 13;
              _context2.prev = 14;

              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }

            case 16:
              _context2.prev = 16;

              if (!_didIteratorError) {
                _context2.next = 19;
                break;
              }

              throw _iteratorError;

            case 19:
              return _context2.finish(16);

            case 20:
              return _context2.finish(13);

            case 21:
              _context2.next = 23;
              return _user2.default.update({
                _id: id
              }, {
                $set: updateOperations
              }).exec().then(function (result) {
                var response = {
                  message: "User updated succesfully.",
                  request: {
                    decription: "GET_USER",
                    type: "GET",
                    url: "http://localhost:3000/V1/users/" + id
                  }
                };
                res.status(201).json(response);
                // console.log(response);
                // TODO: log
              }).catch(function (err) {
                res.status(500).json({
                  error: err
                });
                console.log(err);
                // TODO: log
              });

            case 23:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, undefined, [[5, 9, 13, 21], [14,, 16, 20]]);
    }));

    return function (_x4, _x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }());

  // DELETE user by id
  // v1/users/:id
  router.delete("/:userId", function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res, next) {
      var id;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              id = req.params.userId;
              _context3.next = 3;
              return _user2.default.remove({
                _id: id
              }).exec().then(function (result) {
                var response = {
                  message: "User deleted succesfully.",
                  request: {
                    type: "POST",
                    decription: "ADD_USER",
                    url: "http://localhost:3000/V1/users/",
                    body: {
                      name: "String",
                      email: "String",
                      role: "String",
                      gsm: "String",
                      phone: "String",
                      type: "String",
                      status: "String",
                      organization: "Organization"
                    }
                  }
                };
                res.status(200).json(response);
                // console.log(response);
                // TODO: log
              }).catch(function (err) {
                res.status(500).json({
                  error: err
                });
                console.log(err);
                // TODO: log
              });

            case 3:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, undefined);
    }));

    return function (_x7, _x8, _x9) {
      return _ref4.apply(this, arguments);
    };
  }());

  // GET all users
  // v1/users
  router.get("/", function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res, next) {
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return _user2.default.find().select("_id name email gsm phone createdAt updatedAt").exec().then(function (results) {
                var response = {
                  message: "All Users",
                  count: results.length,
                  users: results.map(function (results) {
                    return {
                      _id: results._id,
                      name: results.name,
                      email: results.email,
                      role: results.role,
                      gsm: results.gsm,
                      phone: results.phone,
                      type: results.type,
                      status: results.status,
                      createdAt: results.createdAt,
                      updatedAt: results.updatedAt,
                      organization: results.organization,
                      request: {
                        decription: "GET_ALL_USERS",
                        type: "GET",
                        url: "http://localhost:3000/V1/users/" + results._id
                      }
                    };
                  })
                };
                res.status(200).json(response);
                // console.log(response);
                // TODO: log
              }).catch(function (err) {
                res.status(500).json({
                  error: err
                });
                console.log(err);
                // TODO: log
              });

            case 2:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, undefined);
    }));

    return function (_x10, _x11, _x12) {
      return _ref5.apply(this, arguments);
    };
  }());

  // GET user by id
  // v1/users/:id
  router.get("/:userId", function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res, next) {
      var id;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              id = req.params.userId;
              _context5.next = 3;
              return _user2.default.findById(id).select("_id name email gsm phone createdAt updatedAt").exec().then(function (result) {
                if (result) {
                  var response = {
                    message: "A User information.",
                    user: result,
                    request: {
                      decription: "GET_ALL_USERS",
                      type: "GET",
                      url: "http://localhost:3000/V1/users"
                    }
                  };
                  res.status(200).json(response);
                  // console.log(response);
                  // TODO: log
                } else {
                  res.status(500).json({
                    message: "No valid entry found for requested ID."
                  });
                  console.log({
                    message: "No valid entry found for requested ID."
                  });
                  // TODO: log
                }
              }).catch(function (err) {
                res.status(500).json({
                  error: err
                });
                console.log(err);
                // TODO: log
              });

            case 3:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, undefined);
    }));

    return function (_x13, _x14, _x15) {
      return _ref6.apply(this, arguments);
    };
  }());

  return router;
};
//# sourceMappingURL=users.js.map