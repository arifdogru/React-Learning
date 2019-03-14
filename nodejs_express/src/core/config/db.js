import mongoose from "mongoose";
import config from "./index";

// Turn usePushEach on for all models
mongoose.plugin(schema => {
  schema.options.usePushEach = true;
});

// return the database connection
export default callback => {
  let db = mongoose.connect(config.mongoURL, {useNewUrlParser: true});
  mongoose.Promise = global.Promise;
  mongoose.set("useCreateIndex", true);
  mongoose.set("useNewUrlParser", true);
  mongoose.set("useFindAndModify", false);
  mongoose.set("debug", true);
  callback(db);
};
