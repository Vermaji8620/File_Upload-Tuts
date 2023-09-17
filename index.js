// app create
const express = require("express");
const app = express();

// middleware
app.use(express.json());
const fileUpload = require("express-fileupload");
app.use(fileUpload());

// api route mount
const upload = require("./routes/fileupload");
app.use("/api/v1/upload", upload);

// port find
require("dotenv").config();
const PORT = process.env.PORT || 3000;

// db connect
require("./config/database").connect();

// cloud connect
require("./config/cloudinary").cloudinaryConnect();
// default route
app.get("/", (req, res) => {
  res.send("this is the landing page");
});

// server activate
app.listen(PORT, () => {
  console.log("App is running at", PORT);
});
