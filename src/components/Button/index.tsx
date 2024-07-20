import cx from "classnames";
import type { ReactNode } from "react";
import React from "react";

const colorClasses = {
  green:
    "font-semibold text-3.5 bg-submit-green text-white hover:bg-[linear-gradient(rgb(0_0_0/20%)_0_0)]",
  blue: "text-white bg-blue-600 border-0 hover:bg-[linear-gradient(rgb(0_0_0/20%)_0_0)]",
  successBlue:
    "text-white bg-success-blue border-0 hover:bg-[linear-gradient(rgb(0_0_0/20%)_0_0)]",
  error:
    "text-white bg-color-error border-0 hover:bg-[linear-gradient(rgb(0_0_0/20%)_0_0)]",
  red: "text-white bg-red-light border-0 hover:bg-[linear-gradient(rgb(0_0_0/20%)_0_0)]",
  venetianRed: "text-white !bg-venetian-red border-0",
  gray: "text-white bg-gray-extra-light border-0 hover:bg-[linear-gradient(rgb(0_0_0/20%)_0_0)]",
  gray2:
    "text-white !bg-gray-medium border-0 hover:bg-[linear-gradient(rgb(0_0_0/20%)_0_0)]",
  gray3:
    "text-color-body !bg-gray-border border border-gray-extra-light !font-semibold hover:bg-[linear-gradient(rgb(0_0_0/20%)_0_0)]",
  purple:
    "text-white bg-dark-purple border-0 hover:bg-[linear-gradient(rgb(0_0_0/20%)_0_0)]",
  skyBlue:
    " text-white bg-[#0086B3] border-0 hover:bg-[linear-gradient(rgb(0_0_0/20%)_0_0)]",
  greenLight:
    "text-green-cta bg-[#DFFFF2] font-semibold bg-light-green border-0 hover:bg-[linear-gradient(rgb(0_0_0/20%)_0_0)]",

  // outlined buttons
  outlinedBlue:
    "text-color-blue-light !bg-transparent border border-color-blue-light border-solid",
  outlineBlueBullet:
    "text-blue-bullet !bg-transparent border border-blue-bullet border-solid",
  outlinedGreen:
    "text-green-cta !bg-transparent border border-green-cta  border-solid",
  outlinedRed:
    "text-red-light !bg-transparent border-red-light border border-solid hover:text-white hover:!bg-red-light",
  outlinedGray:
    "text-gray-medium !bg-transparent border-gray-medium border border-solid",
  outlinedText:
    "text-color-title font-semibold bg-white border !border-[#E6E6EB] border-solid",
  outlinedPurple:
    "text-dark-purple !bg-transparent border border-dark-purple border-solid font-semibold",
  outlineOrange:
    "text-orange-bullet !bg-transparent hover:!bg-orange-bullet hover:text-white border border-orange-bullet border-solid font-semibold",

  // text buttons
  textSlate: "border-0 text-slate-400 bg-transparent",
  textBlue: "border-0 text-color-blue-light bg-transparent font-bold text-xs",
  textRed: "!bg-transparent !border-0 !text-red-light font-semibold",

  // link buttons
  linkBlue:
    "border-0 underline underline-offset-[8px] text-color-blue-light hover:text-blue-800 visited:text-purple-600 ",
  linkBlue2:
    "border-0 text-color-blue-light hover:text-blue-800 visited:text-purple-600 font-semibold",
};

const sizeClasses = {
  xxs: "px-2 py-2 text-xs",
  xs: "px-5 py-2 text-[14px]",
  md: "px-7 py-2",
  lg: "px-7 py-3",
  xlg: "md:px-14 md:py-6 px-10 py-4",
};

const disableClasses = "text-white bg-[#E2E2E2] !cursor-not-allowed";

export type TailwindButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  color?: keyof typeof colorClasses;
  size?: keyof typeof sizeClasses;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  loading?: boolean;
  as?: any;
  [key: string]: any;
};

const Button = (props: TailwindButtonProps) => {
  const {
    as,
    className,
    color = "blue",
    size = "md",
    disabled,
    children,
    leftIcon,
    rightIcon,
    loading = false,
    ...rest
  } = props;

  const Wrapper = as || "button";

  return (
    <Wrapper
      className={cx(
        "outline-0 rounded-lg cursor-pointer transition-all flex items-center justify-center gap-3",
        sizeClasses[size],
        !disabled && colorClasses[color],
        disabled && disableClasses,
        className
      )}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? (
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      ) : (
        <>
          {rightIcon}
          {children}
          {leftIcon}
        </>
      )}
    </Wrapper>
  );
};

export default Button;
