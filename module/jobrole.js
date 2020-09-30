const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/ems", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
var conn = mongoose.Collection;
var jobRoleSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    index: {
      unique: true,
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
var jobrolemodel = mongoose.model("jobroles", jobRoleSchema);
module.exports = jobrolemodel;
