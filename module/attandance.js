const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/ems", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
var conn = mongoose.Collection;
var attandanceSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});
var attandancemodel = mongoose.model("attandance", attandanceSchema);
module.exports = attandancemodel;
