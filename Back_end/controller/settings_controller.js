const Settings = require("../model/settingsModel");

const getSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) settings = await Settings.create({});
    res.status(200).json({ settings });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

const updateSettings = async (req, res) => {
  try {
    const { cancellationPolicy, emailNotifications } = req.body;
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({ cancellationPolicy, emailNotifications });
    } else {
      settings.cancellationPolicy = cancellationPolicy ?? settings.cancellationPolicy;
      settings.emailNotifications = emailNotifications ?? settings.emailNotifications;
      await settings.save();
    }
    res.status(200).json({ msg: "Settings updated", settings });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports = { getSettings, updateSettings };