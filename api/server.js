const express = require("express");
const app = express();
const cors = require("cors");
const bodyparser = require("body-parser");
const compression = require("compression");
const morgan = require("morgan");
require("./config"); // --> require the db()
const router = require("./routes");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

console.log("PUERTO->", process.env.PORT);

app.use(cors());
app.use(compression());
app.use(bodyparser.json());
app.use(morgan("tiny"));

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
