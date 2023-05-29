/* eslint-disable react/jsx-pascal-case */
/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import CallApi from "../../API/CallApi";
import styled from "styled-components";
import moment from "moment";
import "../../index.css";
import avatar from "./avatar.png";

const Body = styled.div`
  font-family: Verdana, Geneva, Tahoma, sans-serif;
`;
const Title = styled.h2`
  text-align: center;
  text-shadow: 2px 7px 5px rgba(0, 0, 0, 0.3);
  font-size: 5rem;
  font-weight: bolder;
  margin-top: 5%;
  color: #0b5592;
`;
const Infor_site = styled.div`
  background-color: white;
  padding: 2rem 3rem;
  width: 70%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 10px;
  background-color: whitesmoke;
`;
const Infor = styled.div`
  display: flex;
`;
const Left_div = styled.div`
  padding-right: 20px;
  padding-left: 10px;
  width: 50%;
`;
const Right_div = styled.div`
  padding-right: 10px;
  margin-left: 10px;
`;
const Image_div = styled.div`
  margin-right: 20px;
  padding-top: 30px;
`;
const Title_infor = styled.p`
  font-size: 2.5rem;
  width: 60%;
  margin: auto;
  padding-bottom: 20px;
  text-align: center;
  font-weight: bold;
  text-shadow: 2px 7px 5px rgba(0, 0, 0, 0.3),
    0px -4px 10px rgba(255, 255, 255, 0.3);
`;
const Site = styled.div`
  display: flex;
  margin-top: 5%;
  justify-content: center;
`;
const Btn_site = styled.div`
  position: static;
  margin-top: 5vh;
  text-align: center;
`;
class InfoStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mhs: "",
      ten_hs: "",
      birthday: "",
      gender_hs: "",
      address: "",
      ten_lop: "",
      ten_cha: "",
      ten_me: "",
      phone_cha: "",
      phone_me: "",
    };
  }

  componentDidMount() {
    var { match } = this.props;
    if (match) {
      var id = sessionStorage.getItem("mhs");
      CallApi(`student/${id}`, "GET", null).then((res) => {
        var data = res.data.StudentDetail[0];
        if(!data){
          return;
        }
        this.setState({
          mhs: data.mhs,
          ten_hs: data.ten_hs,
          birthday: data.birthday,
          gender_hs: data.gender_hs,
          address: data.address,
          ten_lop: data.ten_lop,
          ten_cha: data.ten_cha,
          ten_me: data.ten_me,
          phone_cha: data.phone_cha,
          phone_me: data.phone_me,
        });
      });
    }
  }

  onChangedc = (event) => {
    var target = event.target;
    var address = target.name;
    var value = target.value;
    this.setState({
      [address]: value,
    });
  };

  onChangecha = (event) => {
    var target = event.target;
    var ten_cha = target.name;
    var value = target.value;
    this.setState({
      [ten_cha]: value,
    });
  };

  onChangeme = (event) => {
    var target = event.target;
    var ten_me = target.name;
    var value = target.value;
    this.setState({
      [ten_me]: value,
    });
  };

  onChangesdtcha = (event) => {
    var target = event.target;
    var phone_cha = target.name;
    var value = target.value;
    this.setState({
      [phone_cha]: value,
    });
  };

  onChangesdtme = (event) => {
    var target = event.target;
    var phone_me = target.name;
    var value = target.value;
    this.setState({
      [phone_me]: value,
    });
  };

  onSubmit = (event) => {
    event.preventDefault();
    var id = sessionStorage.getItem("userId");
    CallApi(`student/update/${id}`, "PATCH", {
      address: this.state.address,
      ten_cha: this.state.ten_cha,
      ten_me: this.state.ten_me,
      phone_cha: this.state.phone_cha,
      phone_me: this.state.phone_me,
    }).then((res) => {
      alert("Cập nhật thành công");
    });
  };

  render() {
    var {
      mhs,
      ten_hs,
      birthday,
      gender_hs,
      address,
      ten_lop,
      ten_cha,
      ten_me,
      phone_cha,
      phone_me,
    } = this.state;
    return (
      <div className='container'>
        <Body>
          <Title>Thông tin cá nhân</Title>
          <Site>
            <Infor_site>
              <Title_infor>Thông tin cá nhân</Title_infor>
              <Infor>
                <Image_div>
                  <img
                    className='avatar'
                    src={avatar}
                    width='100px'
                    height='150px'
                  />
                </Image_div>
                <Left_div>
                  <p>Mã học sinh: </p>
                  <label>{mhs}</label>
                  
                  <p style={{ marginTop: "10px" }}>Họ và tên học sinh: </p>
                  <label>{ten_hs}</label>
                  
                  <p style={{ marginTop: "10px" }}>Giới tính:</p>
                  <label>{gender_hs}</label>
                  
                  <p style={{ marginTop: "10px" }}>Ngày sinh:</p>
                  <label>{moment(birthday).format("DD/MM/YYYY")}</label>
                  <p style={{ marginTop: "10px" }}>Họ và tên cha: </p>
                  <input
                    style={{ width: "85%", paddingLeft: "5px" }}
                    type='text'
                    name='ten_cha'
                    placeholder={ten_cha}
                    onChange={this.onChangecha}
                  />
                  <p style={{ marginTop: "10px" }}>Họ và tên mẹ: </p>
                  <input
                    style={{ width: "85%", paddingLeft: "5px" }}
                    type='text'
                    name='ten_me'
                    placeholder={ten_me}
                    onChange={this.onChangeme}
                  />
                </Left_div>
                <Right_div>
                  <p>Lớp: </p>
                  <label> {ten_lop} </label>
                  <p style={{ marginTop: "10px" }}>Địa chỉ: </p>
                  <textarea
                    style={{
                      width: "100%",
                      resize: "none",
                      minHeight: "15rem",
                      paddingLeft: "5px"
                    }}
                    name='address'
                    placeholder={address}
                    onChange={this.onChangedc}
                  />
                  <p style={{ marginTop: "10px"}}>SĐT cha: </p>
                  <input
                    style={{ width: "100%", paddingLeft: "5px" }}
                    type='text'
                    name='phone_cha'
                    placeholder={phone_cha}
                    onChange={this.onChangesdtcha}
                  />
                  <p style={{ marginTop: "10px"}}>SĐT mẹ: </p>
                  <input
                    style={{ width: "100%", paddingLeft: "5px" }}
                    type='text'
                    name='phone_me'
                    placeholder={phone_me}
                    onChange={this.onChangesdtme}
                  />
                </Right_div>
              </Infor>
            </Infor_site>
          </Site>
          <Btn_site>
            <button
              type='submit'
              className='btn btn-primary'
              // style={{ marginRight: "20px" }}
              onClick={this.onSubmit}>
              <span className='fa fa-save'></span> &nbsp; Ghi nhận
            </button>
            {/* <Link
              to='/home/change-password'
              className='btn btn-primary'
              style={{ marginRight: "20px" }}>
              <span className='fa fa-key'></span> &nbsp; Đổi mật khẩu
            </Link> */}
          </Btn_site>
        </Body>
      </div>
    );
  }
}
export default InfoStudent;
