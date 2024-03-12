const UserModel = require("../models/User");
const token = require("../middlwares/generateToken");
const mailer = require("../middlwares/sendMail");
const OTPModel = require("../models/Otp");
const scopes = require("../Constants/accessScopes");
const FriendService = require("../services/FriendsService");
const createUser = async (req, res) => {
  try {
    const { email, name, mobile } = req.body;
    const existingUser = await UserModel.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({
        message: `The user already exists with the mail id: ${email}`,
      });
    }
    const user = new UserModel({
      email: email,
      name: name,
      mobile: mobile,
    });
    const savedUser = await user.save();

    if (savedUser) {
      const access_token = token.generateToken(savedUser._id, email, mobile);
      res.status(201).json({
        userId: savedUser._id,
        access_token: access_token,
        message: "Success, User has been created",
        data: null,
      });
    } else {
      res.status(400).json({ message: "Failure, user can't be created" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const savedUser = await UserModel.findOne({ email: email });
    if (!savedUser) {
      return res
        .status(400)
        .json({ message: "User not found", statusCode: 404, data: {} });
    }
    const savedOtp = await OTPModel.findOne({ email: email });
    if (savedOtp.otp === otp) {
      const deletedOtp = await OTPModel.deleteOne({ email: email });
      console.log(deletedOtp);
      if (deletedOtp.deletedCount == 1) {
        console.log("Deleted OTP with email:" + email);
      }
      const access_token = token.generateToken(
        savedUser._id,
        email,
        savedUser.mobile
      );
      res.status(200).json({
        message: "Success!",
        data: {
          userId: savedUser._id,
          message: "verification successful!",
          verified: true,
          email: email,
          access_token: access_token,
        },
        error: null,
      });
    } else {
      res.status(403).json({
        message: "You have entered the wrong OTP!",
        error: "Authentication forbidden",
      });
    }
  } catch (error) {
    res.status(500).json({ message: "verification successful!" });
  }
};

const sendMailToUser = async (req, res) => {
  const { email } = req.body;
  try {
    const existUser = await UserModel.findOne({ email: email });
    if (!existUser) {
      return res
        .status(404)
        .json({ message: "User not found", statusCode: 404, data: null });
    }
    const response = await mailer.sendMail(email);
    if (response.sent) {
      const otp = new OTPModel({
        email: email,
        otp: response.otp,
      });
      console.log("OTP: ", response.otp);
      await otp.save();
      res.status(200).json({
        data: response.sent,
        message: "Success, The mail has been delivered.",
        error: null,
      });
    } else {
      res.status(400).json({
        message: "Failure, the email could't be sent",
        error: "Authentication forbidden",
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "It's not you, it's us", error: error.message });
  }
};

const addFriends = async (req, res) => {
  try {
    const email = req.body.email;
    const friendEmail = req.body.friendEmail;
    const friendName = req.body.friendName;
    const friendMobile = req.body.friendMobile;
    const savedUser = await UserModel.findOne({ email: email });
    const existingFriend = await UserModel.findOne({
      email: friendEmail,
    });

    if (!savedUser) {
      return res.status(400).json({
        message: message,
        error: "Could not add the friend",
        userId: savedUser._id,
      });
    }

    if (!existingFriend) {
      return res.status(404).json({
        message: `Your friend ${friendName} is not on donesplit. Invite them on the App`,
      });
    }

    await FriendService.addFriends(
      savedUser,
      existingFriend,
      email,
      friendEmail,
      friendName,
      friendMobile
    );

    res.status(201).json({ message: "Friend added", userId: savedUser._id });
  } catch (err) {
    console.log("eodndndndodn " + err);
    if (err instanceof HttpError && err.code === 401) {
      return res.status(401).json({ message: "Token expired" });
    }
    res.status(err.code).json({ message: err.message });
  }
};

const allfriends = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await UserModel.findOne({ _id: userId });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Someone been impersonating the profile" });
    }
    const friends = user.friends.length == 0 ? [] : user.friends;

    if (user) {
      res.status(200).json({ message: "Succes", friends: friends });
    } else {
      res.status(404).json({ message: "could not get friends", friends: [] });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const userExists = async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await UserModel.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ user: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  createUser,
  loginUser,
  sendMailToUser,
  addFriends,
  allfriends,
  userExists,
};
