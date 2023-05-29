/* eslint-disable no-restricted-globals */
/* eslint-disable react/style-prop-object */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import CallApi from "../../../API/CallApi";

class OneRowData extends Component {
  constructor(props) {
    super(props);
    console.log("prop", props)
    this.state = {
      Toan_I: this.props.student.Toan_I,
      Toan_II: this.props.student.Toan_II,
      Toan_CN: this.props.student.Toan_CN,
      TiengViet_I: this.props.student.TiengViet_I,
      TiengViet_II: this.props.student.TiengViet_II,
      TiengViet_CN: this.props.student.TiengViet_CN,
      KhoaHoc_I: this.props.student.KhoaHoc_I,
      KhoaHoc_II: this.props.student.KhoaHoc_II,
      KhoaHoc_CN: this.props.student.KhoaHoc_CN,
      DL_LS_I: this.props.student.DL_LS_I,
      DL_LS_II: this.props.student.DL_LS_II,
      DL_LS_CN: this.props.student.DL_LS_CN,
      DaoDuc_I: this.props.student.DaoDuc_I,
      DaoDuc_II: this.props.student.DaoDuc_II,
      DaoDuc_CN: this.props.student.DaoDuc_CN,
      AnhVan_I: this.props.student.AnhVan_I,
      AnhVan_II: this.props.student.AnhVan_II,
      AnhVan_CN: this.props.student.AnhVan_CN,
      gpa_I: this.props.student.gpa_I,
      gpa_II: this.props.student.gpa_II,
      gpa_CN: this.props.student.gpa_I,
      ranked: this.props.student.ranked,
      ten_lop: this.props.student.ten_lop,
    };
  }

  update = ()=>{
    let sum = 
      Number(this.state.Toan_I||0) + 
      Number(this.state.TiengViet_I||0) + 
      Number(this.state.KhoaHoc_I||0) + 
      Number(this.state.DL_LS_I||0) + 
      Number(this.state.DaoDuc_I||0) + 
      Number(this.state.AnhVan_I||0)
      ;
      sum/=6;
      console.log("sum", sum)
      this.setState({gpa_I: sum.toFixed(1),})
      return sum
  }

  componentDidMount() {
    const { student } = this.props;
    console.log("student", student)
        this.setState({
          Toan_I: student.Toan_I,
          Toan_II: student.Toan_II,
          Toan_CN: student.Toan_CN,
          TiengViet_I: student.TiengViet_I,
          TiengViet_II: student.TiengViet_II,
          TiengViet_CN: student.TiengViet_CN,
          KhoaHoc_I: student.KhoaHoc_I,
          KhoaHoc_II: student.KhoaHoc_II,
          KhoaHoc_CN: student.KhoaHoc_CN,
          DL_LS_I: student.DL_LS_I,
          DL_LS_II: student.DL_LS_II,
          DL_LS_CN: student.DL_LS_CN,
          DaoDuc_I: student.DaoDuc_I,
          DaoDuc_II: student.DaoDuc_II,
          DaoDuc_CN: student.DaoDuc_CN,
          AnhVan_I: student.AnhVan_I,
          AnhVan_II: student.AnhVan_II,
          AnhVan_CN: student.AnhVan_CN,
          gpa_I: student.gpa_I,
          gpa_II: student.gpa_II,
          gpa_CN: student.gpa_CN,
          ranked: student.ranked,
          ten_lop: student.ten_lop,
        });
  }

  onSubmit = ( mhs) => {
    // event.preventDefault();
    // var id = sessionStorage.getItem("mhs");
    
    CallApi(`student/update-point/${mhs}`, "PATCH", {
      Toan_I: this.state.Toan_I,
      Toan_II: this.state.Toan_II,
      Toan_CN: this.state.Toan_CN,
      TiengViet_I: this.state.TiengViet_I,
      TiengViet_II: this.state.TiengViet_II,
      TiengViet_CN: this.state.TiengViet_CN,
      KhoaHoc_I: this.state.KhoaHoc_I,
      KhoaHoc_II: this.state.KhoaHoc_II,
      KhoaHoc_CN: this.state.KhoaHoc_CN,
      DL_LS_I: this.state.DL_LS_I,
      DL_LS_II: this.state.DL_LS_II,
      DL_LS_CN: this.state.DL_LS_CN,
      DaoDuc_I: this.state.DaoDuc_I,
      DaoDuc_II: this.state.DaoDuc_II,
      DaoDuc_CN: this.state.DaoDuc_CN,
      AnhVan_I: this.state.AnhVan_I,
      AnhVan_II: this.state.AnhVan_II,
      AnhVan_CN: this.state.AnhVan_CN,
      gpa_I: this.update().toFixed(1),
      gpa_II: this.state.gpa_II||0,
      gpa_CN: ((Number(this.state.gpa_II ) * 2 + this.update().toFixed(1)) / 3).toFixed(1),
      ranked: this.state.ranked,
    })
    console.log("Uopdate", this.state);
    // .then((res) => {
    //   alert("Cập nhật thành công");
    // });
  };

  onChangeToan = (event) => {
    var target = event.target;
    var Toan_I = target.name;
    var value = target.value;
    this.setState({
      [Toan_I]: value,
    });
  };
  onChangeTV = (event) => {
    var target = event.target;
    var TiengViet_I = target.name;
    var value = target.value;
    this.setState({
      [TiengViet_I]: value,
    });
  };
  onChangeKH = (event) => {
    var target = event.target;
    var KhoaHoc_I = target.name;
    var value = target.value;
    this.setState({
      [KhoaHoc_I]: value,
    });
  };
  onChangeDL_LS = (event) => {
    var target = event.target;
    var DL_LS_I = target.name;
    var value = target.value;
    this.setState({
      [DL_LS_I]: value,
    });
  };
  onChangeDD = (event) => {
    var target = event.target;
    var DaoDuc_I = target.name;
    var value = target.value;
    this.setState({
      [DaoDuc_I]: value,
    });
  };
  onChangeAV = (event) => {
    var target = event.target;
    var AnhVan_I = target.name;
    var value = target.value;
    this.setState({
      [AnhVan_I]: value,
    });
  };


  render() {
    var { student,index } = this.props;
    return (
      <tr height='30px'>
        <td className='text_center'>{index + 1}</td>
        <td className='text_center'>{student.mhs}</td>
        <td className='text_center'>
          <span className='text_left'>{student.ten_hs}</span>
        </td>
        {/* Toán */}
        <td className='text_center'>
          <input 
            className='text_center form-control' 
            type='text' 
            name='Toan_I'
            placeholder={this.state.Toan_I}
            onChange={this.onChangeToan}
          />
        </td>
        {/* Tiếng Việt */}
        <td className='text_center'>
          <input 
              className='text_center form-control' 
              type='text' 
              name='TiengViet_I'
              placeholder={this.state.TiengViet_I}
              onChange={this.onChangeTV}
            />        
        </td>
        {/* Khoa Học */}
        <td className='text_center'>
          <input 
            className='text_center form-control' 
            type='text' 
            name='KhoaHoc_I'
            placeholder={this.state.KhoaHoc_I}
            onChange={this.onChangeKH}
          />
        </td>
        {/* ĐL - LS */}
        <td className='text_center'>
          <input 
            className='text_center form-control' 
            type='text' 
            name='DL_LS_I'
            placeholder={this.state.DL_LS_I}
            onChange={this.onChangeDL_LS}
          />
        </td>
        {/* Đạo Đức */}
        <td className='text_center'>
          <input 
            className='text_center form-control' 
            type='text' 
            name='DaoDuc_I'
            placeholder={this.state.DaoDuc_I}
            onChange={this.onChangeDD}
          />
        </td>
        {/* Anh Văn */}
        <td className='text_center'>
          <input 
            className='text_center form-control' 
            type='text' 
            name='AnhVan_I'
            placeholder={this.state.AnhVan_I}
            onChange={this.onChangeAV}
          />
        </td>
        <td className='text_center' style={{fontWeight: "bold", fontSize: "2rem"}}>{this.state.gpa_I}</td>
        <td className='text_center' style={{fontWeight: "bold", fontSize: "2rem"}}>
          <div
            type='submit'
            className='btn btn-primary'
            style={{ marginRight: "20px" }}
            onClick={()=>this.onSubmit(student.mhs)}>
            <span className='fa fa-save'></span> &nbsp; Lưu
          </div>
        </td>
      </tr>
    );
  }
}

export default OneRowData;
