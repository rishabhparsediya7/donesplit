const router = require("express").Router();
const GroupController = require("../controller/GroupController");
const mw = require("../middlwares/middleware");

router.get("/user/:userId", mw.checkToken, GroupController.fetchGroups);
router.post("/create", mw.checkToken, GroupController.createGroup);
router.get("/:groupId", mw.checkToken, GroupController.fetchGroupWithID);
module.exports = router;
