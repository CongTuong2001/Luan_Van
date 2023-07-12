import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CallApi from "../../API/CallApi";
import ListGV from "./Components/ListGV";

function Permission() {
  const [teachers, setTeachers] = useState([]);
  // const [item, setItem] = useState(sessionStorage.getItem("item"));

  useEffect(() => {
    // var item = sessionStorage.getItem("item");
    CallApi(`teacher/all/`, "GET", null).then((res) => {
      console.log("res", res);
      if (res.data.ListTeachers != null) {
        setTeachers(res.data.ListTeachers);
      } else {
        setTeachers([]);
      }
      console.log(teachers);
    });
  }, []);

  const findIndex = (_id) => {
    var result = -1;
    teachers.forEach((student, index) => {
      if (student._id === _id) result = index;
    });
    return result;
  };

  const onDelete = (_id, mgv) => {
    CallApi(`teacher/delete/${_id}`, "DELETE", null).then((res) => {
      if (res.status === 200) {
        var index = findIndex(_id);
        if (index !== -1) {
          teachers.splice(index, 1);
          setTeachers(teachers);
        }
      }
    });
    CallApi(`delete-teacher-account/${mgv}`, "DELETE", null);
    console.log("delete", mgv);
  };

  return (
    <div className="Container">
      <div className="text_center">
        <h1 id="title">Cấp Quyền</h1>
      </div>
      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <label
          style={{
            paddingTop: "8px",
            paddingBottom: "2px",
            marginRight: "10px",
          }}
        >
          {sessionStorage.getItem("item")}
        </label>
        <Link to="/home/permission/add_teacher" className="btn btn-primary">
          <span className="fa fa-plus"></span> &nbsp; Thêm giáo viên
        </Link>{" "}
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            {teachers && <ListGV teachers={teachers} onDelete={onDelete} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Permission;
