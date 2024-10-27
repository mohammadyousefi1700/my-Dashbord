import React, { ReactNode, useMemo } from "react";
import { useQuery, UseQueryResult } from "react-query";

type StateType<T> = {
  data?: T;
  error?: unknown;
  loading: boolean;
  refetch: () => void;
};

type Props<T> = {
  queryKey: string | any[];
  queryFn: () => Promise<T>;
  children: (data: T | undefined, state: StateType<T>) => ReactNode;
  enabled?: boolean;
  staleTime?: number;
  cacheTime?: number;
  handleError?: boolean;
  handleLoading?: boolean;
  handleEmptyData?: boolean;
  loadingClassName?: string;
};

function FetchData<T>({
  queryKey,
  queryFn,
  children,
  enabled = true,
  staleTime = 0,
  cacheTime = 5 * 60 * 1000,
  handleError = true,
  handleLoading = true,
  handleEmptyData = true,
  loadingClassName,
}: Props<T>) {
  const { data, error, isLoading, refetch }: UseQueryResult<T, unknown> =
    useQuery(queryKey, queryFn, {
      enabled,
      staleTime,
      cacheTime,
    });

  const states: StateType<T> = {
    data,
    error,
    loading: isLoading,
    refetch,
  };

  if (error && handleError) return <div>Error: {error.toString()}</div>;
  if (isLoading && handleLoading)
    return <div className={loadingClassName}>Loading...</div>;
  if (
    handleEmptyData &&
    !isLoading &&
    (!data || (Array.isArray(data) && data.length === 0))
  )
    return <div>موردی یافت نشد</div>;

  return <>{children(data, states)}</>;
}

export default FetchData;
