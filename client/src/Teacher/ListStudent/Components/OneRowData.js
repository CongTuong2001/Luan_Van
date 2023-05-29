/* eslint-disable no-restricted-globals */
/* eslint-disable react/style-prop-object */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import moment from "moment";

class OneRowData extends Component {
  onDelete = (_id, mhs) => {
    if (confirm("Bạn chắc chắn muốn xóa học sinh này ?")) {
      this.props.onDelete(_id, mhs);
    }
  };

  ranked = () => {
    if (this.state.gpa_CN >= 9.1) {
      return "Xuất sắc";
    }  else if (this.state.gpa_CN >= 8.0) {
      return "Giỏi";
    } else if (this.state.gpa_CN >= 6.0) {
      return "Khá";
    } else if (this.state.gpa_CN >= 5.0) {
      return "Trung bình";
    } else {
      return "Yếu";
    }
  }

  render() {
    var { student, index } = this.props;
    //console.log(student.ngaysinh);
    return (
      <tr height='30px'>
        <td className='text_center'>{index + 1}</td>
        <td className='text_center'>{student.mhs}</td>
        <td className='text_center'>
          <span className='text_left'>{student.ten_hs}</span>
        </td>
        <td className='text_center'>
          {moment(student.birthday).format("DD/MM/YYYY")}
        </td>
        <td className='text_center'>{student.gender_hs}</td>
        <td className='text_center'>{student.gpa_CN}</td>
        <td className='text_center'>{student.ranked}</td>
        <td className='text_center'>
          <button
            className='btn btn-danger'
            type='button'
            onClick={() => this.onDelete(student._id, student.mhs)}>
            <span className='fa fa-trash'></span> &nbsp;Xóa
          </button>{" "}
        </td>
      </tr>
    );
  }
}

export default OneRowData;
