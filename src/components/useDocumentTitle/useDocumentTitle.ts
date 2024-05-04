import { useEffect } from "react";

const useDocumentTitle = (title: string) => {
  useEffect(() => {
    document.title = title;
  }, [title]); // فقط زمانی اجرا می‌شود که مقدار title تغییر کند
};

export default useDocumentTitle;
