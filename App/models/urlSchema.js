const mongoose = require("mongoose");

const UrlSchema = new mongoose.Schema(
  {
    shortCode: {
      type: String,
      required: true,
      unique: true,
    },
    url: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
    },
    lastSeenDate: {
      type: Date,
    },
    redirectCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Url", UrlSchema);
