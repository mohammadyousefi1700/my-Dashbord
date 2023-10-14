import { Helmet } from "react-helmet";
import { RouteType } from "./type";
import { lazy, useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";

const Dashboard = lazy(() => import("../dashbord/index"));

const handleTitle = (children: string) => {
  return (document.title = children);
};

export const Root: RouteType[] = [
  {
    path: "/",
    element: (
      <>
        {handleTitle("داشبورد")}
        <Dashboard />
      </>
    ),
  },
];
