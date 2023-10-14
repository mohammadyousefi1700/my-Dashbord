import Layout from "components/layout";
import React from "react";

function Dashboard() {
  return (
    <Layout>{<React.Suspense fallback={"loading..."}></React.Suspense>}</Layout>
  );
}

export default Dashboard;
