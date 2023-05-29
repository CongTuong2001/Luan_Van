/* eslint-disable no-restricted-globals */
/* eslint-disable react/style-prop-object */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import CallApi from "../../../API/CallApi";

class OneRowData extends Component {

  constructor(props) {
    super(props);
    this.state = {
      teacher: this.props.teacher,
    }
  }

  onChange = (event) => {
    var target = event.target;
    var ten_lop = target.name;
    var value = target.value;
    this.setState({
      [ten_lop]: value,
    });
  };
  onDelete = (teacher) => {
    this.props.onDelete(teacher._id,teacher.mgv);
  };

  findIndex = (_id) => {
    return this.state.teacher.findIndex()
  }


  onSubmit = (mgv) => {
    // event.preventDefault();
    // var id = sessionStorage.getItem("userId");
    CallApi(`teacher/update/${mgv}`, "PATCH", {
      ten_lop: this.state.ten_lop,
    })
    // .then((res) => {
      alert("Cập nhật thành công");
    // });
  };

  render() {
    var { teacher, index } = this.props;
    return (
      <tr height='30px'>
        <td className='text_center'>{index + 1}</td>
        <td className='text_center'>{teacher.mgv}</td>
        <td className='text_center'>
          <span className='text_left'>{teacher.ten_gv}</span>
        </td>
        <td className='text_center'>{teacher.gender_gv}</td>
        <td className='text_center'>{teacher.phone_gv}</td>
        <td className='text_center'>{teacher.ten_lop}</td>
        <td className='text_center'>
          {/* <button
            // to={`/home/list-teachers/update/${teacher._id}`}
            className='btn btn-success'
            type="button"
            onClick={() => this.onChange(teacher._id, teacher.mgv)}>
            <span className='fa fa-pencil'></span> Sửa
          </button>{" "}
          &nbsp; */}
          <button 
            className='btn btn-primary'
            type='button'
            onClick={() => this.onSubmit(teacher.ten_lop)}>
            <span className='fa fa-save'></span> Lưu
          </button> 
          &nbsp;
          <button
            className='btn btn-danger'
            type='button'
            onClick={() => this.onDelete(teacher)}>
            <span className='fa fa-trash'></span> Xóa
          </button>{" "}
          &nbsp;
        </td>
      </tr>
    );
  }
}

export default OneRowData;
