import { ID } from "appwrite";
import { account } from "appwrite.config";
import HandleLoading from "components/Loading";
import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export type Login = {
  $id?: string;
  name?: string | null;
  email: string | null;
  password: string | null;
  phone?: string | null;
};

interface Authentication {
  Error?: string;
  user: Login | null;
  setUser: React.Dispatch<React.SetStateAction<Login | null>>;
  handleSubmit?: any;
  LogOut?: any;
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

  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchGetAccount = async () => {
      const GetAccount = account.get();

      try {
        setError(true);
        const res = await GetAccount;
        setUser({
          name: res.name,
          email: res.email as string,
          password: res.password as string,
        });

        if (location.pathname === "/login" && res.$id) navigate("/");
        setError(false);
      } catch (err) {
        if (err) setError(false);
      }
    };

    fetchGetAccount();
  }, [location.pathname, navigate]);
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
          console.log(err);
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
          console.log(err);
        });
    }
  };
  const LogOut = async (e: any) => {
    try {
      const res = await account.deleteSession("current");

      if (res) {
        navigate("/login");
      }

      return res;
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  if (Error) {
    return <HandleLoading />;
  } else {
    return (
      <AuthContext.Provider value={{ user, setUser, handleSubmit, LogOut }}>
        {children}
      </AuthContext.Provider>
    );
  }
};

export const useLoggedInUser = () => useContext(AuthContext);
