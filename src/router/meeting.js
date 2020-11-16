const express = require("express");
const router = express.Router();
const meetingController = require("../controller/meeting");

const Meeting = require("../model/meeting");

router.get("/", (req, res, next) => {});

router.post("/", meetingController.createMeeting);

module.exports = router;
