const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

const feedRoutes = require("./routes/feed");
const authRoutes = require("./routes/auth");

const app = express();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4());
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(bodyParser.json());
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("Image")
);
app.use("/images", express.static(path.join(__dirname, "images")));

app.use((req, res, next) => {
  //Dopusti pristup od svugdje
  res.header("Access-Control-Allow-Origin", "*");

  //DOzvoli headere
  res.header("Access-Control-Allow-Headers", "Authorization, Content-Type");

  //Dozvoli metode
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, POST, GET, PUT, PATCH, DELETE"
  );
  next();
});

app.use("/feed", feedRoutes);
app.use("/auth", authRoutes);

mongoose
  .connect(
    "mongodb+srv://Sanja:EeM7Sr6n2grgBr2b@cluster0.vrctu.mongodb.net/Zavrsni?retryWrites=true&w=majority",
    { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }
  )
  .then((result) => {
    () => console.log("MongoDB connected...");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.static("client/build"));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server started on port ${port}`));
