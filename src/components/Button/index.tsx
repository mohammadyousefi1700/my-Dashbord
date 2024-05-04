import React, { Children, ReactNode } from "react";
import classNames from "classnames";
type BtnProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  loading?: boolean;
  BtnClassName?: string | undefined;
};
export const disableClasses = "!text-white !bg-[#E2E2E2] !cursor-not-allowed";

function Button(props: BtnProps) {
  const { children, BtnClassName, leftIcon, rightIcon, loading } = props;
  console.log("loading", loading);

  return (
    <button
      disabled={props.disabled || loading}
      className={classNames(
        props.disabled === true ? disableClasses : "",
        BtnClassName
      )}
      {...props}
    >
      {leftIcon ? leftIcon : null}
      {children}
      {rightIcon ? rightIcon : null}
    </button>
  );
}

export default Button;
