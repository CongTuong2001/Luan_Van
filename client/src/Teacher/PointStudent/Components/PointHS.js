/* eslint-disable react/style-prop-object */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import Sort from "./Sort";
import OneRowData from "./OneRowData";

class PointHS extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: this.props.students,
      filter: {
        mhs: "",
        ten_hs: "",
        Toan: "",
        TiengViet: "",
        KhoaHoc: "",
        DL_va_LS: "",
        DaoDuc: "",
        gpa: "",
        ranked: "",
      },
      sort: {
        by: "mhs",
        value: 1,
      },
    };
  }

  componentDidMount() {
    this.setState({
      students: this.props.students,
    });
  }

  onDelete = (_id, mhs) => {
    this.props.onDelete(_id, mhs);
  };

  onChange = (event) => {
    var target = event.target;
    var ten_hs = target.ten_hs;
    var value = target.value;
    this.setState({
      filter: {
        [ten_hs]: value,
      },
    });
  };

  onSort = (sortBy, sortValue) => {
    this.setState({
      sort: {
        by: sortBy,
        value: sortValue,
      },
    });
  };

  render() {
    var { filter, sort } = this.state;
    var students = this.props.students;
    console.log(students);
    if (filter) {
      if (filter.mhs) {
        students = students.filter((student) => {
          return student.mhs.indexOf(filter.mhs) === 0;
        });
      }
      if (filter.ten_hs) {
        students = students.filter((student) => {
          return student.ten_hs.indexOf(filter.ten_hs) !== -1;
        });
      }
      if (filter.gpa) {
        students = students.filter((student) => {
          if (filter.gpa === "all") return true;
          else if (filter.gpa === "5") return student.gpa < 5;
          else {
            var gpa = filter.gpa.toString().split("-");
            return student.gpa > gpa[0] && student.gpa <= gpa[1];
          }
        });
      }
      if (filter.ranked) {
        students = students.filter((student) => {
          if (filter.ranked === "all") return true;
          else return student.ranked === filter.ranked;
        });
      }
    }

    if (sort) {
      if (sort.by === "mhs") {
        students.sort((student1, student2) => {
          //console.log(typeof student1.ten_hs,'-',student2.ten_hs);
          if (student1.mhs > student2.mhs) return sort.value;
          else if (student1.mhs < student2.mhs) return -sort.value;
          else return 0;
        });
      } else if (sort.by === "ten_hs") {
        students.sort((student1, student2) => {
          if (student1.ten_hs.localeCompare(student2.ten_hs) < 0) return sort.value;
          else if (student1.ten_hs.localeCompare(student2.ten_hs) > 0)
            return -sort.value;
          else return 0;
        });
      } else {
        students.sort((student1, student2) => {
          if (student1.gpa > student2.gpa) return sort.value;
          else if (student1.gpa < student2.gpa) return -sort.value;
          else return 0;
        });
      }
    }
    var studentList =  students.map((student, index) => {
      return (
        <OneRowData
          key={student.id}
          index={index}
          student={student}
          onDelete={this.onDelete}
        />
      );
    });
    return (
      <div>
        <table className="table table-bordered table-hover">
          <Sort onSort={this.onSort} />

          <tbody>
            {studentList}
          </tbody>
        </table>
      </div>
    );
  }
}

export default PointHS;
