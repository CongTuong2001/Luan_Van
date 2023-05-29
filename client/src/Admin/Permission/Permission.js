/* eslint-disable react/style-prop-object */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import CallApi from "../../API/CallApi";
import ListGV from "./Components/ListGV";

class Permission extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teachers: [],
      chuc_vu: [],
      item: sessionStorage.getItem("item"),
    };
  }

  componentDidMount() {
    // this.setState({
    //   chuc_vu: sessionStorage.getItem("chuc_vu").split(", "),
    // });
    var item = sessionStorage.getItem("item");
    CallApi(`teacher/all/`, "GET", null).then((res) => {
      console.log("res",res);
      if (res.data.ListTeachers != null) {
        this.setState({
          teachers: res.data.ListTeachers,
        });
      } else {
        this.setState({
          teachers: [],
        });
      }
      console.log(this.state.teachers);
    });
  }


  findIndex = (_id) => {
    var { teachers } = this.state;
    var result = -1;
    teachers.forEach((student, index) => {
      if (student._id === _id) result = index;
    });
    return result;
  };

  onDelete = (_id,mgv) => {
    const {teachers} = this.state;
    CallApi(`teacher/delete/${_id}`, "DELETE", null).then((res) => {
      if (res.status === 200) {
        var index = this.findIndex(_id);
        if (index !== -1) {
          teachers.splice(index, 1);
          this.setState({
            teachers: teachers,
          });
        }
      }
    });
    CallApi(`delete-teacher-account/${mgv}`, "DELETE", null);
    console.log("delete", mgv)
  };

  render() {
    var { teachers } = this.state;
    return (
      <div className='Container'>
        <div className='text_center'>
          <h1 id='title'>Cấp Quyền</h1>
        </div>
        <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
          <label
            style={{
              paddingTop: "8px",
              paddingBottom: "2px",
              marginRight: "10px",
            }}>
            {sessionStorage.getItem("item")}
          </label>
          <Link to='/home/permission/add_teacher' className='btn btn-primary'>
            <span className='fa fa-plus'></span> &nbsp; Thêm giáo viên
          </Link>{" "}
          <div className='row'>
            <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
              {teachers&&
              <ListGV teachers={teachers} onDelete={this.onDelete} />}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Permission;
