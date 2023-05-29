import React from "react";
import "../NavBar.css";
import NotiList from "./Noti/NotiList";

class Notification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      role: "",
      ten_lop: [],
    };
  }

  componentDidMount() {
    this.setState({
      role: sessionStorage.getItem("role"),
    });
  }
  ChooseClass = (item) => {
    sessionStorage.setItem("item", item);
  };

  render() {
    var { role, ten_lop } = this.state;
    console.log(ten_lop);
    if (role !== "student") {
      return (
        <div className="todo-app">
          <NotiList role={role} />
        </div>
      );
    } else {
      return (
        <div className="todo-app">
          <NotiList role={role} />
        </div>
      );
    }
  }
}

export default Notification;
