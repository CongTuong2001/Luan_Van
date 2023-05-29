/* eslint-disable react/style-prop-object */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import "./ListStudent.css";
import ListSV from "./Components/ListHS";
import { Link } from "react-router-dom";
import CallApi from "../../API/CallApi";
import ExportToExcel from "./Components/ExportData";

class ListStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      ten_lop: [],
      item: sessionStorage.getItem("item"),
    };
  }

  componentDidMount() {
    this.setState({
      ten_lop: sessionStorage.getItem("ten_lop").split(", "),
    });
    var item = sessionStorage.getItem("item");
    CallApi(`student/all/${item}`, "GET", null).then((res) => {
      if (res.data.ListStudents != null) {
        this.setState({
          students: res.data.ListStudents,
        });
      } else {
        this.setState({
          students: [],
        });
      }
      console.log(this.state.students);
    });
  }
  
  ChooseClass = (item) => {
    sessionStorage.setItem("item", item);
    CallApi(`student/all/${item}`, "GET", null).then((res) => {
      if (res.data.ListStudents != null) {
        this.setState({
          students: res.data.ListStudents,
        });
      } else {
        this.setState({
          students: [],
        });
      }
    });
  };

  findIndex = (_id) => {
    var { students } = this.state;
    var result = -1;
    students.forEach((student, index) => {
      if (student._id === _id) result = index;
    });
    return result;
  };

  onDelete = (_id, mhs) => {
    var { students } = this.state;
    CallApi(`student/delete/${_id}`, "DELETE", null).then((res) => {
      if (res.status === 200) {
        var index = this.findIndex(_id);
        if (index !== -1) {
          students.splice(index, 1);
          this.setState({
            students: students,
          });
        }
      }
    });
    CallApi(`delete-student-account/${mhs}`, "DELETE", null);
  };

  render() {
    var { ten_lop, students } = this.state;
    return (
      <div className='Container'>
        <div className='text_center'>
          <h1 id='title'>Quản lý học sinh</h1>
        </div>
        <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
          &nbsp;
          <div className='dropdown'>
            <p
              // type='button'
              className='btn dropdown-toggle'
              id='dropdownMsv'
              data-toggle='dropdown'
              aria-haspopup='true'
              aria-expanded='true'
              >
              Lớp:  &nbsp; {ten_lop}
            </p>
            <ul className='dropdown-menu' aria-labelledby='dropdownMenu1'>
              {ten_lop.map((item) => (
                <li
                  to='/home/list-students'
                  key={item}
                  onClick={() => this.ChooseClass(item)}>
                  <a role='button'>{item}</a>
                </li>
              ))}
            </ul>
          </div>
          <Link to='/home/list-students/add_student' className='btn btn-primary'>
            <span className='fa fa-plus'></span> &nbsp; Thêm học sinh
          </Link>{" "}
          &nbsp;
          <div className='data'>
            <ExportToExcel apiData={students} fileName={this.state.item} />
          </div>
          &nbsp;
          {/* <Link
            to='/home/list-students/import-data'
            className='btn btn-primary data'>
            <span className='fa fa-file-import'></span>&nbsp; Nhập dữ liệu từ
            Excel
          </Link> */}
          <div className='row'>
            <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
              <ListSV students={students} onDelete={this.onDelete} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ListStudent;
