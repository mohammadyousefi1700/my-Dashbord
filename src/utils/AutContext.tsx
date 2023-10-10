import { ID } from "appwrite";
import { account } from "appwrite.config";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Login {
  name?: string | null;
  email: string | null;
  password: string | null;
  phone?: string | null;
}

interface Authentication {
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
export const GetAccount = account.get();

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<Login | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    GetAccount.then((res) => {
      setUser({
        email: res.email as string,
        password: res.password as string,
      });
      navigate("/");
    }).catch((err) => {
      console.log(err);
    });
  }, []);

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

  return (
    <AuthContext.Provider value={{ user, setUser, handleSubmit }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useLoggedInUser = () => useContext(AuthContext);
