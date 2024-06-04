import React, { ReactNode } from "react";
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
      role="status"
      disabled={props.disabled || loading}
      className={classNames(
        props.disabled && loading === true ? disableClasses : "",
        BtnClassName
      )}
      {...props}
    >
      {!loading === true ? (
        <>
          {leftIcon ? leftIcon : null}
          {children}
          {rightIcon ? rightIcon : null}
        </>
      ) : (
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      )}
    </button>
  );
}

export default Button;
