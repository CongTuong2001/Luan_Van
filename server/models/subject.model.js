import mongoose from "mongoose";
const Schema = mongoose.Schema;

const subjectSchema = new Schema({
  ten_mon: {
    type: String,
    enum: ["Toán", "Tiếng Việt", "Khoa Học", "ĐL - LS", "Đạo Đức", "Anh Văn"],
    required: true,
  },
});
//export collection name 'subject' storing subject info
const Subject = mongoose.model("subjects", subjectSchema);
export default Subject;
