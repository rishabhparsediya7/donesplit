const UserModel = require("../models/User");
const GroupModel = require("../models/Groups");
const UpdateWhenCreateGroup = async (groupId, members) => {
  const userIdArray = members.map((m) => {
    return {
      userId: m.userId,
      email: m.email,
      permission: m.permission,
    };
  });
  let groups;
  await Promise.all(
    userIdArray.map(async (user) => {
      const userToBeUpdated = await UserModel.findOne({ _id: user.userId });
      if (userToBeUpdated) {
        groups = userToBeUpdated.groups || [];
        groups.push({
          groupId: groupId,
          role: user.permission,
        });
        await UserModel.findByIdAndUpdate(
          user.userId,
          { $set: { groups: groups } },
          { new: true }
        );
      }
    })
  );
};

const FetchEachGroupServiceForUser = async (groups) => {
  const groupIds = groups.map((g) => g.groupId);
  const resultedGroups = await GroupModel.find({ _id: { $in: groupIds } });
  return resultedGroups;
};

module.exports = {
  UpdateWhenCreateGroup,
  FetchEachGroupServiceForUser,
};
