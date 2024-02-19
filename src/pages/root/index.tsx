import { Helmet } from "react-helmet";
import { RouteType } from "./type";
import { lazy, useEffect } from "react";
import { useLocation } from "react-router-dom";
// import { Locations } from "./components/Locations";

const Dashboard = lazy(() => import("../dashbord/index"));
const TrelloPage = lazy(() => import("../dashbord/Trello/index"));
const Quotes = lazy(() => import("../dashbord/Quotes/index"));
const WebTelegram = lazy(() => import("../dashbord/WebTelegram/index"));
const LoginPage = lazy(() => import("../LoginAndSignUp/index"));
const NotFoundPage = lazy(() => import("../NotFoundPage/index"));

export const handleHelmet = (path: string, title: string) => {};

export const Root: RouteType[] = [
  {
    path: "/",
    element: (
      <>
        <Helmet>
          <title>داشبورد</title>
        </Helmet>
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

console.log("window.location.href", window.location.href);

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
        {/* <Helmet> */}
        <title>پیش فاکتور</title>
        {/* </Helmet> */}
        <Quotes />
      </>
    ),
  },
  {
    path: "/telegram",
    element: (
      <>
        {/* <Helmet> */}
        <title>Telegram</title>
        {/* </Helmet> */}
        <WebTelegram />
      </>
    ),
  },
];
