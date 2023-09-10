const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Logo: { // Change "Type" to "type"
    type: String, // Corrected data type
    required: true,
  },
  TeamMembers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users", // Reference the User model
    },
  ],
});

const Team = mongoose.model("Team", TeamSchema);

module.exports = Team;
