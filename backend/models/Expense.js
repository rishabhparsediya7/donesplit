const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema({
  amount: { type: Number },
  description: { type: String },
  members: [
    {
      memberId: { type: String },
      amount: { type: Number },
    },
  ],
  type: {
    type: String,
    enum: ["equally", "unequally"],
    required: true,
  },
  createdBy: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  month: { type: String, required: true },
});

module.exports = mongoose.model("SplitExpense", ExpenseSchema);
