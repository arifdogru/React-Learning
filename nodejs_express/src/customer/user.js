import mongoose from "mongoose";

let Schema = mongoose.Schema;
let UserSchema = new Schema({

  name: {
    first: {
      type: String,
      required: true
    },
    last: {
      type: String,
      required: true
    },
    middle: String
  },

  email: {
    type: String
  },

  gsm: {
    type: String,
    required: true
  },

  phone: String,

  password: {
    type: String,
    required: true
  },
  address:{
    type: Schema.Types.ObjectId,
    ref: "Address",
    required: true
  }

}, {
  timestamps: true
});

module.exports = mongoose.model("User", UserSchema);
