require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db_connection = require("./config/db_conect");

const adminroutes = require("./routes/ownerroutes");
const settingsroutes = require("./routes/settingsroutes");
const pitchroutes = require("./routes/pitchroutes");
const authroutes = require("./routes/authrouts");
const path = require("path");
const app = express();

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
 app.use(cors({ origin: "http://localhost:5173" }));
app.use("/uploads", express.static("uploads"));
 app.use("/auth", authroutes);
app.use("/pitch", pitchroutes);
app.use("/settings", settingsroutes);
app.use("/admin", adminroutes);

db_connection();

app.use((req, res) => {
  res.status(404).json({ msg: "Not Found" });
});

const PORT = process.env.PORT ;

app.listen(PORT,  () => {
  console.log(`server is running  ${PORT}`);
});