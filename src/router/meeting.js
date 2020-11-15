const express = require("express");
const router = express.Router();
const Meeting = require("../model/meeting");
const mongoose = require("mongoose");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("Only .jpeg or .png files are accepted"), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fieldSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});
a


router.get("/", (req, res, next) => {
  Meeting.find()
    .select("title, location, participant, note, date, image")
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        products: docs.map((doc) => {
          return {
            title: doc.location,
            participant: doc.participant,
            date: doc.date,
            note: doc.note,
            image: doc.image,
          };
        }),
      };
      res.status(200).json(response);
     
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.post("/", upload.single("image"), (req, res, next) => {
  const meeting = new Meeting({
    _id: mongoose.Types.ObjectId(),
    title: req.body.title,
    location: req.body.location,
    participant: req.body.participant,
    note: req.body.note,
    date: req.body.date,
    image: req.file.path,
  });

  meeting
    .save()
    .then((result) => {
      console.log(result);
    })
    .catch((err) => console.log(err));

  res.status(201).json({
    message: "success",
    created: meeting,
  });
});

module.exports = router;
