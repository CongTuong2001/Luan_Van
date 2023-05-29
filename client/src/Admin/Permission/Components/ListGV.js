/* eslint-disable react/style-prop-object */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import OneRowData from "./OneRowData";
import Sort from "./Sorts";

class ListGV extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teachers: this.props.teachers,
      filter: {
        mgv: "",
        ten_gv: "",
      },
    };
  }

  componentDidMount() {
    this.setState({
      teachers: this.props.teachers,
    });
  }

  onDelete = (_id, mgv) => {
    this.props.onDelete(_id, mgv);
  };

  render() {
    var teachers = this.props.teachers;
    console.log(teachers);
    
    var teacherList = teachers.map((teacher, index) => {
      return (
        <OneRowData
          key={teacher.id}
          index={index}
          teacher={teacher}
          onDelete={this.onDelete}
        />
      );
    });
    return (
      <div>
        <table className="table table-bordered table-hover">
          <Sort onSort={this.onSort} />
          <tbody>
            {teacherList}

          </tbody>
        </table>
      </div>
    );
  }
}

export default ListGV;
