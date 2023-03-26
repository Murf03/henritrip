const mongoose = require("mongoose");

const tripSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  days: { type: Number, required: true, min: 1 },
  mobilities: { type: Array, required: true },
  seasons: { type: Array, required: true },
  forWho: { type: Array, required: true },
  activities: { type: Array, required: true },
  invitations: { type: Array, default: [] },
});

module.exports = mongoose.model("trips", tripSchema);
