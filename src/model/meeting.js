const mongoose = require("mongoose");

const meetingsSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: String,
  location: String,
  participant: [String],
  note: String,
  date: Date,
  image: { type: String },
});

module.exports = mongoose.model("Meetings", meetingsSchema);
