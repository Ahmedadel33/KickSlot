const pitchModel = require("../model/pitchModel");
const { addPitch } = require("./validate/joi_pitch");

const addPitchs = async (req, res) => {
  const { error, value } = addPitch.validate(req.body, {
    abortEarly: false,
    stripUnknown: true
  });

  if (error) {
    return res.status(400).json({
      msg: "Validation Error",
      errors: error.details.map((err) => err.message)
    });
  }

  const { pitchName, pitchImage, pitchPrice, pitchLocation, pitchDescription } = value;

  try {
    const adminId = req.user.id;
    const newPitch = await pitchModel.create({
      pitchName, pitchImage, pitchPrice, pitchLocation, pitchDescription,
      owner: adminId
    });
    res.status(201).json({ msg: "Pitch Added", pitch: newPitch });
  } catch (err) {
    console.log("Error adding pitch:", err.message);
    res.status(500).json({ msg: "Server error failed to add pitch" });
  }
};

const getAdminPitches = async (req, res) => {
  try {
    const adminPitches = await pitchModel.find({ owner: req.user.id });
    res.status(200).json({ msg: "Your Pitches Fetched", pitches: adminPitches });
  } catch (error) {
    res.status(500).json({ msg: "Server Error", error: error.message });
  }
};

const getPitchs = async (req, res) => {
  try {
    const pitchs = await pitchModel.find();
    res.status(200).json({ msg: "Pitchs Fetched", pitchs });
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
};

const updatePitch = async (req, res) => {
  try {
    const { id } = req.params;
    const pitch = await pitchModel.findOne({ _id: id, owner: req.user.id });
    if (!pitch) return res.status(403).json({ msg: "Not authorized to update this pitch" });

    const updated = await pitchModel.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ msg: "Pitch updated", pitch: updated });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

const deletePitch = async (req, res) => {
  try {
    const { id } = req.params;
    const pitch = await pitchModel.findOne({ _id: id, owner: req.user.id });
    if (!pitch) return res.status(403).json({ msg: "Not authorized to delete this pitch" });

    await pitch.deleteOne();
    res.status(200).json({ msg: "Pitch deleted" });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports = { addPitchs, getPitchs, getAdminPitches, updatePitch, deletePitch };