import React from "react";
import Home from "./HomePage/Component/Home";
import Permission from "./Admin/Permission/Permission";
import ListStudent from "./Teacher/ListStudent/ListStudent";
import PointStudent from "./Teacher/PointStudent/PointStudent"
import ViewPoint from "./Student/ViewPoint/ViewPoint"
import Notification from "./HomePage/Component/Notification";
import { Chat } from "./Chat/Chat";
import Chart from "./Chart/Chart";
import AddTeacher from "./Admin/Permission/Components/AddTeacher";
import AddStudent from "./Teacher/ListStudent/Components/AddStudent";
import InfoStudent from "./Student/Profile/Profile";
import ImportData from "./Teacher/ListStudent/Components/ImportData";
import ImportPoint from "./Teacher/PointStudent/Components/ImportPoint";
import Profile from "./Student/Profile/Profile";
import ChangePassword from "./Student/Profile/ChangePassword";

const routes = [
  {
    path: "/home/permission",
    exact: true,
    main: () => <Permission />,
  },
  {
    path: "/home/list-students",
    exact: true,
    main: () => <ListStudent />,
  },
  {
    path: "/home/point-students",
    exact: true,
    main: () => <PointStudent />,
  },
  {
    path: "/home/viewpoint",
    exact: true,
    main: () => <ViewPoint />,
  },
  {
    path: "/home/notification",
    exact: true,
    main: () => <Notification />,
  },

  {
    path: "/home/chat",
    exact: true,
    main: () => <Chat />,
  },
  {
    path: "/home/chart",
    exact: true,
    main: () => <Chart />,
  },
  {
    path: "/home/permission/add_teacher",
    exact: true,
    main: () => <AddTeacher />,
  },
  {
    path: "/home/list-students/add_student",
    exact: true,
    main: () => <AddStudent />,
  },
  {
    path: "/home/list-students/update/:id",
    exact: true,
    main: ({ match }) => <InfoStudent match={match} />,
  },
  {
    path: "/home/list-students/import-data",
    exact: true,
    main: () => <ImportData />,
  },
  {
    path: "/home/point-students/import-point",
    exact: true,
    main: () => <ImportPoint />,
  }, 
  {
    path: "/home/profile",
    exact: true,
    main: ({ match }) => <Profile match={match} />,
  },
  {
    path: "/home",
    exact: true,
    main: () => <Home />,
  },
  {
    path: "/home/change-password",
    exact: true,
    main: () => <ChangePassword />,
  },
];

export default routes;
