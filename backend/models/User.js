const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new mongoose.Schema({
  name: { type: String },
  mobile: { type: String },
  email: { type: String, unique: true },
  friends: [
    {
      friendId: { type: String },
      friendName: { type: String },
      friendMobile: { type: String },
      friendEmail: { type: String },
      amountType: { type: String },
      amount: { type: Number },
    },
  ],
  groups: [
    {
      groupId: { type: Schema.Types.ObjectId, ref: "SplitGroups" },
      role: { type: String, required: true },
    },
  ],
});

module.exports = mongoose.model("SplitUser", UserSchema);
