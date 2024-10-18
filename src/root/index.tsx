import { RouteType } from "./type";
import { lazy } from "react";

const Dashboard = lazy(() => import("../pages/dashbord/index"));
const TrelloPage = lazy(() => import("../pages/dashbord/Trello/index"));
const Quotes = lazy(() => import("../pages/dashbord/opportunity/index"));
const LoginPage = lazy(() => import("../pages/LoginAndSignUp/index"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage/index"));
const Detail = lazy(() => import("../pages/dashbord/Trello/detail/index"));
const PageSales = lazy(() => import("../pages/dashbord/pageSales"));

export const Root: RouteType[] = [
  {
    path: "/",
    element: (
      <>
        <Dashboard />
      </>
    ),
  },
  {
    path: "/login",
    element: (
      <>
        <LoginPage />
      </>
    ),
  },
];

export const RootDashboard: RouteType[] = [
  {
    path: "*",
    element: (
      <>
        <NotFoundPage />
      </>
    ),
  },
  {
    path: "/",
    element: (
      <>
        <TrelloPage />
      </>
    ),
  },

  {
    path: "/Quotes",
    element: (
      <>
        <Quotes />{" "}
      </>
    ),
  },
  {
    path: "order/detail/:id",
    element: (
      <>
        <Detail />{" "}
      </>
    ),
  },
  {
    path: "order/sales",
    element: (
      <>
        <PageSales />
      </>
    ),
  },
];
