const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/ems", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
var conn = mongoose.Collection;
var employeeSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "jobroles",
    required: true,
  },

  Ename: {
    type:String,
    required: true,
  },
  Eemail: {
    type: String,
    required: true,
  },
  Enumber: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  Eadress: {
    type: String,
    required: true,
  },
  Esalery: {
    type: Number,
    required: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});
var employeemodel = mongoose.model("employee_detail", employeeSchema);
module.exports = employeemodel;
