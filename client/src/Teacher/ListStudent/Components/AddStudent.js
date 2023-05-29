import React, { Component } from "react";
import { Link } from "react-router-dom";
import CallApi from "../../../API/CallApi";
import axios from "axios";
class AddForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mhs: "",
      ten_hs: "",
      birthday: "",
      gender_hs: "",
      phone_hs: "",
      address: "",
      ten_lop: "",
    };
  }

  onChange = (event) => {
    var target = event.target;
    var ten_hs = target.ten_hs;
    var value = target.value;
    this.setState({
      [ten_hs]: value,
    });
  };

  onSubmit = (event) => {
    event.preventDefault();
    CallApi("student/create", "POST", {
      mhs: this.state.mhs,
      ten_hs: this.state.ten_hs,
      birthday: this.state.birthday,
      gender_hs: this.state.gender_hs,
      address: this.state.address,
      ten_lop: this.state.ten_lop,
    });
    CallApi("create-student-account", "POST", {
      username: this.state.mhs,
      password: this.state.mhs,
      ten_lop: this.state.ten_lop,
    });

    const headers = {
      "PRIVATE-KEY": "14bf1d3f-a86c-4b1b-ad74-9675722ee4f8",
    };

    axios.post(
      "https://api.chatengine.io/users/",
      {
        username: this.state.mhs.toString(),
        secret: this.state.mhs.toString(),
      },
      {
        headers: headers,
      }
    );

    this.setState({
      mhs: "",
      ten_hs: "",
      birthday: "",
      gender_hs: "",
      address: "",
      ten_lop: "",
    });
    alert("Đã thêm thành công");
  };

  render() {
    return (
      <div className="addForm">
        <div className="back">
          <Link to="/home/list-students" className="btn btn-danger">
            <span className="fa fa-arrow-left"></span> &nbsp; Quay lại
          </Link>
        </div>
        <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5 center">
          <div className="panel panel-warning">
            <div className="panel-heading">
              <h3 className="panel-title">Thêm học sinh</h3>
            </div>
            <div className="panel-body">
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label>Mã HS: </label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    name="mhs"
                    value={this.state.mhs}
                    onChange={this.onChange}
                  />
                  <label>Họ và tên: </label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    name="ten_hs"
                    value={this.state.ten_hs}
                    onChange={this.onChange}
                  />
                  <label>Ngày sinh: </label>
                  <input
                    type="date"
                    className="form-control"
                    required
                    name="birthday"
                    value={this.state.birthday}
                    onChange={this.onChange}
                  />
                  <label>Giới tính:</label>
                  <select
                    className="form-control"
                    name="gender_hs"
                    required
                    value={this.state.gender_hs}
                    onChange={this.onChange}
                  >
                    <option>--Select--</option>
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                  </select>
                  {/* <label>Số điện thoại:</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    name="phone_hs"
                    value={this.state.phone_hs}
                    onChange={this.onChange}
                  /> */}
                  <label>Địa chỉ: </label>
                  <input
                    type="text"
                    className="form-control"
                    name="address"
                    value={this.state.address}
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
                      to="/home/list-students"
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
