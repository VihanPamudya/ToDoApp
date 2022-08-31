const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config()

const app = express();

app.use(express.json());
app.use(cors());


mongoose
  .connect(
    process.env.DB_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Mongoose connected!");
  })
  .catch((err) => {
    console.log(err);
  });

const routes = require("./routes/ToDoRoute")
app.use(routes)

app.listen(3000, ()=>{
    console.log("Server started on port : 3000")
})
