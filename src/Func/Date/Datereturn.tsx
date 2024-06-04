import React, { useState, useEffect } from "react";
function DateMinute() {
  const [currentTime, setCurrentTime] = useState<any>(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(
        new Intl.DateTimeFormat("fa", {
          hour: "2-digit",
          minute: "2-digit",
        }).format(new Date())
      );
    });

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return <>{String(currentTime)}</>;
  // return <></>;
}

export default DateMinute;
