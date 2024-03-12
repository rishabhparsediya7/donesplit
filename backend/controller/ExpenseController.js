const GroupModel = require("../models/Groups");
const ExpenseModel = require("../models/Expense");
const ExpenseService = require("../services/ExpenseService");

const createExpense = async (req, res) => {
  const { groupId, userId, amount, description, members } = req.body;

  try {
    const expense = new ExpenseModel({
      amount: amount,
      description: description,
      members: members,
    });
    const savedExpense = await expense.save();
    if (savedExpense) {
      const existingGroup = await GroupModel.findOne({ _id: groupId });
      const expenses =
        existingGroup.expenses !== undefined ? existingGroup.expenses : [];
      expenses.push({
        expenseId: savedExpense._id,
      });
      const expenseCreated = await GroupModel.updateOne(
        { _id: groupId },
        {
          $set: { expenses: expenses },
        },
        { new: true }
      );
      await ExpenseService.UpdateUserWithExpense(members);

      if (expenseCreated) {
        res.status(201).json({
          message: `The expense ${description} with amount ${amount} created!`,
          data: expenses,
        });
      } else {
        res.status(400).json({
          message: `Could not create expense`,
          data: expenses,
        });
      }
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createExpense,
};
