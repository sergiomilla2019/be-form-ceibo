const NotificationService = require("../services/notificationService");

class NotificationController {
  static async notificationUser(req, res) {
    const user = await NotificationService.serviceNotificationUser(req)
    return user ? res.status(201).send(user) : res.sendStatus(401)
  }

  static async notificationAllUsers(req, res) {
    const user = await NotificationService.serviceNotificationAllUsers(req)
    return user ? res.sendStatus(201) : res.sendStatus(401)
  }

}
module.exports = NotificationController