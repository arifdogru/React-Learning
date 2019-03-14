import mongoose from "mongoose";

let Schema = mongoose.Schema;
let AddressSchema = new Schema({

  country: {
    name: {
      type: String,
      required: true
    }
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }

}, {
  timestamps: true
});

module.exports = mongoose.model("Address", UserSchema);
