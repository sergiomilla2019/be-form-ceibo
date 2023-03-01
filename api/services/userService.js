const User = require("../models/User")

class UsersService {
  static async serviceGetAllUsers(req) {
    try {
      const allUsers = await User.find({})
      return allUsers
    } catch (err) {
      console.error(err)
    }
  }

  static async serviceResgisterUser(req) {
    const { mail } = req.body;
    try {
      let user = await User.findOne({ mail });
      if (user) {
        return { message: "alredy registered" };
      } else {
        const newUser = await User.create(req.body);
        return newUser;
      }
    } catch (err) {
      console.error(err);
    }
  }

}

module.exports = UsersService