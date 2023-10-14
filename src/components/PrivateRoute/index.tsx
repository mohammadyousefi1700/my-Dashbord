import { Navigate, Outlet, redirect } from "react-router-dom";
import { useLoggedInUser } from "../../utils/AutContext";

function PrivateRoute() {
  const { user } = useLoggedInUser();
  return (
    <>{user?.email === undefined ? <Navigate to={"/login"} /> : <Outlet />}</>
  );
}

export default PrivateRoute;
