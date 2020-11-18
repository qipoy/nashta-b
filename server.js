const express = require("express");
const morgan = require("morgan");
const multer = require("multer");
const path = require("path");

const meetings = require("./src/router/meeting");
const cors = require("cors");
const mongoose = require("mongoose");

//multer storage config
const fileStorage = multer.diskStorage({
  destination: (req, File, cb) => {
    cb(null, "images");
  },

  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + "-" + file.originalname.trim());
  },
});

// multer filter config
const fileFilterConfig = (req, file, cb) => {
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

//Cors Definition Options
const options = {
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "X-Access-Token",
  ],
  credentials: true,
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  origin: "http://localhost:8000",
};

const app = express();
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(cors(options));

app.use("/images", express.static(path.join(__dirname, "images")));

app.use(
  multer({ storage: fileStorage, fileFilter: fileFilterConfig }).single("image")
);

app.use(morgan("dev"));

const PORT = process.env.PORT || 8000;

// ROUTE meetings
app.use("/v1/meetings", meetings);

// Error handling
app.use((req, res, next) => {
  const error = new Error("Not found");
  res.status(404);
  next(error);
});

app.use((error, req, res, next) => {
  const status = error.errorStatus || 500;
  const message = error.message;
  const data = error.data;

  res.status(status).json({ message, data });
});

const mongoAtlasLUrl = `mongodb+srv://indrabinridwan:berhasil@cluster0.qibgj.mongodb.net/meetings?retryWrites=true&w=majority`;

mongoose
  .connect(mongoAtlasLUrl)
  .then(
    app.listen(PORT, () => {
      console.log(
        `⚡️[server]: server start on ${PORT} + connection to Atlas success `
      );
    })
  )
  .catch((err) => console.log(`⚡[server]: server error `, err));
