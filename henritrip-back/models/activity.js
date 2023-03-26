const mongoose = require("mongoose");

const activitySchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true, default: "ACTIVITY" },
  adress: { type: String, required: true },
  phone: { type: String, required: true },
  opensAt: { type: String, required: true }, // Horaires d'ouverture
  website: { type: String, default: "henritrip.fr" },
});

module.exports = mongoose.model("activities", activitySchema);
