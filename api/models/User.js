const { Schema, model } = require("mongoose")

const UserSchema = new Schema({
  firstName: { type: String,required: true },
  lastName: { type: String, required: true },
  mail: { type: String, lowercase: true, required: true, unique: true },
  company: { type: String, lowercase: true },
  country: { type: String, lowercase: true },
  newsletter: Boolean,
  question: String,
})

const UserModel = model("User", UserSchema)

module.exports = UserModel