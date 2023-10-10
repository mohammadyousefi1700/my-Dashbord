import { Helmet } from "react-helmet";
import { RouteType } from "./type";
import Dashboard from "pages/dashbord";

export const Root: RouteType[] = [
  {
    path: "/",
    element: (
      <>
        <Helmet>
          <title>داشبور پروژه</title>
        </Helmet>
        <Dashboard />
      </>
    ),
  },
];
