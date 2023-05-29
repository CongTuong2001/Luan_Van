import mongoose from "mongoose";
const Schema = mongoose.Schema;

const teacherSchema = new mongoose.Schema({
  mgv: {
    type: String,
    required: true,
  },
  ten_gv: {
    type: String,
    required: true,
  },
  gender_gv: {
    type: String,
    enum: ["Nam", "Nữ"],
    default: "Nam",
    required: true,
  },
  phone_gv: {
    type: String,
    required: true,
  },
  ten_lop: {
    type: String,
    required: true,
  },
  chuc_vu: {
    type: String,
    required: true,
  },
});
//export collection name 'teacher' storing teacher info
const Teacher = mongoose.model("teachers", teacherSchema);
export default Teacher;
