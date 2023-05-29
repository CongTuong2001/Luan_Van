import classNames from "classnames/bind";
import styles from "./ManageUser.module.scss";
import Sidebar from "~/component/Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  deleteUserRoute,
  getAllUserRoute,
  updateUserRoute,
} from "~/utils/APIRoutes";
import { ToastContainer, toast } from "react-toastify";
const cx = classNames.bind(styles);

const toastOptions = {
  toastId: "my_toast",
  position: "top-right",
  autoClose: 5000,
  closeOnClick: false,
  pauseOnHover: true,
  draggable: true,
  autoClose: true,
  progress: 0,
  progressStyle: { background: "#cececec9" },
  theme: "colored",
  style: { background: "#313131ed" },
};
function ManageUser({ handleLoading }) {
  const [listUser, setListUser] = useState([]);
  useEffect(() => {
    async function FetchData() {
      handleLoading(true);
      const { data } = await axios.get(getAllUserRoute);
      console.log(data);
      if (data.status == true) {
        handleLoading(false);
        setListUser(data.allUser);
      }
      if (data.status == false) {
        handleLoading(false);
        setListUser(data.allUser);
        toast.error(data.msg, toastOptions);
      }
    }
    FetchData();
  }, []);
  const handleDelete = async (_id) => {
    handleLoading(true);
    const { data } = await axios.delete(deleteUserRoute + "/" + _id);
    console.log(data);
    if (data.status === true) {
      const data1 = await axios.get(getAllUserRoute);
      setListUser(data1.data.allUser);
      handleLoading(false);
      toast.error(data.msg, toastOptions);
    }
    if (data.status === false) {
      handleLoading(false);
      toast.error(data.msg, toastOptions);
    }
  };

  const [userData, setData] = useState({
    mgv: "",
    username: "",
    ten_lop: null,
  });
  const [dataOld, setDataOld] = useState({
    mgv: "",
    username: "",
    ten_lop: null,
  });
  console.log(userData);

  const [key, setKey] = useState("");
  const [changeButton, setChangeButton] = useState(false);

  const handleBack = () => {
    setChangeButton(false);
  };

  const handleUpdate = (_id, index, username, mgv, ten_lop) => {
    setKey(index);
    setChangeButton(!changeButton);
    setData({
      username: username,
      mgv: mgv,
      ten_lop: Number(ten_lop),
    });
    setDataOld({
      username: username,
      mgv: mgv,
      ten_lop: Number(ten_lop),
    });
  };

  const handleSave = async (_id) => {
    handleLoading(true);
    if (
      dataOld.username === userData.username &&
      dataOld.mgv === userData.mgv &&
      dataOld.ten_lop === userData.ten_lop
    ) {
      handleLoading(false);
      toast.error("Việc chỉnh sửa chưa thay đổi", toastOptions);
    } else {
      const { data } = await axios.put(updateUserRoute + "/" + _id, {
        ...userData,
      });
      if (data.status == true) {
        const data1 = await axios.get(getAllUserRoute);
        setListUser(data1.data.allUser);
        handleLoading(false);
        setChangeButton(false);
        toast.error(data.msg, toastOptions);
      } else {
        handleLoading(false);
        toast.error(data.msg, toastOptions);
      }
    }};

  return (
    <div className={cx("wrapper")}>
      {/* <Sidebar /> */}
      <div className={cx("content")}>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">STT</th>
              <th scope="col">Mã Giáo Viên</th>
              <th scope="col">Tên Giáo Viên</th>
              <th scope="col">Giới Tính</th>
              <th scope="col">SĐT</th>
              <th scope="col">Lớp</th>
              <th scope="col">Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {listUser.map((user, index) => {
            return (
              <tr key={index}>

                <th scope="row">{index + 1}</th>

                {changeButton && key === index ? (
                  <td>
                  <input
                    className="form-control"
                    value={userData.mgv}
                    onChange={(e) =>
                    setData({ ...userData, mgv: e.target.value })
                    }
                  />
                  </td>
                ) : (
                  <td>{user.mgv}</td>
                )}
                  <td>

                {changeButton && key === index ? (
                    <td>
                    <input
                        className="form-control"
                        value={userData.username}
                        onChange={(e) =>
                        setData({ ...userData, username: e.target.value })
                        }
                    />
                    </td>
                ) : (
                    <td>{user.username}</td>
                )}

               
                  
                  {changeButton && key === index ? (
                  <select
                      className="form-control"
                      value={userData.ten_lop}
                      onChange={(e) => {
                      setData({
                          ...userData,
                          ten_lop: Number(e.target.value),
                      });
                      }}
                  >
                      <option value="1">Người dùng</option>
                      <option value="2">Quản trị viên</option>
                  </select>
                  ) : (
                  <>
                      {user.ten_lop == 1 ? "Người dùng" : "Quản trị viên"}
                  </>
                  )}
                </td>
                <td>
                    {changeButton && key === index ? (
                    <button
                        className={cx("btn btn-warning ")}
                        onClick={() => handleSave(user._id)}
                    >
                    Lưu
                    </button>
                    ) : (
                    <button
                        className={cx("btn btn-warning ")}
                        onClick={() =>
                        handleUpdate(
                            user.id,
                            index,
                            user.mgv,
                            user.username,
                            user.ten_lop
                        )
                        }
                    >
                        Chỉnh sửa
                    </button>
                    )}

                    {changeButton && key === index ? (
                    <button
                        className={cx("btn btn-danger")}
                        style={{ marginLeft: "15px" }}
                        onClick={() => handleBack()}
                    >
                        Trở lại
                    </button>
                    ) : (
                    <button
                        className={cx("btn btn-danger")}
                        style={{ marginLeft: "15px" }}
                        onClick={() => handleDelete(user._id)}
                    >
                        Xóa
                    </button>
                    )}
                </td>
              </tr>
            );
            })}
          </tbody>
        </table>
      </div>
      {/* <ToastContainer /> */}
    </div>
  );
};

export default ManageUser;


// /* eslint-disable react/style-prop-object */
// /* eslint-disable jsx-a11y/anchor-is-valid */
// import React, { Component } from "react";
// // import ListSV from "./Components/ListSV";
// import { Link } from "react-router-dom";
// import CallApi from "../API/CallApi";
// // import ExportToExcel from "./Components/ExportData";
// class Permission extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       teacher: [],
//       item: sessionStorage.getItem("item"),
//     };
//   }

//   componentDidMount() {
//     // this.setState({
//     //   lop: sessionStorage.getItem("lop").split(", "),
//     // });
//     var item = sessionStorage.getItem("item");
//     CallApi(`student/all/${item}`, "GET", null).then((res) => {
//       if (res.data.ListTeacher != null) {
//         this.setState({
//           teacher: res.data.ListTeacher,
//         });
//       } else {
//         this.setState({
//           teacher: [],
//         });
//       }
//       console.log(this.state.teacher);
//     });
//   }

//   ChooseClass = (item) => {
//     sessionStorage.setItem("item", item);
//     CallApi(`student/all/${item}`, "GET", null).then((res) => {
//       if (res.data.ListTeacher != null) {
//         this.setState({
//           teacher: res.data.ListTeacher,
//         });
//       } else {
//         this.setState({
//           teacher: [],
//         });
//       }
//     });
//   };

//   onDelete = (_id, mgv) => {
//     var { teacher } = this.state;
//     CallApi(`student/delete/${_id}`, "DELETE", null).then((res) => {
//       if (res.status === 200) {
//         var index = this.findIndex(_id);
//         if (index !== -1) {
//           teacher.splice(index, 1);
//           this.setState({
//             teacher: teacher,
//           });
//         }
//       }
//     });
//     CallApi(`delete-student-account/${mgv}`, "DELETE", null);
//   };

//   render() {
//     // var { admin } = this.state;
//     return (
//       <div className='Container'>
//         <div className='text_center'>
//           <h1 id='title'>Cấp Quyền</h1>
//         </div>
//         <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
//           <label
//             style={{
//               paddingTop: "8px",
//               paddingBottom: "2px",
//               marginRight: "10px",
//             }}>
//             {sessionStorage.getItem("item")}
//           </label>
//           <Link to='/home/permission/add' className='btn btn-primary'>
//             <span className='fa fa-plus'></span> &nbsp; Thêm giáo viên
//           </Link>{" "}
//           &nbsp;
//           <div className='row'>
//             <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
//               {/* <ListSV teacher={teacher} onDelete={this.onDelete} /> */}
//             </div>
//           </div>
//         </div>
//         <table className='table table-bordered table-hover'>
//           <thead>
//             <tr className="table">
//               <th style={{ width: "70px"}}>STT</th>
//               <th style={{ width: "200px"}}>Mã Giáo Viên</th>
//               <th>Tên Giáo Viên</th>
//               <th style={{ width: "100px"}}>Giới tính</th>
//               <th style={{ width: "180px"}}>SĐT</th>
//               <th>Lớp</th>
//               <th style={{ width: "200px"}}>Thao Tác</th>
//             </tr>
//           </thead>
//           <tbody>
//             {/* {listTeacher.map((mgv, index) => {
//               return (
//                   <tr key={index}>
//                   <th scope="row">{index + 1}</th>
//                   {changeButton && key === index ? (
//                       <td>
//                       <input
//                           className="form-control"
//                           value={mgvData.username}
//                           onChange={(e) =>
//                           setData({ ...mgvData, username: e.target.value })
//                           }
//                       />
//                       </td>
//                   ) : (
//                       <td>{mgv.username}</td>
//                   )}
//                   {changeButton && key === index ? (
//                       <td>
//                       <input
//                           className="form-control"
//                           value={mgvData.email}
//                           onChange={(e) =>
//                           setData({ ...mgvData, email: e.target.value })
//                           }
//                       />
//                       </td>
//                   ) : (
//                       <td>{mgv.email}</td>
//                   )}
//                   <td>
//                       {changeButton && key === index ? (
//                       <select
//                           className="form-control"
//                           value={mgvData.ten_lop}
//                           onChange={(e) => {
//                           setData({
//                               ...mgvData,
//                               ten_lop: Number(e.target.value),
//                           });
//                           }}
//                       >
//                           <option value="1">Người dùng</option>
//                           <option value="2">Quản trị viên</option>
//                       </select>
//                       ) : (
//                       <>
//                           {mgv.ten_lop == 1 ? "Người dùng" : "Quản trị viên"}
//                       </>
//                       )}
//                   </td>
//                   <td>
//                       {changeButton && key === index ? (
//                       <button
//                           className={cx("btn btn-warning ")}
//                           onClick={() => handleSave(mgv._id)}
//                       >
//                       Lưu
//                       </button>
//                       ) : (
//                       <button
//                           className={cx("btn btn-warning ")}
//                           onClick={() =>
//                           handleUpdate(
//                               mgv.id,
//                               index,
//                               mgv.username,
//                               mgv.email,
//                               mgv.ten_lop
//                           )
//                           }
//                       >
//                           chinh sua
//                       </button>
//                       )}

//                       {changeButton && key === index ? (
//                       <button
//                           className={cx("btn btn-danger")}
//                           style={{ marginLeft: "15px" }}
//                           onClick={() => handleBack()}
//                       >
//                           tro lai
//                       </button>
//                       ) : (
//                       <button
//                           className={cx("btn btn-danger")}
//                           style={{ marginLeft: "15px" }}
//                           onClick={() => handleDelete(mgv._id)}
//                       >
//                           Xóa
//                       </button>
//                       )}
//                   </td>
//                   </tr>
//               );
//               })} */}
//             <tr>
//               <td>1</td>
//               <td>GV001</td>
//               <td>Nguyễn Văn A</td>
//               <td>Nam</td>
//               <td>012341234</td>
//               <td>4a1</td>
//               <td>
//                 <button type='button' className='btn btn-warning'>
//                   <span className='fa fa-pencil'></span> Sửa
//                 </button>
//                 &nbsp;
//                 <button type='button' className='btn btn-danger'>
//                   <span className='fa fa-trash'></span> Xóa
//                 </button>
//               </td>
//             </tr>
//             <tr>
//               <td>2</td>
//               <td>GV002</td>
//               <td>Nguyễn Thị B</td>
//               <td>Nữ</td>
//               <td>012341234</td>
//               <td>4a2</td>
//               <td>
//                 <button type='button' className='btn btn-warning'>
//                   <span className='fa fa-pencil'></span> Sửa
//                 </button>
//                 &nbsp;
//                 <button type='button' className='btn btn-danger'>
//                   <span className='fa fa-trash'></span> Xóa
//                 </button>
//               </td>
//               <td>
//                 {changeButton && key === index ? (
//                 <button
//                   type='button'
//                   className='btn btn-warning'
//                   onClick={() => handleSave(user._id)}
//                 >
//                   <span className='fa '></span> Lưu
//                 Lưu
//                 </button>
//                 ) : (
//                 <button
//                   type='button'
//                   className='btn btn-warning'
//                   onClick={() =>
//                   handleUpdate(
//                       user.id,
//                       index,
//                       user.mgv,
//                       user.username,
//                       user.ten_lop
//                   )
//                   }
//                 >
//                     Chỉnh sửa
//                 </button>
//                 )}

//                 {changeButton && key === index ? (
//                 <button
//                   type='button'
//                   className='btn btn-danger'
//                   style={{ marginLeft: "15px" }}
//                   onClick={() => handleBack()}
//                 >
//                     Trở lại
//                 </button>
//                 ) : (
//                 <button
//                   type='button'
//                   className='btn btn-danger'
//                   style={{ marginLeft: "15px" }}
//                   onClick={() => handleDelete(user._id)}
//                 >
//                     Xóa
//                 </button>
//                 )}
//                 </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     );
//   }
// }

// export default Permission;
