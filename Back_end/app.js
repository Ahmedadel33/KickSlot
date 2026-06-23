const db_connection = require ("./config/db_conect")
require("dotenv").config();
const express=require("express");
const app=express();
const adminroutes = require("./routes/adminroutes");

app.use(express.json());
const settingsroutes = require("./routes/settingsroutes");
const pitchroutes=require("./routes/pitchroutes")
const authroutes=require("./routes/authrouts")

const cors = require("cors");
app.use(cors({ origin: "http://localhost:5173" }));

app.use("/auth" , authroutes)
app.use("/pitch" , pitchroutes)
app.use("/settings", settingsroutes);
app.use("/admin", adminroutes);

db_connection()


app.use((req, res, next) => {
  res.status(404).json({ msg: "Not Found" });
});

PORT=process.env.PORT||3000

app.listen(PORT,()=>{
  console.log(`server is running on port ${PORT}`);
})

