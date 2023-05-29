/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";

class Sort extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortby: "mhs",
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
        <tr className="table">
          {/* STT */}
          <th className="text_center" width="70px">
            <button className="btn text_center">
              STT
            </button>
          </th>
          {/* Mã học sinh */}
          <th className="text_center" width="180px">
            <div className="dropdown">
              <button
                type="button"
                className="btn dropdown-toggle"
                id="dropdownMhs"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="true"
              >
                Mã HS &nbsp; <span className="fa fa-caret-square-o-down"></span>
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                <li onClick={() => this.onSort("mhs", -1)}>
                  <a
                    role="button"
                    className={
                      this.state.sortby === "mhs" && this.state.sortvalue === -1
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
                <li onClick={() => this.onSort("mhs", 1)}>
                  <a
                    role="button"
                    className={
                      this.state.sortby === "mhs" && this.state.sortvalue === 1
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
          <th className="text_center" width="280px">
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
                <li onClick={() => this.onSort("name", -1)}>
                  <a
                    role="button"
                    className={
                      this.state.sortby === "name" &&
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
                <li onClick={() => this.onSort("name", 1)}>
                  <a
                    role="button"
                    className={
                      this.state.sortby === "name" && this.state.sortvalue === 1
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
          {/* Toán */}
          <th className="text_center" width="70px">
            Toán
          </th>
          {/* Tiếng Việt */}
          <th className="text_center" width="70px">
            Tiếng Việt
          </th>
          {/* Khoa Học */}
          <th className="text_center" width="70px">
            Khoa Học
          </th>
          {/* Địa Lý và Lịch Sử */}
          <th className="text_center" width="70px">
            ĐL - LS 
          </th>
          {/* Đạo Đức */}
          <th className="text_center" width="70px">
              Đạo Đức
          </th>
          {/* Anh Văn */}
          <th className="text_center" width="70px">
              Anh Văn
          </th>
          {/* Điểm Trung Bình */}
          <th className="text_center" width="100px">
            <div className="dropdown">
              <button
                type="button"
                className="btn dropdown-toggle"
                id="dropdownMark"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="true"
              >
                ĐTB &nbsp; <span className="fa fa-caret-square-o-down"></span>
              </button>
              {/* Lọc theo Lớn Bé */}
              <ul className="dropdown-menu" aria-labelledby="dropdownMark">
                <li onClick={() => this.onSort("mark", -1)}>
                  <a
                    role="button"
                    className={
                      this.state.sortby === "mark" &&
                      this.state.sortvalue === -1
                        ? "sort_selected"
                        : ""
                    }
                  >
                    <span className="fa fa-sort-numeric-down-alt">
                      {" "}
                      &nbsp; Cao -&gt; Thấp
                    </span>
                  </a>
                </li>
                <li onClick={() => this.onSort("mark", 1)}>
                  <a
                    role="button"
                    className={
                      this.state.sortby === "mark" && this.state.sortvalue === 1
                        ? "sort_selected"
                        : ""
                    }
                  >
                    <span className="fa fa-sort-numeric-up-alt">
                      {" "}
                      &nbsp; Thấp -&gt; Cao
                    </span>
                  </a>
                </li>
              </ul>
              {/* Lọc theo điểm cố định */}
            </div>
          </th>
          {/* Thao Tác */}
          <th className="text_center" width="130px">
            <button className="btn dropdown-toggle" >Thao Tác</button>
          </th>
        </tr>
      </thead>
    );
  }
}

export default Sort;
