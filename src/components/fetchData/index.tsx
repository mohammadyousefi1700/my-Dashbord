import React, { ReactNode } from "react";
import { useQuery, UseQueryResult } from "react-query";

type StateType<T> = {
  data?: T;

  error?: unknown;
  loading: boolean;
  refetch: () => void;
};

type Props<T> = {
  queryKey: string | any[]; // کلید یا آرایه‌ای از کلید‌ها برای یکتایی کوئری
  queryFn: () => Promise<T>; // تابعی که درخواست داده را مدیریت می‌کند
  children: (data: T | undefined, state: StateType<T>) => ReactNode;
  enabled?: boolean; // برای فعال یا غیر فعال کردن کوئری
  staleTime?: number; // زمان ماندگاری کش
  cacheTime?: number; // زمان ذخیره سازی در کش
  handleError?: boolean; // کنترل نمایش خطا
  handleLoading?: boolean; // کنترل نمایش بارگذاری
  handleEmptyData?: boolean; // کنترل نمایش در صورت خالی بودن داده
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
  // استفاده از useQuery برای مدیریت داده‌ها و وضعیت‌ها
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

  // نمایش خطا در صورت بروز خطا و فعال بودن handleError
  if (error && handleError) return <div>Error: {error.toString()}</div>;

  // نمایش وضعیت بارگذاری در صورت فعال بودن handleLoading
  if (isLoading && handleLoading)
    return (
      <div
        className={`w-full flex justify-center items-center ${loadingClassName}`}
      >
        <span>Loading...</span>
      </div>
    );

  // نمایش پیام خالی بودن داده‌ها در صورت فعال بودن handleEmptyData
  if (
    handleEmptyData &&
    !isLoading &&
    (!data || (Array.isArray(data) && data.length === 0))
  )
    return (
      <div
        className={`font-semibold w-full h-full flex justify-center items-center text-xl text-gray-500 ${loadingClassName}`}
      >
        موردی یافت نشد
      </div>
    );

  // بازگشت خروجی children با داده‌ها و وضعیت‌ها
  return <>{children(data, states)}</>;
}

export default FetchData;
