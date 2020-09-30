const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/ems", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
var conn = mongoose.Collection;
var payRoleSchema = new mongoose.Schema({
  employee_name: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'employee_detail',
    required: true,
  },

  pay_role_statu: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
var payrolemodel = mongoose.model("payRole", payRoleSchema);
module.exports = payrolemodel;
