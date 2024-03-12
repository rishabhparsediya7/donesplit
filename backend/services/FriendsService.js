const UserModel = require("../models/User");

const addFriends = async (
  savedUser,
  existingFriend,
  email,
  friendEmail,
  friendName,
  friendMobile
) => {
  let friends = [];
  friends = savedUser.friends ? savedUser.friends : [];

  friends.push({
    friendId: existingFriend._id,
    friendName: friendName,
    friendEmail: friendEmail,
    friendMobile: friendMobile,
  });

  await UserModel.updateOne({ email: email }, { $set: { friends: friends } });
  friends = [];
  friends = existingFriend.friends ? existingFriend.friends : [];

  friends.push({
    friendId: savedUser._id,
    friendName: savedUser.name,
    friendEmail: savedUser.email,
    friendMobile: savedUser.mobile,
  });
  await UserModel.updateOne(
    { email: friendEmail },
    { $set: { friends: friends } }
  );

};

module.exports = {
  addFriends,
};
