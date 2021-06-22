const { model, Schema, ObjectId } = require("mongoose");

let now = new Date();

const DATE =  now.getFullYear() + " " + (now.getMonth()+1)  + " " + now.getDate() + " " + now.getHours()+":" + now.getMinutes();

const File = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  accessLink: { type: String },
  size: { type: Number, default: 0 },
  path: { type: String, default: "" },
  user: { type: ObjectId, ref: "User" },
  date: {type: Date, default: DATE},
  parent: { type: ObjectId, ref: "File" },
  child: [{ type: ObjectId, ref: "File" }]
});

module.exports = model("File", File);
