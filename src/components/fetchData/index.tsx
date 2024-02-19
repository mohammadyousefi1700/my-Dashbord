import classNames from "classnames";
import HandleLoading from "components/Loading";
import React, { ReactNode, useEffect, useMemo, useState } from "react";

type StateType = {
  data?: any;
  setData: (payload?: any) => void;
  error?: any;
  setError?: () => void;
  loading?: any;
  setLoading?: () => void;
  fetchData?: () => void;
  abortController: AbortController;
};

type Props<T> = {
  request?: (abortSignal?: AbortSignal) => Promise<T>;
  children: (data: T | null, state: StateType) => ReactNode;
  defaultValue?: T;
  handleError?: boolean;
  handleLoading?: boolean;
  handleEmptyData?: boolean;
  deps?: any[];
  loadingClassName?: string;
  resetDataBeforeFetch?: boolean;
  name?: string;
};

function FetchData<T = any>(props: Props<T>) {
  const {
    deps = [],
    request,
    defaultValue,
    children,
    handleError = true,
    handleLoading = true,
    handleEmptyData = true,
    loadingClassName,
    resetDataBeforeFetch,
  } = props;
  const [data, setData] = useState(defaultValue);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const abortController = useMemo(() => new AbortController(), [deps]);

  const fetchData = () => {
    setLoading(true);
    setError(null);

    if (typeof request === "function") {
      if (resetDataBeforeFetch) {
        setData(defaultValue);
      }
      return request(abortController.signal)
        .then((data) => {
          setLoading(false);
          setData(data);
          return data;
        })
        .catch((er: any) => {
          if (er) setLoading(false);
          setError(er.toString());
        });
    }
  };

  const states = {
    data,
    setData,
    error,
    setError,
    loading,
    setLoading,
    fetchData,
    abortController: abortController,
  };

  useEffect(() => {
    if (deps) {
      fetchData();
      return () => {
        if (typeof abortController.abort === "function")
          abortController.abort();
      };
    }
  }, deps);

  // handle error
  if (error && handleError) return <div>Error</div>;

  if (handleLoading && loading)
    // handle loading
    return (
      <div
        className={classNames(
          "w-[100%]  flex justify-center items-center ",
          loadingClassName
        )}
      >
        <HandleLoading />
      </div>
    );

  if (
    handleEmptyData &&
    !loading &&
    //@ts-ignore
    (data?.items ? data.items.length === 0 : data?.length === 0)
  )
    return (
      <div
        className={classNames(
          "font-semibold w-full h-full items-center flex justify-center text-xl text-[#858C94]",
          loadingClassName
        )}
      >
        موردی یافت نشد
      </div>
    );

  // default return
  return (
    <>
      {typeof children === "function"
        ? children(data || null, states as any)
        : null}
    </>
  );
}

export default FetchData;

// // type PropsState<T>={
// //     data:T
// // }
// type PropState<T> = {
//   data: T;
//   setData: (payload?: any) => void;
// };
// const FetchData = () => {};
