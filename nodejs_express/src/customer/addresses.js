
import {Router} from "express";
import User from "./user";
import Address from "./address";

/**
  * @author Arif Dogru
  */

export default ({
  config,
  db
}) => {
  let router = Router();

  // ADD User
  // v1/addresses
  router.post("/", async (req, res, next) => {
    await Address.findById(req.body.address)
      .then(address => {
        if (!address) {
          return res.status(404).json({
            message: "Address not found"
          });
        }
        const newUser = new User({
          country: req.body.country,
          user: req.body.user
        });
        newUser.save()
          .then(result => {
            const response = {
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
                url: `http://localhost:3000/V1/addresses/${result._id}`
              }
            };

            address.users.push(newUser);
            address.save(err => {
              if (err) {
                res.status(500).send(err);
              }
              res.status(201).json(response);
              // console.log(response);
              // TODO: log
            });
            // console.log(response);
            // TODO: log
          }).catch(err => {
            console.log(err);
            res.status(500).json({
              error: err
            });
            console.log(err);
            // TODO: log
          });
      });
  });
};
