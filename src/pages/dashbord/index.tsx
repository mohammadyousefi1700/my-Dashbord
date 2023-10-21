import Layout from "components/layout";
import { Root, RootDashboard } from "pages/root";
import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import TrelloPage from "./Trello";
import { Helmet } from "react-helmet";
import NotFoundPage from "pages/NotFoundPage";

function Dashboard() {
  // const location = useLocation();
  // console.log(location);

  // useEffect(() => {
  //   let title = "";
  //   console.log("title", title);
  //   console.log(location.pathname);

  //   switch (location.pathname) {
  //     case "/":
  //       title = "داشبورد";
  //       break;
  //     case "/Quotes":
  //       title = "پیش فاکتور";
  //       console.log(title);

  //       break;
  //     case "/telegram":
  //       title = "telegram";
  //       break;
  //     default:
  //       title = "داشبورد";
  //       console.log("title", title);

  //       document.title = title;
  //   }
  // }, [location]);

  return (
    <Layout>
      <React.Suspense>
        <Routes>
          {RootDashboard.map((item) => (
            <Route key={item.path} path={item.path} element={item.element} />
          ))}
        </Routes>
      </React.Suspense>
    </Layout>

    // <Layout>
    //   {/* {RootDashboard.map((items) => (
    //     <Routes key={items.path}>
    //       <Route {...items} />
    //     </Routes>
    //   ))} */}
    //   <Routes>
    //     <Route path="/" element={<TrelloPage />} />
    //   </Routes>
    //   {/* {
    //     <React.Suspense fallback={"loading..."}>
    //       <Routes>
    //         Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
    //         adipisci laudantium rerum dicta autem quibusdam maiores corporis.
    //         Perferendis, doloribus temporibus accusantium officia doloremque ex
    //         nemo pariatur fugit sequi, natus magnam!
    //       </Routes>
    //     </React.Suspense>
    //   } */}
    // </Layout>
  );
}

export default Dashboard;
