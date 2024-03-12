const router = require("express").Router();
const ExpenseController = require("../controller/ExpenseController");
const mw = require("../middlwares/middleware");

router.post("/create", mw.checkToken, ExpenseController.createExpense);

module.exports = router;
