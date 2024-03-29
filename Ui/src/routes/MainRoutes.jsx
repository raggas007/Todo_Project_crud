import React from "react";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import EditTodo from "../pages/EditTodo";

const MainRoutes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "/edit/todo/:id",
        element: <EditTodo />,
      },
    ],
  },
];

export default MainRoutes;
