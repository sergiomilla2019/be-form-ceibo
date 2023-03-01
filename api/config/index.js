const mongoose = require("mongoose");
require("dotenv").config();

const db = async () => {
  try {
    await mongoose.connect(process.env.CONECTION_STRING);
    console.log("db levantada");
  } catch (error) {
    console.log("error en la db");
  }
};

db();
