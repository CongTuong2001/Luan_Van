import mongoose from "mongoose";
const Schema = mongoose.Schema;

const semesterSchema = new Schema({
  ten_hk: {
    type: String,
    enum: ["Học kì I", "Học kì II", "Cả năm"],
    default: "Học kì I",
    required: true,
  },
});
//export collection name 'semester' storing semester info
const Semester = mongoose.model("semesters", semesterSchema);
export default Semester;
