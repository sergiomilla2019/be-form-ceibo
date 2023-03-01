const express = require("express")
const router = express.Router()
const NotificationController = require("../controllers/notificationController")


router.post("/", NotificationController.notificationUser)
router.post("/all", NotificationController.notificationAllUsers)



module.exports = router