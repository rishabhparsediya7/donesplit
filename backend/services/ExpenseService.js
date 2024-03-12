const UserModel = require("../models/User");

const UpdateUserWithExpense = async (members, amount) => {
  await Promise.all(
    members.map(async (member) => {
      try {
        const memberId = member.userId;

      } catch (error) {}
    })
  );
};

module.exports = {
  UpdateUserWithExpense,
};
