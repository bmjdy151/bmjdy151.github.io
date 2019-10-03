const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const printSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  details: [{ type: Schema.Types.ObjectId, ref: "Detail" }],
});

const Print = mongoose.model("Print", printSchema);

module.exports = Print;
