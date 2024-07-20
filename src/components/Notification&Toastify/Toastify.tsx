import React from "react";
import { ToastContainer } from "react-toastify";

function ToastifyContainer() {
  return (
    <div>
      <ToastContainer
        autoClose={2000}
        rtl
        position={"top-right"}
        toastClassName="text-sm "
        className={"!z-[1000001] "}
        toastStyle={{
          fontFamily: "dana, Nova, system-ui, sans-serif",
          boxShadow:
            "rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px",
        }}
      />
    </div>
  );
}

export default ToastifyContainer;
