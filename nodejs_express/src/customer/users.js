import { Router } from "express";
import User from "./user";

/**
* @author Alper Akalin
*/

export default ({
  config,
  db
}) => {
  let router = Router();

  // ADD User
  // v1/users
  router.post("/", async (req, res, next) => {
    
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      gsm: req.body.gsm,
      phone: req.body.phone
      
    });
    await newUser.save()
      .then(result => {
        const response = {
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
            url: `http://localhost:3000/V1/users/${result._id}`
          }
        };

        res.status(201).json(response);
      }).catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
        console.log(err);
        // TODO: log
      });
  });

  // UPDATE user by id
  // dinamik olarak belirli alanları günceller
  // v1/users/:id
  router.patch("/:userId", async (req, res, next) => {
    const id = req.params.userId;
    const updateOperations = {};
    for (const ops of req.body) {
      updateOperations[ops.propName] = ops.value;
    }
    await User.update({
      _id: id
    }, {
      $set: updateOperations
    })
      .exec()
      .then(result => {
        const response = {
          message: "User updated succesfully.",
          request: {
            decription: "GET_USER",
            type: "GET",
            url: `http://localhost:3000/V1/users/${id}`
          }
        };
        res.status(201).json(response);
        // console.log(response);
        // TODO: log
      }).catch(err => {
        res.status(500).json({
          error: err
        });
        console.log(err);
        // TODO: log
      });
  });

  // DELETE user by id
  // v1/users/:id
  router.delete("/:userId", async (req, res, next) => {
    const id = req.params.userId;
    await User.remove({
      _id: id
    })
      .exec()
      .then(result => {
        const response = {
          message: "User deleted succesfully.",
          request: {
            type: "POST",
            decription: "ADD_USER",
            url: "http://localhost:3000/V1/users/",
            body: {
              name: "String",
              email: "String",
              gsm: "String",
              phone: "String",
              address: "Address"
            }
          }
        };
        res.status(200).json(response);
        // console.log(response);
        // TODO: log
      }).catch(err => {
        res.status(500).json({
          error: err
        });
        console.log(err);
        // TODO: log
      });
  });

  // GET all users
  // v1/users
  router.get("/", async (req, res, next) => {
    await User.find()
      .select("_id name email gsm phone createdAt updatedAt")
      .exec()
      .then(results => {
        const response = {
          message: "All Users",
          count: results.length,
          users: results.map(results => {
            return {
              _id: results._id,
              name: results.name,
              email: results.email,
              gsm: results.gsm,
              phone: results.phone,
              createdAt: results.createdAt,
              updatedAt: results.updatedAt,
              address: results.address,
              request: {
                decription: "GET_ALL_USERS",
                type: "GET",
                url: `http://localhost:3000/V1/users/${results._id}`
              }
            };
          })
        };
        res.status(200).json(response);
        // console.log(response);
        // TODO: log
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
        console.log(err);
        // TODO: log
      });
  });

  // GET user by id
  // v1/users/:id
  router.get("/:userId", async (req, res, next) => {
    const id = req.params.userId;
    await User.findById(id)
      .select("_id name email gsm phone createdAt updatedAt")
      .exec()
      .then(result => {
        if (result) {
          const response = {
            message: "A User information.",
            user: result,
            request: {
              decription: "GET_ALL_USERS",
              type: "GET",
              url: `http://localhost:3000/V1/users`
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
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
        console.log(err);
        // TODO: log
      });
  });

  return router;
};
