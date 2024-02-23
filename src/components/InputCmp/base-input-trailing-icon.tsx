import classNames from "classnames";
import React, { cloneElement, FC } from "react";

type PropType = {
  icons?: FC;
  icon?: FC;
  position?: "left" | "right";
};

const BaseInputTrailingIcon = (props: PropType) => {
  const { position = "left" } = props;

  const getTrailingIconElement = () => {
    if (props.icon) {
      const icon = <props.icon />;
      return cloneElement(icon, {
        className: "h-4 w-4 text-[#939597]",
      });
    }

    return null;
  };

  const getTrailingIconElement2 = () => {
    if (props.icons) {
      const icons = <props.icons />;
      return cloneElement(icons, {
        className: "h-4 w-4 text-[#939597]",
      });
    }

    return null;
  };

  return (
    <>
      {props.icon && (
        <div
          className={classNames(
            "absolute inset-y-0 flex items-center p-2 px-4 select-none",
            position === "left" ? "left-0" : "right-0"
          )}
        >
          {getTrailingIconElement()}
        </div>
      )}
      {props.icons && (
        <div
          className={classNames(
            "absolute inset-y-0 flex left-0 items-center p-2 px-4 select-none"
          )}
        >
          {getTrailingIconElement2()}
        </div>
      )}
    </>
  );
};

export default BaseInputTrailingIcon;
