import mongoose from "mongoose";
const Schema = mongoose.Schema;

const studentSchema = new mongoose.Schema({
  mhs: {
    type: String,
    required: true,
  },
  ten_hs: {
    type: String,
    required: true,
  },
  birthday: {
    type: Date,
    required: true,
  },
  gender_hs: {
    type: String,
    enum: ["Nam", "Nữ"],
    default: "Nam",
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  Toan_I: {
    type: String,
  },
  Toan_II: {
    type: String,
  },
  Toan_CN: {
    type: String,
  },
  TiengViet_I: {
    type: String,
  },
  TiengViet_II: {
    type: String,
  },
  TiengViet_CN: {
    type: String,
  },
  KhoaHoc_I: {
    type: String,
  },
  KhoaHoc_II: {
    type: String,
  },
  KhoaHoc_CN: {
    type: String,
  },
  DL_LS_I: {
    type: String,
  },
  DL_LS_II: {
    type: String,
  },
  DL_LS_CN: {
    type: String,
  },
  DaoDuc_I: {
    type: String,
  },
  DaoDuc_II: {
    type: String,
  },
  DaoDuc_CN: {
    type: String,
  },
  AnhVan_I: {
    type: String,
  },
  AnhVan_II: {
    type: String,
  },
  AnhVan_CN: {
    type: String,
  },
  gpa_I: {
    type: String,
  },
  gpa_II: {
    type: String,
  },
  gpa_CN: {
    type: String,
  },
  ranked_I: {
    type: String,
    enum: [
      "Xuất sắc",
      "Giỏi",
      "Khá",
      "Trung bình",
      "Yếu",
    ],
  },
  ranked_II: {
    type: String,
    enum: [
      "Xuất sắc",
      "Giỏi",
      "Khá",
      "Trung bình",
      "Yếu",
    ],
  },
  ranked_CN: {
    type: String,
    enum: [
      "Xuất sắc",
      "Giỏi",
      "Khá",
      "Trung bình",
      "Yếu",
    ],
  },
  ten_lop: {
    type: String,
    required: true,
  },
  ten_cha: {
    type: String,
    required: true,
  },
  phone_cha: {
    type: String,
    required: true,
  },
  ten_me: {
    type: String,
    required: true,
  },
  phone_me: {
    type: String,
    required: true,
  },
});
//export collection name 'student' storing student info
const Student = mongoose.model("students", studentSchema);
export default Student;
