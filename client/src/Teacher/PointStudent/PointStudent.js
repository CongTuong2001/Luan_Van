/* eslint-disable react/style-prop-object */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import "./PointStudent.css";
import PointHS from "./Components/PointHS";
import PointHS_2 from "./Components/PointHS_2";
import CallApi from "../../API/CallApi";
import ExportToExcel from "./Components/ExportPoint";
class PointStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      ten_lop: [],
      current_hk: 'Học Kỳ I',
      cureent_lop: "",
      ten_hk: [ 
        "Học Kỳ I",
        "Học Kỳ II"
      ],
      // ten_nk: [ "2020-2021", "2021-2022", "2022-2023"],
      item: sessionStorage.getItem("item"),

      Toan_I: "",
      Toan_II: "",
      Toan_CN: "",
      TiengViet_I: "",
      TiengViet_II: "",
      TiengViet_CN: "",
      KhoaHoc_I: "",
      KhoaHoc_II: "",
      KhoaHoc_CN: "",
      DL_va_LS_I: "",
      DL_va_LS_II: "",
      DL_va_LS_CN: "",
      DaoDuc_I: "",
      DaoDuc_II: "",
      DaoDuc_CN: "",
      AnhVan_I: "",
      AnhVan_II: "",
      AnhVan_CN: "",
      gpa_I: "",
      gpa_II: "",
      gpa_CN: "",
      ranked: "",
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
      console.log("Load lai", res.data)
      if (res.data.ListStudents != null) {
        this.setState({
          students: res.data.ListStudents,
          cureent_lop:item
        });
      } else {
        this.setState({
          students: [],
        });
      }
    });
  };

  ChooseSemester = (semester) => {
    this.ChooseClass(this.state.cureent_lop)
        this.setState({
          current_hk: semester,
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
    var { 
          ten_hk, 
          ten_lop, 
          students,
          current_hk,
          cureent_lop,
        } = this.state;
        return (
          <div className='Container'>
            <div className='text_center'>
              <h1 id='title'>Quản lý điểm học sinh</h1>
            </div>
            <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12' style={{marginTop: "20px"}}>
              &nbsp;
              {/* Lớp */}
              <div className='dropdown'>
                <p
                  // type='button'
                  className='btn dropdown-toggle'
                  id='dropdownMsv'
                  data-toggle='dropdown'
                  aria-haspopup='true'
                  aria-expanded='true'
                  >
                  Lớp:  &nbsp; 
                  {cureent_lop}
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
              &nbsp;
              {/* Học kỳ */}
              <div className='dropdown'>
                <p
                  // type='button'
                  className='btn dropdown-toggle'
                  id='dropdownMhk'
                  data-toggle='dropdown'
                  aria-haspopup='true'
                  aria-expanded='true'
                  placeholder="Học kỳ"
                  >
                  {current_hk}
                  <span className='fa fa-caret-square-o-down' style={{marginLeft: "5px"}}></span>
                </p>
                <ul className='dropdown-menu' aria-labelledby='dropdownMenu1'>
                  {ten_hk.map((semester) => (
                    <li
                      to='/home/list-students'
                      key={semester}
                      onClick={() => this.ChooseSemester(semester)}>
                      <a role='button'>{semester}</a>
                    </li>
                  ))}
                </ul>
              </div>
              &nbsp;
              {/* Năm học */}
              {/* <div className='dropdown'>
                <p
                  // type='button'
                  className='btn dropdown-toggle'
                  id='dropdownMhk'
                  data-toggle='dropdown'
                  aria-haspopup='true'
                  aria-expanded='true'
                  >
                  Năm học: {sessionStorage.getItem("year")} 
                  &nbsp; 
                  <span className='fa fa-caret-square-o-down'></span>
                </p>
                <ul className='dropdown-menu' aria-labelledby='dropdownMenu1'>
                  {ten_nk.map((year) => (
                    <li
                      to='/home/list-students'
                      key={year}
                      onClick={() => this.ChooseSchoolYear(year)}>
                      <a role='button'>{year}</a>
                    </li>
                  ))}
                </ul>
              </div> */}
              {/* <label
                style={{
                  paddingTop: "8px",
                  paddingBottom: "2px",
                  marginRight: "10px",
                }}>
                {sessionStorage.getItem("item")}
              </label> */}
              
              <div className='data'>
                <ExportToExcel apiData={students} fileName={this.state.item} />
              </div>
              &nbsp;
              {/* <Link
                to='/home/point-students/import-point'
                className='btn btn-primary data'>
                <span className='fa fa-file-import'></span>&nbsp; Nhập dữ liệu từ
                Excel
              </Link> */}
              <div className='row'>
                {/* {current_hk} : {this.state.cureent_lop} */}
                <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
                {current_hk==='Học Kỳ I'&&<PointHS students={students} onDelete={this.onDelete} />}
                {current_hk==='Học Kỳ II'&&<PointHS_2 students={students} onDelete={this.onDelete} />}
                </div>
              </div>
            </div>
          </div>
        );
    
  }
}

export default PointStudent;