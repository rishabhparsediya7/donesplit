const mongoose = require("mongoose");
const { Schema } = mongoose;

const GroupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ownerId: { type: String, required: true },
  totalExpenditure: { type: Number, required: true },
  members: [
    {
      userId: { type: Schema.Types.ObjectId, ref: "SplitUser" },
      name: { type: String, required: true },
      email: { type: String, required: true },
      permission: String,
    },
  ],
  expenses: [
    { expenseId: { type: Schema.Types.ObjectId, ref: "SplitExpense" } },
  ],
});

module.exports = mongoose.model("SplitGroups", GroupSchema);
