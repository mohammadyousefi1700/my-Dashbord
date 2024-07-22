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
        <div role="status">
          <svg
            aria-hidden="true"
            className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-red-400"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>
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
