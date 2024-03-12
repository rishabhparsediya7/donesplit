const GroupModel = require("../models/Groups");
const UserModel = require("../models/User");
const scopes = require("../Constants/accessScopes");
const {
  UpdateWhenCreateGroup,
  FetchEachGroupServiceForUser,
} = require("../services/GroupService");

const fetchGroups = async (req, res) => {
  const userId = req.params.userId;
  try {
    const existingUser = await UserModel.findOne({ _id: userId });
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }
    const groups = existingUser.groups || [];
    const allGroups = await FetchEachGroupServiceForUser(groups);
    res.status(200).json({ groups: allGroups, message: "Groups Fetched" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

const fetchGroupWithID = async (req, res) => {
  const groupId = req.params.groupId;
  try {
    const group = await GroupModel.findOne({ _id: groupId });
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }
    res.status(200).json({ group: group, message: "Group Fetched" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

const createGroup = async (req, res) => {
  try {
    const { ownerId, name, members } = req.body;
    console.log(ownerId, name, members);
    const owner = await UserModel.findOne({ _id: ownerId });
    if (!owner) {
      return res
        .status(400)
        .json({ message: "could not create group, Owner Id is not valid" });
    }
    members.push({
      userId: owner._id,
      name: owner.name,
      email: owner.email,
      permission: scopes.ACCESS_SCOPES[0].OWNER,
    });

    console.log(members);

    const newGroup = new GroupModel({
      name: name,
      ownerId: ownerId,
      members: members,
      totalExpenditure: 0,
    });
    const createdGroup = await newGroup.save();

    UpdateWhenCreateGroup(createdGroup._id, members);

    if (createdGroup) {
      res.status(201).json({
        message: `The group ${name} created!`,
        groupId: createdGroup._id,
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: `${error.message}` });
  }
};

module.exports = {
  createGroup,
  fetchGroups,
  fetchGroupWithID,
};
