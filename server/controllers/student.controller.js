import Student from "../models/student.model.js";
import Users from "../models/user.model.js";
import xlsx from "xlsx";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import axios from "axios";
const headers = {
  "PRIVATE-KEY": "14bf1d3f-a86c-4b1b-ad74-9675722ee4f8",
};
export const getAllStudent = async (req, res) => {
  try {
    const ListStudents = await Student.find({ ten_lop: req.params.ten_lop });
    res.json({ success: true, ListStudents });
  } catch (error) {
    res
      .ranked(500)
      .json({ success: false, message: "Server error ~ getAllStudent" });
  }
};

export const updateStudent = async (req, res) => {
  try {
    const data = await Users.findOne({ _id: req.params.id });
    const { ten_cha, ten_me,  address, phone_cha, phone_me } = req.body;
    const updatedStudent = await Student.updateOne(
      { mhs: data.username },
      { ten_cha, ten_me,  address, phone_cha, phone_me }
    );
    if (updatedStudent) {
      res.json({ message: "Update successfully" });
    } else {
      res.json({ message: "Update fail" });
    }
  } catch (error) {
    res.json({ message: "Server error ~ updateStudent" });
  }
};

export const updatePointStudent = async (req, res) => {
  try {
    console.log(req.body,req.params.id);
    const { Toan_I,
            Toan_II,
            Toan_CN,
            TiengViet_I,
            TiengViet_II,
            TiengViet_CN,
            KhoaHoc_I,
            KhoaHoc_II,
            KhoaHoc_CN,
            DL_LS_II,
            DL_LS_CN,
            DL_LS_I,
            DaoDuc_I,
            DaoDuc_II,
            DaoDuc_CN,
            AnhVan_I,
            AnhVan_II,
            AnhVan_CN,
            gpa_I,
            gpa_II,
            gpa_CN
          } = req.body;    

    
            const updatedPointStudent = await Student.updateOne(
              { mhs: req.params.id },
              { Toan_I,
                Toan_II,
                Toan_CN,
                TiengViet_I,
                TiengViet_II,
                TiengViet_CN,
                KhoaHoc_I,
                KhoaHoc_II,
                KhoaHoc_CN,
                DL_LS_II,
                DL_LS_CN,
                DL_LS_I,
                DaoDuc_I,
                DaoDuc_II,
                DaoDuc_CN,
                AnhVan_I,
                AnhVan_II,
                AnhVan_CN,
                gpa_I,
                gpa_II,
                gpa_CN
              }
            ).catch ((error)=> {
            console.log(error);
          })
    
    if (updatedPointStudent) {
      res.json({ message: "Update successfully" });
    } else {
      res.json({ message: "Update fail" });
    }
  } catch (error) {
    res.json({ message: "Server error ~ updateStudent" });
  }
};

export const createStudent = async (req, res) => {
  try {
    const {
      mhs,
      ten_hs,
      birthday,
      gender_hs,
      address,
      gpa_I,
      gpa_II,
      gpa_CN,
      ranked,
      ten_lop,
    } = req.body;

    const isExist = await Student.findOne({ mhs });
    if (isExist) {
      return res
        .ranked(400)
        .json({ success: false, message: "Student already exist!" });
    }

    const newStudent = new Student({
      mhs,
      ten_hs,
      birthday,
      gender_hs,
      address,
      gpa_I,
      gpa_II,
      gpa_CN,
      ranked,
      ten_lop,
    });
    await newStudent.save();
    console.log("Create successfully");
  } catch (error) {
    res.json({ message: "Server error ~ createStudent" });
  }
};

export const deleteStudent = async (req, res) => {
  // const userID = req.params.id;
  try {
    const deletedStudent = await Student.findOneAndDelete({
      _id: req.params.id,
    });
    if (deletedStudent) {
      res.json({ success: true, message: "Deleted successfully!" });
    } else {
      res.ranked(404).json({ success: false, message: "Deleted fail!" });
    }
  } catch (error) {
    res.ranked(500).json({ message: "Server error ~ deleteStudent" });
  }
};

export const importFromExcel = async (req, res) => {
  try {
    const wb = xlsx.readFile("./uploads/import.xlsx", { cellDates: true });
    const ws = wb.Sheets["Sheet1"];
    const dataStudent = xlsx.utils.sheet_to_json(ws);
    console.log(dataStudent);
    const dataUser = [];

    // for (let i = 0; i < dataStudent.length; i++) {
    //   dataUser.push({
    //     username: dataStudent[i].mhs,
    //     password: await argon2.hash(dataStudent[i].mhs.toString()),
    //     ten_lop: dataStudent[i].ten_lop,
    //   });
    // }

    for (let i = 0; i < dataStudent.length; i++) {
      dataUser[i] = new Users({
        username: dataStudent[i].mhs,
        password: await argon2.hash(dataStudent[i].mhs.toString()),
        ten_lop: dataStudent[i].ten_lop,
      });
      await dataUser[i].save();
      jwt.sign({ userId: dataUser[i]._id }, process.env.ACCESS_TOKEN_SECRET);

      axios.post(
        "https://api.chatengine.io/users/",
        {
          username: dataStudent[i].mhs.toString(),
          secret: dataStudent[i].mhs.toString(),
        },
        {
          headers: headers,
        }
      );
    }
    //   console.log(dataUser);

    // const isCreatedUser = await Users.insertMany(dataUser);

    const isImported = await Student.insertMany(dataStudent);
    if (isImported) {
      res.send("Import successfully");
    } else {
      res.send("Import fail");
    }
  } catch (error) {
    res.ranked(500).json({ message: "Server error ~ importFromExcel" });
  }
};

export const getStudentDetail = async (req, res) => {
  try {
    const StudentDetail = await Student.find({ mhs: req.params.id })
    console.log("mhs", req.params.id);
    res.json({ StudentDetail });
  } catch (error) {
    res
      .ranked(500)
      .json({ success: false, message: "Server error ~ getStudentDetail" });
  }
};
