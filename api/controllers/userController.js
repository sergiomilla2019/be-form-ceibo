const UserService = require("../services/userService");

class UserController {
  static async getAllUsers(req, res) {
    const users = await UserService.serviceGetAllUsers(req);
    return users ? res.status(201).send(users) : res.sendStatus(401);
  }

  static async registerUsers(req, res) {
    const user = await UserService.serviceResgisterUser(req);
    return user
      ? user.message
        ? res.status(400).send(user)
        : res.sendStatus(201)
      : res.sendStatus(401);
  }
}
module.exports = UserController;