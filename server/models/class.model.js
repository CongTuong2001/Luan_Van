import mongoose from "mongoose";
const Schema = mongoose.Schema;

const classSchema = new Schema({
  ten_lop: {
    type: String,
    required: true,
  },
});
//export collection name 'class' storing class info
const Class = mongoose.model("classs", classSchema);
export default Class;
