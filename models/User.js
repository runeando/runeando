const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: String,
    age: Number,
    genre: { type: String, enum: ["female", "male", "other"] },
    avatarUrl: {
      type: String,
      default: "images/default-avatar.png"
    },
    races: [{ type: Schema.Types.ObjectId, ref: "Race" }]
    // racesSaved: [{ type: Schema.Types.ObjectId, ref: "Race" }]
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
