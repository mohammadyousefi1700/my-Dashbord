import React, { ChangeEvent, useCallback, useState } from "react";
import { useLoggedInUser } from "../../utils/AutContext";
import classNames from "classnames";
import { ValidationEmail } from "./type";
import { debounce } from "lodash";
import _ from "lodash";
// import {debounce} from "lodash"

export interface User {
  name?: string;
  email: string;
  password: string;
}

interface StyleType {
  isOk?: boolean;
  isProblem?: boolean;
}
const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

function LoginPage() {
  const { setUser, handleSubmit } = useLoggedInUser();

  const [credentials, setCredentials] = useState<User>({
    name: "",
    email: "",
    password: "",
  });
  const [isShowSignIn, setIsShowSignIn] = useState<boolean>(false);

  const debouncedHandleInputChange = useCallback(
    _.debounce((nextValue) => {
      console.log("nextValue", nextValue);

      setCredentials((prevValues) => ({ ...prevValues, ...nextValue }));
    }, 1000),
    []
  );

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCredentials((prevValues) => ({ ...prevValues, [name]: value }));
    debouncedHandleInputChange({ [name]: value });
  };
  return (
    <div className="justify-center  flex items-center h-full w-full opacity-[0.90] bg-no-repeat bg-[length:100%_100%]  bg-[url('/public/MilkyWayGalaxy.jpg')]">
      <form
        className="  p-3  bg-inherit w-fit rounded-3xl  backdrop-brightness-0 opacity-80 "
        onSubmit={(e) => {
          e.preventDefault();
          Promise.resolve(setUser(credentials)).then(() => handleSubmit(e));
        }}
      >
        {isShowSignIn && (
          <div className="flex flex-col gap-y-3">
            <label className="text-white font-semibold mr-2 text-xl">
              نام:
            </label>
            <div className="w-[400px] bg-inherit ">
              <input
                className={classNames(
                  "h-12 px-3 text-white rounded-br-lg bg-inherit  outline-none hover:border-b-white hover:border-b-2 hover:border-r-2 align-middle w-96"
                )}
                type="text"
                required
                name="name"
                placeholder=" نام خود را وارد کنید..."
                value={credentials.name}
                onChange={handleInputChange}
              />
            </div>
          </div>
        )}
        <div className="flex flex-col gap-y-3">
          <label className="text-white font-semibold mr-2 text-xl">
            ایمیل:
          </label>
          <div className="w-[400px] bg-inherit ">
            <input
              className={classNames(
                "h-12 px-3 text-white rounded-br-lg bg-inherit  outline-none hover:border-b-white hover:border-b-2 hover:border-r-2 align-middle w-96"
              )}
              type="email"
              required
              name="email"
              placeholder=" ایمیلوتو وارد کن..."
              value={credentials.email}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="flex flex-col gap-y-3">
          <label className="text-white font-semibold mr-2 text-xl">
            رمز عبور:
          </label>
          <input
            className={classNames(
              "h-12 px-3 rounded-br-lg text-white bg-inherit  outline-none hover:border-b-white hover:border-b-2 hover:border-r-2 align-middle w-96"
            )}
            type="password"
            required
            name="password"
            onChange={handleInputChange}
            placeholder="پسورد خود را وارد کنید..."
            value={credentials.password}
          />
        </div>

        <button
          type="submit"
          className="w-36 mt-3 h-12 text-center pb-2 hover:border-violet-800 hover:text-violet-800  border-2  rounded-lg  text-white font-semibold text-lg "
        >
          {isShowSignIn ? "ثبت نام" : "ورود"}
        </button>

        <button
          type="button"
          onClick={() => setIsShowSignIn(!isShowSignIn)}
          className=" hover:text-violet-700 mr-2   my-3 block h-7 underline text-white"
        >
          {isShowSignIn ? "ورود" : "ثبت نام"}
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
