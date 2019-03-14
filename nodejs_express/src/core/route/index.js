import express from "express";
import config from "../config";
import middleware from "../middleware";
import initializeDB from "../config/db";
import users from "../../customer/users";
//import addresses from "../..customer/addresses";

let router = express();

// conntect to the db
initializeDB(db => {
  // internal MIDDLEWARE
  router.use(middleware({config, db}));
  router.use("/users", users({config, db}));
  //router.use("/addresses",addresses({config,db}));
});

export default router;
