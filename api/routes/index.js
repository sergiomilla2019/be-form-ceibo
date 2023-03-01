const express = require("express");
const router = express.Router();

const usersRouter = require("./users");
const notificationRouter = require("./notification");

router.use("/users", usersRouter);
router.use("/notification", notificationRouter);

module.exports = router;