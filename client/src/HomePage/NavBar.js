import React, { Component } from "react";
import "./NavBar.css";
import "boxicons";
import { AiTwotoneHome } from "react-icons/ai";
import { BsClipboardData } from "react-icons/bs";
import { TbNumbers } from "react-icons/tb";
import { AiFillSchedule } from "react-icons/ai";
import { IoMdNotifications } from "react-icons/io";
import { FaPeopleArrows } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import routes from "../router";
import { Redirect } from "react-router";
class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      role: "",
      openNav: true,
      chooseHome: true,
      choosePermission: false,
      chooseList: false,
      choosePoint: false,
      chooseViewPoint: false,
      chooseNoti: false,
      chooseChat: false,
      chooseChart: false,
      chooseInfoTeacher: false,
      chooseProfile: false,
    };
  }

  componentDidMount() {
    this.setState({
      role: sessionStorage.getItem("role"),
    });
  }

  open = () => {
    this.setState({
      openNav: !this.state.openNav,
    });
  };

  chooseHome = () => {
    this.setState({
      chooseHome: true,
      choosePermission: false,
      chooseList: false,
      choosePoint: false,
      chooseViewPoint: false,
      chooseNoti: false,
      chooseChat: false,
      chooseChart: false,
      chooseProfile: false,
    });
  };

  choosePermission = () => {
    this.setState({
      chooseHome: false,
      choosePermission: true,
    });
  };

  chooseList = () => {
    this.setState({
      chooseHome: false,
      chooseList: true,
      choosePoint: false,
      chooseNoti: false,
    });
  };

  choosePoint = () => {
    this.setState({
      chooseHome: false,
      chooseList: false,
      choosePoint: true,
      chooseNoti: false,
    });
  };

  chooseViewPoint = () => {
    this.setState({
      chooseHome: false,
      chooseViewPoint: true,
      chooseNoti: false,
      chooseProfile: false,
    });
  };
  
  chooseNoti = () => {
    this.setState({
      chooseHome: false,
      chooseList: false,
      choosePoint: false,
      chooseViewPoint: false,
      chooseNoti: true,
      chooseProfile: false,
    });
  };

  chooseProfile = () => {
    this.setState({
      chooseHome: false,
      chooseViewPoint: false,
      chooseNoti: false,
      chooseProfile: true,
    });
  };

  chooseLogout = () => {
    localStorage.removeItem("accessToken");
    sessionStorage.removeItem("mhs");
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("ten_lop");
    sessionStorage.removeItem("item");
  };

  render() {
    if (localStorage.getItem("accessToken") == null) {
      return <Redirect to='/login' />;
    }
    var {
      openNav,
      chooseHome,
      choosePermission,
      chooseList,
      choosePoint,
      chooseViewPoint,
      chooseNoti,
      chooseProfile,
    } = this.state;
    return (
      <Router>
        <section className='body'>
          <div className={openNav ? "sidebar open" : "sidebar"}>
            <div className='logo-details'>
              {/* cai 3 gach */}
              <div className='logo_name'>MENU</div>
              <div id='btn' onClick={this.open}>
                <box-icon name='menu' color='#ffffff'></box-icon>
              </div>
            </div>
            <ul className='nav-list'>

              {/* Hiện tài khoản đang đăng nhập là */}
              <li>
                <div className='profile-details'>
                  <p>
                    {sessionStorage.getItem("mhs" || "mgv")}
                  </p>
                </div>
              </li>

              <li
                className={chooseHome ? "home" : ""}
                onClick={this.chooseHome}>
                <Link to='/home'>
                  <div className='icon'>
                    <AiTwotoneHome />
                  </div>
                  <span className='links_name'>Trang chủ</span>
                </Link>
                <span className='tooltip'>Trang chủ</span>
              </li>

              <li
                className={
                  (choosePermission ? "home" : "") +
                  (sessionStorage.getItem("role") === "admin" ? "" : "hidden")
                }
                onClick={this.choosePermission}>
                <Link to='/home/permission'>
                  <div className='icon'>
                    <FaPeopleArrows/>
                  </div>
                  <span className='links_name'>Cấp quyền</span>
                </Link>
                <span className='tooltip'>Cấp quyền</span>
              </li>

              <li
                id='bangdiem'
                className={
                  (chooseList ? "home" : "") +
                  (sessionStorage.getItem("role") === "manager" ? "" : "hidden")
                }
                onClick={this.chooseList}>
                <Link to='/home/list-students'>
                  {/* danh sách học sinh */}
                  <div className='icon'>
                    <BsClipboardData />
                  </div>
                  <span className='links_name'>DS Học Sinh</span>
                </Link>
                <span className='tooltip'>DS Học Sinh</span>
              </li>

              <li
                id='nhapdiem'
                className={
                  (choosePoint ? "home" : "") +
                  ((sessionStorage.getItem("role") === "manager" || sessionStorage.getItem("role") === "teacher") ? "" : "hidden")      
                }
                onClick={this.choosePoint}>
                <Link to='/home/point-students'>
                  {/* nhap diem hoc sinh */}
                  <div className='icon'>
                    <TbNumbers />
                  </div>
                  <span className='links_name'>Nhập điểm</span>
                </Link>
                <span className='tooltip'>Nhập điểmn</span>
              </li>

              <li
                id='viewpoint'
                className={
                  (chooseViewPoint ? "home" : "") +
                  (sessionStorage.getItem("role") === "student" ? "" : "hidden")
                }
                onClick={this.chooseViewPoint}>
                <Link to='/home/viewpoint'>
                  <div className='icon'>
                  <AiFillSchedule />
                  </div>
                  <span className='links_name'>Xem Điểm</span>

                  <span className='tooltip'>Xem Điểm</span>
                </Link>
              </li>

              <li
                className={
                  (chooseNoti ? "home" : "") +
                  ((sessionStorage.getItem("role") === "student" || sessionStorage.getItem("role") === "manager") ? "" : "hidden")      
                }
                onClick={this.chooseNoti}>
                <Link to='/home/notification'>
                  {/* thong bao */}
                  <div className='icon'>
                    <IoMdNotifications />
                  </div>
                  <span className='links_name'>Thông Báo</span>
                </Link>
                <span className='tooltip'>Thông Báo</span>
              </li>
            
              {/* <li
                className={chooseChat ? "home" : ""}
                onClick={this.chooseChat}>
                <Link to='/home/chat'>
                  <div className='icon'>
                    <span className='fa fa-comment-dots'></span>
                  </div>
                  <span className='links_name'>Chat</span>

                  <span className='tooltip'>Chat</span>
                </Link>
              </li> */}

              {/* <li
                id='chart'
                className={
                  (chooseChart ? "home" : "") +
                  (role === "student" ? "student" : "")
                }
                onClick={this.chooseChart}>
                <Link to='/home/chart'>
                  <div className='icon'>
                    <span className='fa fa-chart-bar'></span>
                  </div>
                  <span className='links_name'>Biểu đồ điểm</span>
                </Link>
                <span className='tooltip'>Biểu đồ điểm</span>
              </li> */}
              
              <li
                id='profile'
                className={
                  (chooseProfile ? "home" : "") +
                  (sessionStorage.getItem("role") === "student" ? "" : "hidden")
                }
                onClick={this.chooseProfile}>
                <Link to='/home/profile'>
                  <div className='icon'>
                    <span className='fa fa-id-card'></span>{" "}
                  </div>
                  <span className='links_name'>Hồ sơ</span>

                  <span className='tooltip'>Hồ sơ</span>
                </Link>
              </li>
              <li className='logout' onClick={this.chooseLogout}>
                <a href='/'>
                  {/* Log out */}
                  <div className='icon'>
                    <BiLogOut />
                  </div>
                  <span className='links_name'>Đăng Xuất</span>
                </a>
                <span className='tooltip'>Đăng Xuất</span>
              </li>
            </ul>
          </div>
          <div className={openNav ? "nav_open" : "nav_close"}>
            <div>{this.show(routes)}</div>
          </div>
        </section>
      </Router>
    );
  }

  show = (routes) => {
    var result = null;
    if (routes.length > 0) {
      result = routes.map((route, index) => {
        return (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.main}
          />
        );
      });
    }
    return <Switch>{result}</Switch>;
  };
}

export default NavBar;
