import React, { Component } from "react";
import { Link } from "react-router-dom";
import CallApi from "../../../API/CallApi";
import axios from "axios";
class AddForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mgv: "",
      ten_gv: "",
      gender_gv: "",
      phone_gv: "",
      ten_lop: "",
    };
  }

  onChange = (event) => {
    var target = event.target;
    var ten_gv = target.ten_gv;
    var value = target.value;
    this.setState({
      [ten_gv]: value,
    });
  };

  onSubmit = (event) => {
    event.preventDefault();
    CallApi("student/create", "POST", {
      mgv: this.state.mgv,
      ten_gv: this.state.ten_gv,
      gender_gv: this.state.gender_gv,
      phone_gv: this.state.phone_gv,
      ten_lop: this.state.ten_lop,
    });
    CallApi("create-teacher-account", "POST", {
      username: this.state.mgv,
      password: this.state.mgv,
      ten_lop: this.state.ten_lop,
    });

    const headers = {
      "PRIVATE-KEY": "14bf1d3f-a86c-4b1b-ad74-9675722ee4f8",
    };

    axios.post(
      "https://api.chatengine.io/users/",
      {
        username: this.state.mgv.toString(),
        secret: this.state.mgv.toString(),
      },
      {
        headers: headers,
      }
    );

    this.setState({
      mgv: "",
      ten_gv: "",
      gender_gv: "",
      phone_gv: "",
    });
    alert("Đã thêm thành công");
  };

  render() {
    return (
      <div className="addForm">
        <div className="back">
          <Link to="/home/permission" className="btn btn-danger">
            <span className="fa fa-arrow-left"></span> &nbsp; Quay lại
          </Link>
        </div>
        <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5 center">
          <div className="panel panel-warning">
            <div className="panel-heading">
              <h3 className="panel-title">Thêm giáo viên</h3>
            </div>
            <div className="panel-body">
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label>Mã GV: </label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    name="mgv"
                    placeholder={this.state.mgv}
                    onChange={this.onChange}
                  />
                  <label>Họ và tên: </label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    name="ten_gv"
                    value={this.state.ten_gv}
                    onChange={this.onChange}
                  />
                  <label>Giới tính:</label>
                  <select
                    className="form-control"
                    name="gender_gv"
                    required
                    value={this.state.gender_gv}
                    onChange={this.onChange}
                  >
                    <option>--Select--</option>
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                  </select>
                  <label>Số điện thoại:</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    name="phone_gv"
                    value={this.state.phone_gv}
                    onChange={this.onChange}
                  />
                  <label>Lớp:</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    name="ten_lop"
                    value={this.state.ten_lop}
                    onChange={this.onChange}
                  />
                  <br />
                  <div className="text_center">
                    <button
                      type="submit"
                      className="button submit btn btn-primary"
                      onClick={this.onSubmit}
                    >
                      <span className="fa fa-plus"></span> &nbsp;Lưu lại
                    </button>{" "}
                    &nbsp;
                    <Link
                      to="/home/permission"
                      className="button cancle btn btn-primary"
                    >
                      <span className="fa fa-close"></span> &nbsp;Hủy bỏ
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddForm;
