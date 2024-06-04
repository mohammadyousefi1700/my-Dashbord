import Layout from "components/layout";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { RootDashboard } from "root";

function Dashboard() {
  return (
    <Layout>
      <React.Suspense>
        <Routes>
          {RootDashboard.map((item) => (
            <Route key={item.path} {...item} />
          ))}
        </Routes>
      </React.Suspense>
    </Layout>
  );
}

export default Dashboard;
