import { RouteType } from "./type";
import { lazy } from "react";
import useDocumentTitle from "components/useDocumentTitle/useDocumentTitle";

const Dashboard = lazy(() => import("../pages/dashbord/index"));
const TrelloPage = lazy(() => import("../pages/dashbord/Trello/index"));
const Quotes = lazy(() => import("../pages/dashbord/opportunity/index"));
const LoginPage = lazy(() => import("../pages/LoginAndSignUp/index"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage/index"));

export const handleHelmet = (path: string, title: string) => {};

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
];