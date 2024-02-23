import React, { cloneElement, FC } from "react";

type PropType = {
  icon?: FC;
};

const BaseInputLeadingIcon = (props: PropType) => {
  const getLeadingIconElement = () => {
    if (props.icon) {
      const icon = <props.icon />;
      return cloneElement(icon, {
        className: "h-4 w-4 text-[#939597]",
        "aria-hidden": "true",
      });
    }

    return null;
  };

  return (
    <>
      {props.icon && (
        <div className="absolute inset-y-0 left-0 flex items-center p-2 pointer-events-none">
          {getLeadingIconElement()}
        </div>
      )}
    </>
  );
};

export default BaseInputLeadingIcon;
