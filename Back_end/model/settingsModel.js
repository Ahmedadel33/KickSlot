const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema({
  cancellationPolicy: {
    type: String,
    enum: ["24h", "12h", "none"],
    default: "24h"
  },
  emailNotifications: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model("Settings", settingsSchema);