const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const meetingController = require("../controller/meeting");

const validation = [
  body("title")
    .isLength({ min: 8, max: 200 })
    .withMessage("min 8 char, max 200 cahar"),
  body("location")
    .isLength({ min: 8, max: 200 })
    .withMessage("min 8 char, max 200 cahar"),
  body("participant").isArray({ min: 1 }).withMessage("mimimum 1 participant"),
  body("note")
    .isString()
    .isLength({ min: 10, max: 250 })
    .withMessage("min 10 char, max 250 char"),
];

// POST /meetings/post
router.post("/post", validation, meetingController.createMeeting);

router.get("/get", meetingController.getAllMeetings);

module.exports = router;
