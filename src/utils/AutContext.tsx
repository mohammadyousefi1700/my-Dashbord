import { ID } from "appwrite";
import { account } from "appwrite.config";
import HandleLoading from "components/Loading";
import { set } from "lodash";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Login {
  $id?: string;
  name?: string | null;
  email: string | null;
  password: string | null;
  phone?: string | null;
}

interface Authentication {
  Error?: string;
  user: Login | null;
  setUser: React.Dispatch<React.SetStateAction<Login | null>>;
  handleSubmit?: any;
}
const initialState: Authentication = {
  user: {
    name: null,
    email: null,
    password: null,
    phone: null,
  },
  setUser: () => {},
};
const AuthContext = createContext(initialState);
type Props = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<Login | null>(null);

  const [Error, setError] = useState<boolean>(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchGetAccount = async () => {
      const GetAccount = account.get();
      try {
        setError(true);
        const res = await GetAccount;
        setUser({
          email: res.email as string,
          password: res.password as string,
        });
        setError(false);
      } catch (err) {
        if (err) setError(false);
      }
    };
    fetchGetAccount();
    // GetAccount.then((res) => {
    //   console.log("res", res);

    //   setError(false);
    //   setUser({
    //     email: res.email as string,
    //     password: res.password as string,
    //   });
    //   setError(false);
    //   navigate("/");
    // }).catch((err) => {
    //   // setError(err)  ;
    //   if (err) {
    //     setError(false);
    //   }
    //   console.log("err", err);
    // });
  }, []);
  // console.log("Error", Error);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (user?.name?.length) {
      const signup = account.create(
        ID.unique(),
        user?.email as string,
        user?.password as string,
        user?.name as string
      );
      return signup
        .then((res) => {
          if (res.$id) return navigate("/");
        })
        .catch((err) => {
          console.log(err, "ss");
        });
    } else {
      const login = account.createEmailSession(
        user?.email as string,
        user?.password as string
      );

      login
        .then((res) => {
          if (res.$id) return navigate("/");
        })
        .catch((err) => {
          console.log(err, "ssss");
        });
    }
  };

  if (Error) {
    return <HandleLoading />;
  } else {
    return (
      <AuthContext.Provider value={{ user, setUser, handleSubmit }}>
        {children}
      </AuthContext.Provider>
    );
  }
};

export const useLoggedInUser = () => useContext(AuthContext);
