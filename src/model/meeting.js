const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const meetingsSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    participant: {
      type: [String],
      required: true,
    },

    note: {
      type: String,
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Meetings", meetingsSchema);
