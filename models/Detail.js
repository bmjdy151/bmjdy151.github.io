const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const detailSchema = new Schema({
  name: String,
  path: String,
  description: String,
  type: String,
  printTypeID: { type: Schema.Types.ObjectId, ref: "Print" }
});

const Detail = mongoose.model("Detail", detailSchema);

module.exports = Detail;