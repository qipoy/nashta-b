const { validationResult } = require("express-validator");
const Meetings = require("../model/meeting");

exports.createMeeting = (req, res, next) => {
  const title = req.body.title;
  const location = req.body.location;
  const participant = req.body.participant;
  const note = req.body.note;
  const date = req.body.date;
  const image = req.file.path;

  const erros = validationResult(req);

  if (!erros.isEmpty()) {
    const err = new Error("invalid value tidak sesuai");
    err.errorStatus = 400;
    err.data = erros.array();

    throw err;
  }

  if (!req.file) {
    const err = new Error("Image harus di Upload");
    err.errorStatus = 422;
    err.data = erros.array();

    throw err;
  }

  const MeetingsModel = new Meetings({
    title,
    location,
    participant,
    note,
    date,
    image,
  });

  MeetingsModel.save()
    .then((result) => {
      res.status(201).json({
        messages: "appointment successfull",
        data: result,
      });
    })
    .catch((err) => console.log("err", err));
};

exports.getAllMeetings = (req, res, next) => {
  Meetings.find()
    .then((result) => {
      res.status(200).json({
        messages: "request successfull",
        data: result,
      });
    })
    .catch((err) => next(err));
};
