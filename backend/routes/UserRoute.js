const express = require("express");
const router = express.Router();
const UserController = require("../controller/UserController");
const mw = require("../middlwares/middleware");
router.get("/", async (req, res) => {
  res.send("hello user");
});

router.post("/create", UserController.createUser);
router.post("/send-mail", UserController.sendMailToUser);
router.post("/login", UserController.loginUser);
router.post("/verify-otp", UserController.loginUser);
router.post("/add-friends", mw.checkToken, UserController.addFriends);
router.get("/friends/:userId", mw.checkToken, UserController.allfriends);
router.get("/userExists/:userId", mw.checkToken, UserController.userExists);

module.exports = router;
