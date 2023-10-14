// import React, { ReactNode, useEffect } from "react";
// import { GetAccount, useLoggedInUser } from "utils/AutContext";

// type Props = {
//   children: ReactNode;
//   setShowLoading?: boolean;
// };

// function LoadingLogin(props: Props) {
//   const { children, setShowLoading = true } = props;
//   const { user, Error } = useLoggedInUser();
//   console.log(Error);
//   useEffect(() => {
//     GetAccount.then((res) => console.log(res));
//   }, []);
//   }
//   console.log(user);
//   console.log(setShowLoading);

//   return setShowLoading ? (
//     <div className="w-full h-full bg-orange-400">loading...</div>

//     ) : null;
// }

// export default LoadingLogin;
const HandleLoading = () => {
  return <div className="w-full h-full bg-red-500">loading....</div>;
};

export default HandleLoading;
