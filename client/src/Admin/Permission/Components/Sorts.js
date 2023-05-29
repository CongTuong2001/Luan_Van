/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";

class Sort extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortby: "mgv",
      sortvalue: 1,
    };
  }

  onSort = (sortBy, sortValue) => {
    this.setState(
      {
        sortby: sortBy,
        sortvalue: sortValue,
      },
      () => this.props.onSort(this.state.sortby, this.state.sortvalue)
    );
    //this.props.onSort(sortBy, sortValue);
  };

  render() {
    return (
      <thead>
        <tr>
          {/* STT */}
          <th className="text_center" width="70px">
            <button className="btn text_center">STT</button>
          </th>
          {/* Mã GV */}
          <th className="text_center" width="200px">
            <div className="dropdown">
              <button
                type="button"
                className="btn dropdown-toggle"
                id="dropdownMgv"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="true"
              >
                Mã GV &nbsp; <span className="fa fa-caret-square-o-down"></span>
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                <li onClick={() => this.onSort("mgv", -1)}>
                  <a
                    role="button"
                    className={
                      this.state.sortby === "mgv" && this.state.sortvalue === -1
                        ? "sort_selected"
                        : ""
                    }
                  >
                    <span className="fa fa-angle-double-down">
                      {" "}
                      &nbsp; Lớn đến bé
                    </span>
                  </a>
                </li>
                <li onClick={() => this.onSort("mgv", 1)}>
                  <a
                    role="button"
                    className={
                      this.state.sortby === "mgv" && this.state.sortvalue === 1
                        ? "sort_selected"
                        : ""
                    }
                  >
                    <span className="fa fa-angle-double-up">
                      {" "}
                      &nbsp; Bé đến lớn
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </th>
          {/* Họ và tên */}
          <th className="text_center">
            <div className="dropdown">
              <button
                type="button"
                className="btn dropdown-toggle"
                id="dropdownName"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="true"
              >
                Họ và tên &nbsp;{" "}
                <span className="fa fa-caret-square-o-down"></span>
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownName">
                <li onClick={() => this.onSort("ten_hs", -1)}>
                  <a
                    role="button"
                    className={
                      this.state.sortby === "ten_hs" &&
                      this.state.sortvalue === -1
                        ? "sort_selected"
                        : ""
                    }
                  >
                    <span className="fa fa-sort-alpha-down">
                      {" "}
                      &nbsp; A -&gt; Z
                    </span>
                  </a>
                </li>
                <li onClick={() => this.onSort("ten_hs", 1)}>
                  <a
                    role="button"
                    className={
                      this.state.sortby === "ten_hs" && this.state.sortvalue === 1
                        ? "sort_selected"
                        : ""
                    }
                  >
                    <span className="fa fa-sort-alpha-up">
                      {" "}
                      &nbsp; Z -&gt; A
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </th>
          {/* Giới tính */}
          <th className="text_center" width="100px">
            <button className="btn text_center">Giới tính</button>
          </th>
          {/* SĐT */}
          <th className="text_center" width="180px">
            <button className="btn text_center">SĐT</button>
          </th>
          {/* Lớp */}
          <th className="text_center">
            <button className="btn text_center">Lớp</button>
          </th>
          {/* Thao Tác */}
          <th className="text_center" width="200px">
            <button className="btn text_center">Thao Tác</button>
          </th>
        </tr>
      </thead>
    );
  }
}

export default Sort;
