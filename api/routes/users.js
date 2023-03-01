const express = require("express")
const router = express.Router()
const UserController = require("../controllers/userController")

router.get("/registered", UserController.getAllUsers)
router.post("/register", UserController.registerUsers)

module.exports = router