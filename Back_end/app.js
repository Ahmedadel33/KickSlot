const db_connection = require ("./config/db_conect")
require("dotenv").config();
const express=require("express");
const app=express();
app.use(express.json());


const cors = require("cors");
app.use(cors({ origin: "http://localhost:5173" }));

const authroutes=require("./routes/authrouts")

app.use("/auth" , authroutes)


db_connection()


PORT=process.env.PORT||3000

app.listen(PORT,()=>{
  console.log(`server is running on port ${PORT}`);
})

