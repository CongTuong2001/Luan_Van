/* eslint-disable react/jsx-pascal-case */
/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import CallApi from "../../API/CallApi";
import "../../index.css";
import "./View-point.css"

class ViewPoint extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mhs: "",
      ten_hs: "",

      Toan_I: "",
      Toan_II: "",
      Toan_CN: "",
     
      TiengViet_I: "",
      TiengViet_II: "",
      TiengViet_CN: "",
      
      KhoaHoc_I: "",
      KhoaHoc_II: "",
      KhoaHoc_CN: "",
      
      DL_LS_I: "",
      DL_LS_II: "",
      DL_LS_CN: "",
      
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
      ten_lop: "",
    };
  }



  componentDidMount() {

      var id = sessionStorage.getItem("mhs");
      CallApi(`student/${id}`, "GET", null).then((res) => {
        var data = res.data.StudentDetail[0];
        if(!data){
          return;
        }
        this.setState({
          mhs: data.mhs,
          ten_hs: data.ten_hs,

          Toan_I: data.Toan_I,
          Toan_II: data.Toan_II,
          Toan_CN: ((Number(data.Toan_I) + Number((data.Toan_II) * 2)) / 3).toFixed(1),

          TiengViet_I: data.TiengViet_I,
          TiengViet_II: data.TiengViet_II,
          TiengViet_CN: ((Number(data.TiengViet_I) + Number((data.TiengViet_II) * 2)) / 3).toFixed(1),

          KhoaHoc_I: data.KhoaHoc_I,
          KhoaHoc_II: data.KhoaHoc_II,
          KhoaHoc_CN: ((Number(data.KhoaHoc_I) + Number((data.KhoaHoc_II) * 2)) / 3).toFixed(1),

          DL_LS_I: data.DL_LS_I,
          DL_LS_II: data.DL_LS_II,
          DL_LS_CN: ((Number(data.DL_LS_I) + Number((data.DL_LS_II) * 2)) / 3).toFixed(1),

          DaoDuc_I: data.DaoDuc_I,
          DaoDuc_II: data.DaoDuc_II,
          DaoDuc_CN: ((Number(data.DaoDuc_I) + Number((data.DaoDuc_II) * 2)) / 3).toFixed(1),

          AnhVan_I: data.AnhVan_I,
          AnhVan_II: data.AnhVan_II,
          AnhVan_CN: ((Number(data.AnhVan_I) + Number((data.AnhVan_II) * 2)) / 3).toFixed(1),

          gpa_I: data.gpa_I,
          gpa_II: data.gpa_II,
          gpa_CN: data.gpa_CN,
          ranked: data.ranked,
          ten_lop: data.ten_lop,
        });
      });
    
  }

  onChange = (event) => {
    var target = event.target;
    var ten_hs = target.ten_hs;
    var value = target.value;
    this.setState({
      [ten_hs]: value,
    });
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
    var {
      mhs,
      ten_hs,
      Toan_I,
      Toan_II,
      Toan_CN,
      
      TiengViet_I,
      TiengViet_II,
      TiengViet_CN,

      KhoaHoc_I,
      KhoaHoc_II,
      KhoaHoc_CN,
     
      DL_LS_I,
      DL_LS_II,
      DL_LS_CN,
      
      DaoDuc_I,
      DaoDuc_II,
      DaoDuc_CN,

      AnhVan_I,
      AnhVan_II,
      AnhVan_CN,
      
      gpa_I,
      gpa_II,
      gpa_CN,

      ranked,
      ten_lop
    } = this.state;
    return (
      <div className="Vp">
        <h2 className="Title">Bảng điểm cá nhân</h2>
        <div className="Site">
          <div className="Infor_site">
            <div className="Left_div">
              <div className="Title_infor">Mã học sinh: 
                <p className="Name_infor">{mhs}</p>
              </div>
              <div className="Title_infor">Họ và tên: 
                <p className="Name_infor">{ten_hs}</p> 
              </div>
              <div className="Title_infor">Lớp: 
                <p className="Name_infor">{ten_lop}</p>
              </div>
              <table className="Table_1" border={1}>
                <tr>
                    <th className="thMon" rowSpan={2}>Môn học</th>
                    <th colSpan={3}>Điểm trung bình các môn học</th>
                </tr>
                <tr>
                    <th >Học kì I</th>
                    <th >Học kì II</th>
                    <th >Cả Năm</th>
                </tr>
                <tr>
                    <th>Toán</th>
                    <td>{Toan_I}</td>
                    <td>{Toan_II}</td>
                    <td className="td_gpa1">{Toan_CN}</td>
                </tr>
                <tr>
                    <th>Tiếng Việt</th>
                    <td>{TiengViet_I}</td>
                    <td>{TiengViet_II}</td>
                    <td className="td_gpa1">{TiengViet_CN}</td>
                </tr>
                <tr>
                    <th>Khoa Học</th>
                    <td>{KhoaHoc_I}</td>
                    <td>{KhoaHoc_II}</td>
                    <td className="td_gpa1">{KhoaHoc_CN}</td>
                </tr>
                <tr>
                    <th>ĐL và LS</th>
                    <td>{DL_LS_I}</td>
                    <td>{DL_LS_II}</td>
                    <td className="td_gpa1">{DL_LS_CN}</td>
                </tr>
                <tr>
                    <th>Đạo Đức</th>
                    <td>{DaoDuc_I}</td>
                    <td>{DaoDuc_II}</td>
                    <td className="td_gpa1">{DaoDuc_CN}</td>
                </tr>
                <tr>
                    <th>Anh Văn</th>
                    <td>{AnhVan_I}</td>
                    <td>{AnhVan_II}</td>
                    <td className="td_gpa1">{AnhVan_CN}</td>
                </tr>
              </table>
            </div>
          </div>
          <div>
            <div className="Gpa_site">  
              <p className="Title_gpa">Điểm số</p>
              <table className="Table_2">
                <thead>
                  <tr>
                    <th>Điểm HKI</th>
                    <th>Điểm HKII</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="td_gpa">{gpa_I}</td>
                    <td className="td_gpa">{gpa_II}</td>
                  </tr>
                </tbody>
              </table>
              <p className="Gpa">Điểm trung bình cả năm :</p>
              <div className="Point_CN">{gpa_CN}</div>
              <p className="Rank_title">Xếp loại: </p>
              <label className="Rank">
                <div className="ranked">
                  {this.ranked()}
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ViewPoint;